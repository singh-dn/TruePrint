import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const pages = [
  ["pens", "custom-branded-pens", "#176f66"],
  ["joining-kits", "custom-employee-joining-kits", "#6a50a0"],
  ["tech-products", "custom-corporate-tech-products", "#315e98"],
  ["bags", "custom-corporate-bags", "#08727a"],
  ["drinkware", "custom-corporate-drinkware", "#176e6a"],
  ["t-shirts", "custom-corporate-t-shirts", "#a62537"],
];
const env = { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } };
const context = { waitUntil() {}, passThroughOnException() {} };

test("each category banner renders its own palette, responsive product image and catalogue destination", async () => {
  const worker = (await import("../dist/server/index.js")).default;
  for (const [key, path, accent] of pages) {
    const response = await worker.fetch(new Request(`http://localhost/${path}`), env, context);
    assert.equal(response.status, 200, path);
    const html = await response.text();
    assert.ok(html.includes(`categorySourceHero--${key}`), path);
    assert.ok(html.includes(`--banner-accent:${accent}`), path);
    assert.equal((html.match(/<h1\b/g) ?? []).length, 1, path);
    assert.match(html, /class="categorySourceHeroCta" href="#diary-catalogue"/);
    assert.ok(html.includes('id="diary-catalogue"'), path);
    const image = (html.match(/<img\b[^>]*>/g) ?? []).find(tag => tag.includes(`/images/category-banners/${key}.webp`));
    assert.ok(image, path);
    assert.match(image, /fetchPriority="high"/i);
    assert.match(image, /768w.*1536w/);
    for (const suffix of ["", "-768"]) {
      const bytes = await readFile(new URL(`../public/images/category-banners/${key}${suffix}.webp`, import.meta.url));
      assert.equal(bytes.subarray(8, 12).toString(), "WEBP");
    }
    assert.ok(!(html.match(/<a\b[^>]*>/g) ?? []).some(tag => tag.includes('href="/custom-visiting-cards"')));
  }
});

test("the approved diary banner and preserved Visiting Cards page retain their original heroes", async () => {
  const worker = (await import("../dist/server/index.js")).default;
  for (const [path, expected] of [["custom-corporate-diaries", "diarySourceHero"], ["custom-visiting-cards", "categoryDiaryHero"]]) {
    const response = await worker.fetch(new Request(`http://localhost/${path}`), env, context);
    assert.equal(response.status, 200);
    const html = await response.text();
    assert.ok(html.includes(`class="${expected}"`));
    assert.ok(!html.includes("categorySourceHero--"));
  }
});
