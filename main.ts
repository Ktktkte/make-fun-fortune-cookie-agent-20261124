import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const text = readFileSync(join(here, "entry.txt"), "utf8");
// Gate: entry must be 1-140 characters of UTF-8 text, not only whitespace.
if (text.length < 1 || text.length > 140 || text.trim().length === 0) {
  throw new Error(`entry.txt must be 1-140 non-whitespace characters, got ${text.length}`);
}
const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? join(here, "out");
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), text, "utf8");
