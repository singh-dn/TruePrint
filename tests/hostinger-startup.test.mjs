import assert from "node:assert/strict";
import http from "node:http";
import { once } from "node:events";
import test from "node:test";
import { startProdServer } from "vinext/server/prod-server";

test("Vinext reuses Hostinger's listening server and serves the homepage", { timeout: 30000 }, async () => {
  const server = http.createServer();
  server.listen(0, "127.0.0.1");
  await once(server, "listening");
  const port = server.address().port;
  // Any second listen is a regression, even if the hosting platform ignores it.
  server.listen = () => { throw new Error("Hostinger server must listen only once"); };
  try {
    const result = await startProdServer({ server, host: "127.0.0.1", port, outDir: "dist", silent: true });
    assert.equal(result.server, server);
    assert.equal(result.port, port);
    assert.equal(server.listenerCount("request"), 1);
    const response = await fetch(`http://127.0.0.1:${port}/`, { signal: AbortSignal.timeout(10000) });
    assert.equal(response.status, 200);
    assert.match(response.headers.get("content-type"), /text\/html/);
    assert.match(await response.text(), /TruePrint/);
  } finally {
    server.closeAllConnections();
    await new Promise((resolve) => server.close(resolve));
  }
});
