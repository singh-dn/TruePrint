import assert from "node:assert/strict";
import { test } from "node:test";
import { readFileSync, existsSync, readdirSync } from "node:fs";
import { SITE_URL, categorySeo, homeSeo, buildPageMetadata, buildCategoryMetadata, buildCategoryJsonLd } from "../app/seo.ts";
import config from "../next.config.ts";

const expectedPaths = [
  "/contact-trueprint", "/custom-visiting-cards", "/custom-corporate-diaries",
  "/custom-branded-pens", "/custom-employee-joining-kits", "/custom-corporate-tech-products",
  "/custom-corporate-bags", "/custom-corporate-drinkware", "/custom-corporate-t-shirts",
];
const root = new URL("../", import.meta.url);

test("all requested page files and production canonical URLs are present", () => {
  assert.equal(SITE_URL, "https://thetrueprint.com");
  for (const path of expectedPaths) assert.ok(existsSync(new URL(`app${path}/page.tsx`, root)), path);
  assert.equal(buildPageMetadata(homeSeo).alternates.canonical, SITE_URL + "/");
  assert.deepEqual(Object.values(categorySeo).map(c => c.path).sort(), expectedPaths.filter(p => p !== "/contact-trueprint").sort());
  for (const key of Object.keys(categorySeo)) {
    const seo = categorySeo[key];
    const metadata = buildCategoryMetadata(key);
    assert.equal(metadata.alternates.canonical, SITE_URL + seo.path);
    assert.equal(metadata.openGraph.url, metadata.alternates.canonical);
    assert.equal(metadata.title, seo.title);
    assert.equal(metadata.description, seo.description);
    assert.equal(metadata.robots.index, true);
    assert.equal(buildCategoryJsonLd(key)["@graph"][0].url, metadata.alternates.canonical);
  }
});

test("all legacy pages permanently redirect directly to final page addresses", async () => {
  const redirects = await config.redirects();
  assert.equal(redirects.length, 10);
  assert.equal(new Set(redirects.map(r => r.source)).size, 10);
  for (const redirect of redirects) {
    assert.equal(redirect.permanent, true);
    assert.ok(expectedPaths.includes(redirect.destination));
    assert.ok(!redirects.some(r => r.source === redirect.destination), "No redirect chains");
    assert.ok(!existsSync(new URL(`app${redirect.source}/page.tsx`, root)), "No duplicate page");
  }
});

test("public navigation contains no legacy URLs or preview domain", () => {
  function walk(dir) {
    return readdirSync(dir, { withFileTypes: true }).flatMap(e =>
      e.isDirectory() ? walk(new URL(e.name + "/", dir)) : [new URL(e.name, dir)]);
  }
  for (const file of walk(new URL("app/", root)).filter(f => /\.(tsx|ts)$/.test(f.pathname))) {
    const source = readFileSync(file, "utf8");
    assert.doesNotMatch(source, /["']\/categories(?:\/[^"'#]*|#[^"']*)?["']/);
    assert.doesNotMatch(source, /["']\/contact["']/);
    assert.doesNotMatch(source, /harshwardensingh\.chatgpt\.site/);
  }
});
