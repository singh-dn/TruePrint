import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const source = JSON.parse(readFileSync(new URL("../app/categories/catalogues/diaries.json", import.meta.url)))[0].url;
const env = { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } };
const ctx = { waitUntil() {}, passThroughOnException() {} };
async function worker() { return (await import("../dist/server/index.js")).default; }
function request(url) { return new Request(`https://thetrueprint.com/api/catalogue-pdf?url=${encodeURIComponent(url)}`); }

test("rejects other hosts and unconfigured URLs before any network request", async (t) => {
  const app = await worker();
  const mock = t.mock.method(globalThis, "fetch", async () => { throw new Error("Unexpected fetch"); });
  for (const [url, status] of [
    ["not-a-url", 400], ["https://example.com/test.pdf", 403],
    ["https://fcrf.in.evil.example/test.pdf", 403], ["https://www.fcrf.in/test.pdf", 403],
    ["http://fcrf.in/test.pdf", 403], ["https://fcrf.in:8443/test.pdf", 403],
    ["https://user:pass@fcrf.in/test.pdf", 403], [source + "#fragment", 403],
    ["https://fcrf.in/unconfigured.pdf", 404],
  ]) {
    assert.equal((await app.fetch(request(url), env, ctx)).status, status, url);
  }
  assert.equal(mock.mock.callCount(), 0);
});

test("streams configured PDF as attachment and does not forward cookies", async (t) => {
  const app = await worker();
  t.mock.method(globalThis, "fetch", async (url, init) => {
    assert.equal(url, source);
    assert.equal(init.redirect, "manual");
    assert.equal(init.credentials, "omit");
    return new Response("%PDF-1.7\ncontent", { headers: { "content-type": "application/pdf", "set-cookie": "secret=value" } });
  });
  const response = await app.fetch(request(source), env, ctx);
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-disposition"), /^attachment; filename=".*\.pdf"$/);
  assert.equal(response.headers.get("set-cookie"), null);
  assert.equal(await response.text(), "%PDF-1.7\ncontent");
});

test("rejects redirects, errors and non-PDF upstream responses", async (t) => {
  const app = await worker();
  const mock = t.mock.method(globalThis, "fetch", async () => new Response(null, { status: 302, headers: { location: "https://example.com/test.pdf" } }));
  assert.equal((await app.fetch(request(source), env, ctx)).status, 502);
  for (const status of [404, 500, 200]) {
    mock.mock.mockImplementation(async () => new Response("<html>error</html>", { status, headers: { "content-type": "text/html" } }));
    assert.equal((await app.fetch(request(source), env, ctx)).status, 502);
  }
  mock.mock.mockImplementation(async () => { throw new Error("timeout"); });
  assert.equal((await app.fetch(request(source), env, ctx)).status, 502);
});
