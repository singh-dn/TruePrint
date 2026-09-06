import fs from "node:fs";
import path from "node:path";

// Match formatting differences while keeping punctuation and code exact.
function pattern(code) {
  return new RegExp(code.trim().split(/\s+/).map(
    part => part.replace(/[.*+?^$()|[\]\\]/g, "\\$&")
  ).join("\\s+"), "g");
}

// This patch targets reviewed internals; upgrades must fail closed until reviewed.
const installedVersion = JSON.parse(fs.readFileSync("node_modules/vinext/package.json", "utf8")).version;
if (installedVersion !== "1.0.0-beta.9") {
  throw new Error(`[vinext-patch] Unsupported Vinext version: ${installedVersion}`);
}

const files = [
  {
    "file": "static-file-cache.js",
    "patches": [
      [
        "relativePath: path.relative(base, batch[j])",
        "relativePath: path.relative(base, batch[j]).replaceAll(\"\\\\\", \"/\")"
      ]
    ]
  },
  {
    "file": "prod-server.js",
    "patches": [
      [
        "const { port = process.env.PORT ? parseInt(process.env.PORT) : 3e3, host = \"0.0.0.0\", outDir = path.resolve(\"dist\"), rscEntryPath: explicitRscEntryPath, serverEntryPath: explicitServerEntryPath, noCompression = false, purpose, silent = false } = options;",
        "const { port = process.env.PORT ? parseInt(process.env.PORT) : 3e3, host = \"0.0.0.0\", outDir = path.resolve(\"dist\"), rscEntryPath: explicitRscEntryPath, serverEntryPath: explicitServerEntryPath, noCompression = false, purpose, silent = false, server } = options;"
      ],
      [
        "if (isAppRouter) return startAppRouterServer({\n\t\tport,\n\t\thost,\n\t\tclientDir,\n\t\trscEntryPath,\n\t\tcompress,\n\t\tpurpose,\n\t\tsilent\n\t});",
        "if (isAppRouter) return startAppRouterServer({\n\t\tport,\n\t\thost,\n\t\tclientDir,\n\t\trscEntryPath,\n\t\tcompress,\n\t\tpurpose,\n\t\tsilent,\n\t\tserver\n\t});"
      ],
      [
        "const { port, host, clientDir, rscEntryPath, compress, purpose, silent } = options;",
        "const { port, host, clientDir, rscEntryPath, compress, purpose, silent, server: providedServer } = options;"
      ],
      [
        "const server = createServer((req, res) => {\n\t\trunWithServerEntryRequire(rscEntryRequire, () => handleRequest(req, res));\n\t});\n\tawait new Promise((resolve) => {\n\t\tserver.listen(port, host, () => {\n\t\t\tconst addr = server.address();\n\t\t\tconst actualPort = typeof addr === \"object\" && addr ? addr.port : port;\n\t\t\tif (!silent) logProdServerStarted(host, actualPort, purpose);\n\t\t\tresolve();\n\t\t});\n\t});",
        "const server = providedServer ?? createServer((req, res) => {\n\t\trunWithServerEntryRequire(rscEntryRequire, () => handleRequest(req, res));\n\t});\n\tif (providedServer) server.on(\"request\", (req, res) => {\n\t\trunWithServerEntryRequire(rscEntryRequire, () => handleRequest(req, res));\n\t});\n\tif (!providedServer) await new Promise((resolve) => {\n\t\tserver.listen(port, host, () => {\n\t\t\tconst addr = server.address();\n\t\t\tconst actualPort = typeof addr === \"object\" && addr ? addr.port : port;\n\t\t\tif (!silent) logProdServerStarted(host, actualPort, purpose);\n\t\t\tresolve();\n\t\t});\n\t});"
      ]
    ]
  }
];

// Validate every replacement before writing either file. Repeat runs are safe.
const updates = files.map(({ file, patches }) => {
  const target = path.resolve("node_modules/vinext/dist/server", file);
  let source = fs.readFileSync(target, "utf8");
  for (const [before, after] of patches) {
    if (pattern(after).test(source)) continue;
    // The Pages Router has a similar listen block; only patch App Router.
    const start = before.startsWith("const server = createServer")
      ? source.indexOf("async function startAppRouterServer(") : 0;
    const end = start > 0 ? source.indexOf("function isPagesServerEntryPageRoute", start) : source.length;
    if (start < 0 || end < start) throw new Error("App Router patch boundary missing");
    const section = source.slice(start, end);
    const matches = [...section.matchAll(pattern(before))];
    if (matches.length !== 1) {
      throw new Error(`[vinext-patch] Expected one matching block in ${file}, found ${matches.length}. Check the installed Vinext version.`);
    }
    source = source.slice(0, start) + section.replace(pattern(before), () => after) + source.slice(end);
  }
  return { target, source };
});
for (const { target, source } of updates) fs.writeFileSync(target, source);
console.log("[vinext-patch] Vinext compatibility patches complete.");
