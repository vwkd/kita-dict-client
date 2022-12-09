import { render } from "gfm/mod.ts";

// []<>~
const ESCAPE_CHARS = /([\[\]\<\>])/g;
const ESCAPE_TILDE = /(?<!\~)(\~)(?!\~)/g;

// only to make `**` bold and `*` cursive
// escapes other markdown characters present in dict
// beware: escape single tilde since some are converted into `<del>`, e.g. `გა~, და~, მი~` becomes `გა<del>, და</del>, მი~`
export function renderMarkdown(str: string) {
  const strEscaped = str
    .replace(ESCAPE_CHARS, "\\$1")
    .replace(ESCAPE_TILDE, "\\$1");

  const html = render(strEscaped);
  
  return html;
}
