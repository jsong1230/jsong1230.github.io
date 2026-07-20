// Shared MDX sanitizer for AI-generated post content.
//
// MDX parses JSX in flow (prose) content, so a bare `<...>` that is NOT a valid
// HTML/JSX tag crashes `astro build`. Real-world breakers from the LLM:
//   - `<대한뉴스(NEWS_ERA)>`  (non-letter tag name)
//   - `<news(ERA)>`          (letter start but `(` is invalid in a tag name)
// Such spans are rewritten to 《...》 (renders literally, reads naturally in Korean).
//
// Fenced code blocks (```...```) and inline code (`...`) are left UNTOUCHED:
//   - MDX never parses JSX inside code, so they cannot break the build, and
//   - code like `List<String>` or `#include <vector>` must survive verbatim.

function isValidTag(inner) {
  if (inner.startsWith('!--')) return true; // HTML comment <!-- ... -->
  // <tag>, </tag>, <tag/>, <tag attr="x" attr2='y' attr3={z} attr4=bare />
  return /^\/?[A-Za-z][\w.-]*(?:\s+[A-Za-z_][\w-]*(?:=(?:"[^"]*"|'[^']*'|\{[^}]*\}|\S+))?)*\s*\/?$/.test(inner);
}

function sanitizeProse(text) {
  return text
    // LaTeX braces inside $...$  ->  parentheses (avoid MDX expression parsing)
    .replace(/\$[^$\n]+\$/g, (m) => m.replace(/\{([^}]+)\}/g, '($1)'))
    // Rewrite any <...> that is not a valid tag/comment to 《...》
    .replace(/<([^>]+)>/g, (match, inner) => (isValidTag(inner) ? match : `《${inner}》`));
}

/**
 * Make AI-generated markdown safe to embed in an .mdx file.
 * Sanitizes prose only; fenced/inline code segments are preserved verbatim.
 */
export function sanitizeMDX(content) {
  if (!content) return content;
  return content
    .split(/(```[\s\S]*?```|`[^`\n]*`)/g)
    .map((seg, i) => (i % 2 === 1 ? seg : sanitizeProse(seg)))
    .join('');
}
