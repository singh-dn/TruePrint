import http from "node:http";
import { startProdServer } from "vinext/server/prod-server";

const port = Number(process.env.PORT || 3000);
const vinextPort = port + 1;
const host = process.env.HOST || "0.0.0.0";

let vinextReady = false;

console.log(`[Hostinger] Starting TruePrint on ${host}:${port}`);
console.log(`[Hostinger] Starting Vinext internally on 127.0.0.1:${vinextPort}`);

// Start Vinext in the background.
// It may take longer than Hostinger's 3-second startup detection window.
const vinextPromise = startProdServer({
  port: vinextPort,
  host: "127.0.0.1",
  outDir: "dist",
})
  .then(() => {
    vinextReady = true;
    console.log("[Hostinger] Vinext production server is ready.");
  })
  .catch((error) => {
    console.error("[Hostinger] Vinext failed to start:", error);
    process.exitCode = 1;
  });

// Hostinger requires the entry file itself to call listen() quickly.
const proxyServer = http.createServer((req, res) => {
  if (!vinextReady) {
    res.writeHead(503, {
      "Content-Type": "text/plain; charset=utf-8",
      "Retry-After": "1",
    });
    res.end("TruePrint is starting. Please retry shortly.");
    return;
  }

  const proxyReq = http.request(
    {
      hostname: "127.0.0.1",
      port: vinextPort,
      path: req.url,
      method: req.method,
      headers: {
        ...req.headers,
        host: `127.0.0.1:${vinextPort}`,
      },
    },
    (proxyRes) => {
      res.writeHead(proxyRes.statusCode || 502, proxyRes.headers);
      proxyRes.pipe(res);
    }
  );

  proxyReq.on("error", (error) => {
    console.error("[Hostinger] Proxy error:", error);

    if (!res.headersSent) {
      res.writeHead(502, {
        "Content-Type": "text/plain; charset=utf-8",
      });
      res.end("Bad Gateway");
    } else {
      res.destroy();
    }
  });

  req.pipe(proxyReq);
});

proxyServer.listen(port, host, () => {
  console.log(`[Hostinger] Hostinger listener is ready on ${host}:${port}`);
});

await vinextPromise;