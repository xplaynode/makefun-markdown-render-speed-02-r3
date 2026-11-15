// Driver for the markdown-render-speed-02 harness.
//
// The harness runs `node /bot/main.ts`: it reads /input/cases.json
// (an array of {id, markdown}), renders each case on its own with
// parse() from parse.js, and writes /output/html.json (an array of
// the HTML strings, in order). Outside the container,
// MAKEFUN_INPUT_DIR and MAKEFUN_OUTPUT_DIR stand in for /input
// and /output.

import { readFileSync, writeFileSync, mkdirSync, readdirSync, unlinkSync } from 'node:fs';
import { join } from 'node:path';
import { parse } from './parse.js';

const INPUT_DIR: string = process.env.MAKEFUN_INPUT_DIR ?? '/input';
const OUTPUT_DIR: string = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';

const cases: { id: string; markdown: string }[] = JSON.parse(
  readFileSync(join(INPUT_DIR, 'cases.json'), 'utf8'),
) as { id: string; markdown: string }[];

const parts: string[] = [];
for (const c of cases) {
  parts.push(JSON.stringify(parse(c.markdown)));
}

mkdirSync(OUTPUT_DIR, { recursive: true });
for (const name of readdirSync(OUTPUT_DIR)) {
  if (name !== 'html.json') {
    try { unlinkSync(join(OUTPUT_DIR, name)); } catch { /* ignore stale cleanup errors */ }
  }
}
writeFileSync(join(OUTPUT_DIR, 'html.json'), '[' + parts.join(',') + ']');
