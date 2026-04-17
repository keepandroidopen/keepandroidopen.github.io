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
