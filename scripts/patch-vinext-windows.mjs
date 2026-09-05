import fs from "node:fs";
import path from "node:path";

const file = path.resolve(
  "node_modules/vinext/dist/server/static-file-cache.js"
);

if (!fs.existsSync(file)) {
  console.log("[vinext-patch] Vinext file not found; skipping.");
  process.exit(0);
}

let source = fs.readFileSync(file, "utf8");

const oldCode =
  "relativePath: path.relative(base, batch[j])";

const newCode =
  'relativePath: path.relative(base, batch[j]).replaceAll("\\\\", "/")';

if (source.includes(newCode)) {
  console.log("[vinext-patch] Already patched.");
  process.exit(0);
}

if (!source.includes(oldCode)) {
  console.error("[vinext-patch] Expected Vinext code was not found.");
  process.exit(1);
}

source = source.replace(oldCode, newCode);

fs.writeFileSync(file, source);

console.log("[vinext-patch] Vinext Windows static-path fix applied.");