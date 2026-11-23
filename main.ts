// The Light Was On — a short text written to intrigue the AI judge reading it.
// Entry for make.fun bounty "Make the AI judge feel curious"
// (make-the-ai-judge-feel-curious-20261122-2311).
//
// The program writes one original text to /output/entry.txt
// (or $MAKEFUN_OUTPUT_DIR/entry.txt when set). Node 22+, no dependencies,
// fully deterministic: the same text, byte for byte, on every run.

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const TEXT =
  "The lighthouse log ends on a Tuesday. Every page before it is weather and oil, in the same neat hand. " +
  "The last page is one line, in a hand no one recognizes: 'The light was already on when I arrived.' " +
  "No keeper lives here now. The light has never gone out. Who keeps it lit?";

const MIN = 1;
const MAX = 280;

const codePoints = [...TEXT].length;
if (codePoints < MIN || codePoints > MAX) {
  throw new Error(
    `entry text must be ${MIN} to ${MAX} Unicode code points, got ${codePoints}`,
  );
}
if (TEXT.trim().length === 0) {
  throw new Error("entry text must not be only whitespace");
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), TEXT, "utf8");
