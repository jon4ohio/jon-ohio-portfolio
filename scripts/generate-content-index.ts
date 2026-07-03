import { writeFileSync } from "node:fs";
import { join } from "node:path";
import { toContentIndexJson } from "../lib/search";

const outPath = join(process.cwd(), "public", "content-index.json");
writeFileSync(outPath, toContentIndexJson(), "utf8");
console.log(`Wrote ${outPath}`);
