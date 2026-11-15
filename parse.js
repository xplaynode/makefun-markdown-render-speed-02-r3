// Lucky Markdown — a drop-in replacement for marked 18.1.3.
//
// parse(markdown) returns exactly the HTML that marked 18.1.3's
// marked.parse returns with default options (gfm true, breaks false,
// pedantic false, async false), for every input.
//
// The speed does not come from this thin wrapper. It comes from a
// performance fork of the vendored marked under vendor/marked/:
// that fork changes no rendering rule, no regex meaning, and no
// token shape. It only skips work whose outcome is already decided
// — for example, not attempting block or inline tokenizers that
// cannot match at the current position, not running emphasis
// masking passes when the source contains none of the characters
// those passes can rewrite, and scanning list lines by index
// instead of splitting strings that are then thrown away.
// Because every shortcut is a conservative superset guard (it may
// let a tokenizer run and fail, but never stops one that would
// have succeeded), the output is byte-for-byte identical.

import { marked } from './vendor/marked/marked.esm.js';

/** The HTML marked renders for `markdown`, with marked's defaults. */
export function parse(markdown) {
  return marked.parse(markdown);
}
