#!/usr/bin/env python3
"""Lint YAML files in src/i18n/ and src/data/.

Checks:
  1. YAML syntax is valid
  2. Block-scalar strings (>- | > |- etc.) do not contain backslash-escaped
     quotes (\" or \').  In block scalars the backslash is literal text, so
     the escape does nothing and the rendered output will include a visible
     backslash, which is almost certainly a mistake.
  3. Locale YAML values should use markdown, not raw HTML tags.
     <strong>, <em>, <i>, and <a href="..."> should be written as
     markdown equivalents (**bold**, *italic*, [text](url)).
  4. Block-scalar values should not be entirely wrapped in double quotes.
     This catches the common mistake of converting a YAML quoted string
     to a block scalar without removing the outer quotes (which become
     literal characters in block scalars).
  5. social_callout_{platform}_{n} values fit within each platform's
     post character limit after {url} substitution, and contain the
     required {url} placeholder so the share intent gets a link.
"""

import glob
import re
import sys

import yaml


def find_yaml_files():
    patterns = [
        "src/i18n/locales/*.yaml",
        "src/data/*.yaml",
        "src/data/**/*.yaml",
    ]
    files = []
    for pat in patterns:
        files.extend(sorted(glob.glob(pat, recursive=True)))
    return files


def check_syntax(path):
    """Return a list of error strings (empty = OK)."""
    errors = []
    try:
        with open(path) as fh:
            yaml.safe_load(fh)
    except yaml.YAMLError as exc:
        errors.append(f"{path}: YAML parse error: {exc}")
    return errors


def check_escaped_quotes_in_block_scalars(path):
    """Return a list of error strings (empty = OK).

    Detects \" or \' inside block-scalar values (lines following a key
    whose value starts with >  >-  |  |- etc.).  In block scalars these
    are literal characters, not escape sequences.
    """
    errors = []
    with open(path) as fh:
        lines = fh.readlines()

    in_block = False
    block_indent = None
    block_start_line = 0

    for lineno, line in enumerate(lines, 1):
        # Detect the start of a block scalar
        if re.match(r"^\s*\S+:\s*[>|][+-]?\s*$", line):
            in_block = True
            block_indent = None
            block_start_line = lineno
            continue

        if in_block:
            stripped = line.rstrip("\n")
            # Blank lines are part of block content
            if stripped.strip() == "":
                continue
            content_indent = len(line) - len(line.lstrip())
            if block_indent is None:
                block_indent = content_indent
            if content_indent >= block_indent:
                # Still inside the block scalar – look for escaped quotes
                if '\\"' in line or "\\'" in line:
                    errors.append(
                        f'{path}:{lineno}: escaped quote in block scalar '
                        f'(block starts at line {block_start_line}): '
                        f'{stripped.strip()}'
                    )
            else:
                in_block = False

    return errors


def check_html_in_locale_values(path):
    """Return a list of error strings for locale files containing raw HTML
    tags that should be markdown instead.

    Only checks src/i18n/locales/*.yaml files.  Allows <strong style="...">
    and <small> which have no markdown equivalent.
    """
    if "/locales/" not in path:
        return []

    errors = []
    try:
        with open(path) as fh:
            data = yaml.safe_load(fh)
    except yaml.YAMLError:
        return []  # syntax error already reported by check_syntax

    if not isinstance(data, dict):
        return []

    # HTML tags that should be written as markdown
    html_patterns = [
        (re.compile(r"<strong>"), "use **bold** instead of <strong>"),
        (re.compile(r"<em>"), "use *italic* instead of <em>"),
        (re.compile(r"</em>"), "use *italic* instead of </em>"),
        (re.compile(r"<i>"), "use *italic* instead of <i>"),
        (re.compile(r"</i>"), "use *italic* instead of </i>"),
        (re.compile(r'<a\s+href="[^"]*"[^>]*>'), "use [text](url) instead of <a href>"),
        (re.compile(r"</a>"), "use [text](url) instead of </a>"),
    ]

    for key, value in data.items():
        if not isinstance(value, str):
            continue
        for pattern, msg in html_patterns:
            if pattern.search(value):
                errors.append(f"{path}: key '{key}': {msg}")
                break  # one error per key is enough
        # Check for orphaned </strong> (not preceded by <strong style=)
        if "</strong>" in value and "<strong>" not in value and "<strong " not in value:
            errors.append(
                f"{path}: key '{key}': orphaned </strong> without <strong>"
            )

    return errors


