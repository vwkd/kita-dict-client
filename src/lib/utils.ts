import { parseInline } from "marked";

// []<>~
const ESCAPE_CHARS = /([\[\]\<\>])/g;
const ESCAPE_TILDE = /(?<!\~)(\~)(?!\~)/g;

const ILLEGAL_BOLD = /(\))(\*\*)(?! |$)/g;
const PLACEHOLDER_BOLD = /(\))X(<\/strong>)/g;
const SLASH = /\//g;

// only makes `**` bold and `*` cursive
// escapes other markdown characters present in dict
// beware: escape single tilde since some are converted into `<del>`, e.g. `გა~, და~, მი~` becomes `გა<del>, და</del>, მი~`
// patches illegal bold ending in symbol and not followed by space, e.g. `**ბნე(ვ)**¹`, `ა**ფუ(ვ)**ებული`
// adds filler letter `X` in markdown and removes again in html
// adds line break opportunity element after slashes
export function renderMarkdown(str: string) {
  const strEscaped = str
    .replace(ESCAPE_CHARS, "\\$1")
    .replace(ESCAPE_TILDE, "\\$1")
    .replace(ILLEGAL_BOLD, "$1X$2")
    .replace(SLASH, "/<wbr>");

  const html = parseInline(strEscaped)
    .replace(PLACEHOLDER_BOLD, "$1$2");

  return html;
}
