import assert from "node:assert/strict";
import test from "node:test";
import { readFile } from "node:fs/promises";
const worker = (await import("../dist/server/index.js")).default;
const env = { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } };
const context = { waitUntil() {}, passThroughOnException() {} };
test("privacy policy renders all sections and preserves its supplied text", async () => {
  const response = await worker.fetch(new Request("http://localhost/privacy-policy"), env, context);
  assert.equal(response.status, 200);
  const html = await response.text();
  assert.equal((html.match(/<h1\b/g) || []).length, 1);
  const article = html.match(/<article class="privacyCopy"[\s\S]*?<\/article>/)?.[0];
  assert.ok(article);
  assert.equal((article.match(/<h2>/g) || []).length, 18);
  assert.match(html, /https:\/\/thetrueprint.com\/privacy-policy/);
  assert.match(article, /Cloudflare Turnstile/);
  assert.match(article, /Supabase/);
  assert.match(article, /\/contact-trueprint/);
  assert.doesNotMatch(article, /\[INSERT|Important implementation requirement/);
  const plain = article.replace(/<[^>]+>/g, "").replace(/&amp;/g, "&").replace(/&quot;/g, '"').replace(/&#x27;|&#39;/g, "'").replace(/&lt;/g, "<").replace(/&gt;/g, ">");
  const source = await readFile(new URL("../app/privacy-policy/page.tsx", import.meta.url), "utf8");
  const copy = source.split('<article className="privacyCopy"')[1].split("</article>")[0];
  for (const match of copy.matchAll(/\{("(?:[^"\\]|\\.)*")\}/g)) {
    assert.ok(plain.includes(JSON.parse(match[1])), match[1]);
  }
});
test("all public pages expose the privacy link only within their footer", async () => {
  const paths = ["/", "/about-us", "/contact-trueprint", "/custom-visiting-cards", "/custom-corporate-diaries", "/custom-branded-pens", "/custom-employee-joining-kits", "/custom-corporate-tech-products", "/custom-corporate-bags", "/custom-corporate-drinkware", "/custom-corporate-t-shirts", "/privacy-policy"];
  for (const path of paths) {
    const response = await worker.fetch(new Request("http://localhost" + path), env, context);
    assert.equal(response.status, 200, path);
    const html = await response.text();
    const footer = html.match(/<footer\b[\s\S]*?<\/footer>/)?.[0];
    assert.ok(footer?.includes('href="/privacy-policy"'), path);
    const nav = html.match(/<header\b[\s\S]*?<\/header>/)?.[0];
    assert.ok(!nav?.includes('href="/privacy-policy"'), path);
  }
});
