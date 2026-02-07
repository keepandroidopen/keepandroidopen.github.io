import { visit } from 'unist-util-visit';

/**
 * Remark plugin that handles kramdown-style inline attribute lists (IALs).
 * Converts `{:.class1 .class2}` annotations into HTML class attributes
 * on the preceding element.
 *
 * In kramdown markdown, the pattern looks like:
 *   - List item text
 *   {:.li-list .li-money}
 *
 * This plugin finds text nodes matching the `{:.class}` pattern,
 * extracts the class names, and applies them to the parent list item.
 */
export default function remarkKramdownClasses() {
  return (tree) => {
    visit(tree, 'listItem', (node) => {
      // Look through the children of each list item for IAL patterns
      for (const child of node.children) {
        if (child.type !== 'paragraph') continue;

        for (let i = child.children.length - 1; i >= 0; i--) {
          const textNode = child.children[i];
          if (textNode.type !== 'text') continue;

          // Match kramdown IAL pattern: {:.class1 .class2 ...}
          const match = textNode.value.match(/\{:((?:\s*\.\S+)+)\s*\}/);
          if (!match) continue;

          // Extract class names (strip leading dots)
          const classes = match[1]
            .trim()
            .split(/\s+/)
            .map((c) => c.replace(/^\./, ''));

          // Apply classes to the list item via hProperties
          if (!node.data) node.data = {};
          if (!node.data.hProperties) node.data.hProperties = {};
          node.data.hProperties.className = classes;

          // Remove the IAL text from the node
          const before = textNode.value.substring(0, match.index).trimEnd();
          const after = textNode.value.substring(match.index + match[0].length);
          if (before || after) {
            textNode.value = before + after;
          } else {
            child.children.splice(i, 1);
          }

          // Also remove any preceding newline-only text nodes
          if (i > 0 && child.children[i - 1]?.type === 'text') {
            const prev = child.children[i - 1];
            prev.value = prev.value.replace(/\n$/, '');
          }
        }
      }
    });

    // Also handle IALs that appear as standalone paragraphs after lists
    // (in case the parser puts them outside the list item)
    visit(tree, 'paragraph', (node, index, parent) => {
      if (!parent || index === undefined || index === 0) return;
      if (node.children.length !== 1 || node.children[0].type !== 'text') return;

      const text = node.children[0].value.trim();
      const match = text.match(/^\{:((?:\s*\.\S+)+)\s*\}$/);
      if (!match) return;

      const classes = match[1]
        .trim()
        .split(/\s+/)
        .map((c) => c.replace(/^\./, ''));

      // Find the preceding list and apply to its last item
      const prev = parent.children[index - 1];
      if (prev?.type === 'list') {
        const lastItem = prev.children[prev.children.length - 1];
        if (lastItem) {
          if (!lastItem.data) lastItem.data = {};
          if (!lastItem.data.hProperties) lastItem.data.hProperties = {};
          lastItem.data.hProperties.className = classes;
        }
        // Remove this paragraph node
        parent.children.splice(index, 1);
        return index; // revisit this index
      }
    });
  };
}
