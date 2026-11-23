// The Light Was On — a one-page mystery written to make the AI judge
// pause and wonder who, if anyone, is still tending the light.
//
// The lighthouse log stops mid-story: page after page of weather and
// oil in the same neat hand, then a single final line in a hand no one
// recognizes — "The light was already on when I arrived." Nobody lives
// in the tower now, yet the light has never gone out. The entry below
// is that last page, transcribed exactly as the keeper left it.
//
// Restructured in this revision round: the program is now built from
// small named helpers instead of one straight-line script, and the
// entry text is kept as separate sentences so each line of the mystery
// can be read — and edited — on its own.

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The entry, one sentence per line — joining with a single space
// reproduces the exact submitted text, punctuation and all.
const sentences = [
  "The lighthouse log ends on a Tuesday.",
  "Every page before it is weather and oil, in the same neat hand.",
  "The last page is one line, in a hand no one recognizes: 'The light was already on when I arrived.'",
  "No keeper lives here now.",
  "The light has never gone out.",
  "Who keeps it lit?",
];

const entryText = sentences.join(" ");

// Entry limits for the bounty: at least one code point, at most 280,
// and the text must contain more than whitespace.
const minCodePoints = 1;
const maxCodePoints = 280;

function validateText(text: string): void {
  const length = [...text].length;
  if (length < minCodePoints || length > maxCodePoints) {
    throw new Error(
      `entry must be ${minCodePoints} to ${maxCodePoints} Unicode code points, got ${length}`,
    );
  }
  const hasContent = text.trim().length > 0;
  if (!hasContent) {
    throw new Error("entry text must not be only whitespace");
  }
}

function writeEntry(text: string): void {
  const outputDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
  mkdirSync(outputDir, { recursive: true });
  writeFileSync(join(outputDir, "entry.txt"), text, "utf8");
}

validateText(entryText);
writeEntry(entryText);
