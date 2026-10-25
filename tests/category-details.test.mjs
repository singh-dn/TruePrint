import assert from "node:assert/strict";
import test from "node:test";
import { categoryDetails, categoryWhatsAppUrl } from "../app/categories/category-details.ts";
import { isCategoryVisible } from "../app/category-visibility.ts";
import { categorySeo } from "../app/seo.ts";
import config from "../next.config.ts";

const env = { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } };
const context = { waitUntil() {}, passThroughOnException() {} };

test("category pages render their own materials, WhatsApp brief and working project destination", async () => {
  const worker = (await import("../dist/server/index.js")).default;
  const home = await (await worker.fetch(new Request("http://localhost/"), env, context)).text();
  assert.match(home, /id="contact"/);
  for (const [key, details] of Object.entries(categoryDetails)) {
    const response = await worker.fetch(new Request(`http://localhost${categorySeo[key].path}`), env, context);
    assert.equal(response.status, 200, key);
    const html = await response.text();
    const materials = html.match(/<div class="diaryMaterials"[^>]*>([\s\S]*?)<\/div>/)?.[1];
    assert.ok(materials, key);
    assert.equal((materials.match(/<article>/g) ?? []).length, 6, key);
    for (const option of details.materials) assert.ok(materials.includes(option.name.replaceAll("&", "&amp;")), `${key}: ${option.name}`);
    if (key !== "diaries") assert.ok(!materials.includes("Buckram cloth"), key);
    assert.match(html, /class="[^"]*closingButton[^"]*" href="\/#contact"/);
    assert.ok(!html.includes('href="#contact"'), key);
    const expected = categoryWhatsAppUrl(key);
    const links = html.match(/<a\b[^>]*>/g) ?? [];
    assert.ok(links.some(link => link.includes(`href="${expected}"`)), key);
    const message = new URL(expected).searchParams.get("text");
    assert.ok(message.includes(details.enquiry), key);
    if (key !== "diaries") assert.ok(!message.includes("custom diary"), key);
    assert.ok(!links.some(link => /href="\/(?:categories(?:[\/#"]|$)|contact")/.test(link)), key);
  }
});

test("legacy category addresses still redirect in one hop and hidden Visiting Cards stay hidden", async () => {
  const worker = (await import("../dist/server/index.js")).default;
  for (const redirect of await config.redirects()) {
    const response = await worker.fetch(new Request(`http://localhost${redirect.source}`), env, context);
    assert.equal(response.status, 308, redirect.source);
    assert.equal(new URL(response.headers.get("location"), "http://localhost").pathname, redirect.destination);
  }
  for (const path of ["/custom-visiting-cards", "/categories/visiting-cards", "/categories/visiting-cards/?source=test#catalogue"]) {
    assert.equal(isCategoryVisible(path), false, path);
  }
  assert.equal(isCategoryVisible("/custom-branded-pens"), true);
});