def check_quoted_block_scalars(path):
    """Return a list of error strings for block-scalar values whose content
    is entirely wrapped in double quotes.

    This catches the common mistake where a translator converts a YAML
    quoted string like  key: "value"  to a block scalar but forgets to
    remove the outer quotes:

        key: >-
          "value"          ← outer quotes are now literal text

    Only checks keys whose raw YAML uses a block scalar indicator (> | >- |-).
    For locale files, the check compares with the English original to
    avoid false positives on keys where the quotes ARE the content
    (e.g. obj_security_q whose English value is '"...just about security?"').
    """
    errors = []

    try:
        with open(path) as fh:
            data = yaml.safe_load(fh)
    except yaml.YAMLError:
        return []  # syntax error already reported

    if not isinstance(data, dict):
        return []

    # Identify which keys use block scalar syntax in the raw file
    with open(path) as fh:
        raw_lines = fh.readlines()
    block_scalar_keys = set()
    for line in raw_lines:
        m = re.match(r"^([a-zA-Z]\w*):\s*[>|][+-]?\s*$", line)
        if m:
            block_scalar_keys.add(m.group(1))

    # Load English reference for locale files
    en_data = {}
    if "/locales/" in path and not path.endswith("/en.yaml"):
        try:
            en_path = path.rsplit("/", 1)[0] + "/en.yaml"
            with open(en_path) as fh:
                en_data = yaml.safe_load(fh) or {}
        except (FileNotFoundError, yaml.YAMLError):
            pass

    for key, value in data.items():
        if not isinstance(value, str):
            continue
        if key not in block_scalar_keys:
            continue
        if len(value) < 3:
            continue
        if not (value.startswith('"') and value.endswith('"')):
            continue

        # For locale files: skip if the English value also starts/ends
        # with quotes (the quotes are intentional content)
        if en_data:
            en_val = en_data.get(key, "")
            if isinstance(en_val, str) and en_val.startswith('"') and en_val.endswith('"'):
                continue

        errors.append(
            f"{path}: key '{key}': block scalar value is wrapped in "
            f'double quotes — remove the outer quotes'
        )

    return errors


# Per-platform character limits for social_callout_{platform}_{n} messages.
# url_weight = 23 reflects platforms that fold every URL to a fixed width
# (X via t.co, Mastodon per its character-counting rules). Other platforms
# count the URL as its visible length, so we substitute the longest URL
# the site ever emits: https://keepandroidopen.org/{locale}/ — pt-BR and
# zh-CN are tied at 34 chars.
SOCIAL_PLATFORM_LIMITS = {
    "x":        {"limit": 280,   "url_weight": 23},
    "bluesky":  {"limit": 300,   "url_weight": None},
    "mastodon": {"limit": 500,   "url_weight": 23},
    "linkedin": {"limit": 3000,  "url_weight": None},
    "facebook": {"limit": 63206, "url_weight": None},
}
LONGEST_SUBSTITUTED_URL = "https://keepandroidopen.org/zh-CN/"

_SOCIAL_CALLOUT_KEY = re.compile(r"^social_callout_([a-z]+)_(\d+)$")


def check_social_callout_limits(path):
    """Return a list of error strings for social_callout_* keys whose
    rendered length exceeds the target platform's post character limit,
    or that are missing the required {url} placeholder.

    Only applies to src/i18n/locales/*.yaml.
    """
    if "/locales/" not in path:
        return []

    errors = []
    try:
        with open(path) as fh:
            data = yaml.safe_load(fh)
    except yaml.YAMLError:
        return []  # syntax error already reported

    if not isinstance(data, dict):
        return []

    for key, value in data.items():
        m = _SOCIAL_CALLOUT_KEY.match(key)
        if not m:
            continue
        platform = m.group(1)
        cfg = SOCIAL_PLATFORM_LIMITS.get(platform)
        if cfg is None:
            continue
        if not isinstance(value, str):
            errors.append(f"{path}: key '{key}': expected string value")
            continue

        if "{url}" not in value:
            errors.append(
                f"{path}: key '{key}': missing required {{url}} placeholder"
            )
            continue

        if cfg["url_weight"] is not None:
            rendered = value.replace("{url}", "x" * cfg["url_weight"])
        else:
            rendered = value.replace("{url}", LONGEST_SUBSTITUTED_URL)

        n = len(rendered)
        if n > cfg["limit"]:
            errors.append(
                f"{path}: key '{key}': {n} chars exceeds {platform} "
                f"limit of {cfg['limit']} (counted after {{url}} "
                f"substitution)"
            )

    return errors


def main():
    files = find_yaml_files()
    if not files:
        print("No YAML files found to lint.")
        sys.exit(1)

    all_errors = []
    for path in files:
        all_errors.extend(check_syntax(path))
        all_errors.extend(check_escaped_quotes_in_block_scalars(path))
        all_errors.extend(check_html_in_locale_values(path))
        all_errors.extend(check_quoted_block_scalars(path))
        all_errors.extend(check_social_callout_limits(path))

    if all_errors:
        print(f"Found {len(all_errors)} error(s):\n")
        for err in all_errors:
            print(f"  ERROR: {err}")
        sys.exit(1)
    else:
        print(f"All {len(files)} YAML files passed lint checks.")
        sys.exit(0)


if __name__ == "__main__":
    main()
