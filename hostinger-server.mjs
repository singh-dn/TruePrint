import http from "node:http";
import { startProdServer } from "vinext/server/prod-server";

const port = Number(process.env.PORT || 3000);
const host = process.env.HOST || "0.0.0.0";
const server = http.createServer();

// Answer requests during initialization instead of leaving connections hanging.
function starting(req, res) {
  if (server.listenerCount("request") > 1) return;
  res.writeHead(503, {
    "Content-Type": "text/plain; charset=utf-8",
    "Retry-After": "1",
  });
  res.end("TruePrint is starting. Please retry shortly.");
}
server.on("request", starting);
server.on("error", (error) => {
  console.error("[Hostinger] HTTP server failed:", error);
  process.exit(1);
});

console.log(`[Hostinger] Starting TruePrint on ${host}:${port}`);
// Hostinger needs the entry file to open its single listener promptly.
server.listen(port, host, () => {
  console.log(`[Hostinger] Hostinger listener is ready on ${host}:${port}`);
});

try {
  const result = await startProdServer({ port, host, outDir: "dist", server });
  if (result.server !== server) {
    throw new Error("Vinext compatibility patch is missing; run npm install.");
  }
  server.removeListener("request", starting);
  console.log("[Hostinger] Vinext production server is ready.");
} catch (error) {
  console.error("[Hostinger] Vinext failed to start:", error);
  process.exit(1);
}