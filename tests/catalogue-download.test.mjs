import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { downloadCataloguePdf } from "../app/categories/download-catalogue.ts";

test("saves the selected PDF with its filename without opening a viewer", async (t) => {
  let clicked = false;
  let removed = false;
  const anchor = { click() { clicked = true; }, remove() { removed = true; } };
  t.mock.method(globalThis, "fetch", async (url) => {
    assert.equal(url, "https://files.example/diaries.pdf");
    return new Response("%PDF-1.7\nexample");
  });
  t.mock.method(URL, "createObjectURL", (blob) => {
    assert.equal(blob.type, "application/pdf");
    return "blob:download";
  });
  t.mock.method(globalThis, "setTimeout", () => 0);
  Object.defineProperty(globalThis, "document", { configurable: true, value: {
    createElement(tag) { assert.equal(tag, "a"); return anchor; },
    body: { appendChild(node) { assert.equal(node, anchor); } },
  } });
  t.after(() => { delete globalThis.document; });
  await downloadCataloguePdf("https://files.example/diaries.pdf", "diaries.pdf");
  assert.equal(anchor.href, "blob:download");
  assert.equal(anchor.download, "diaries.pdf");
  assert.equal(clicked, true);
  assert.equal(removed, true);
});

test("rejects missing URLs, unavailable files, HTML viewers and blocked fetches", async (t) => {
  const fetchMock = t.mock.method(globalThis, "fetch", async () => new Response("missing", { status: 404 }));
  await assert.rejects(downloadCataloguePdf("", "a.pdf"), /not available/);
  assert.equal(fetchMock.mock.callCount(), 0);
  await assert.rejects(downloadCataloguePdf("https://files.example/a.pdf", "a.pdf"), /could not be downloaded/);
  fetchMock.mock.mockImplementation(async () => new Response("<html>viewer</html>"));
  await assert.rejects(downloadCataloguePdf("https://files.example/a.pdf", "a.pdf"), /could not be downloaded/);
  fetchMock.mock.mockImplementation(async () => { throw new TypeError("Failed to fetch"); });
  await assert.rejects(downloadCataloguePdf("https://files.example/a.pdf", "a.pdf"), /could not be downloaded/);
});

test("category card lists are independent with unique slots and existing images", () => {
  const categories = ["diaries", "visiting-cards", "pens", "joining-kits", "tech-products", "bags", "drinkware", "t-shirts"];
  const lists = categories.map((category) => JSON.parse(readFileSync(new URL(`../app/categories/catalogues/${category}.json`, import.meta.url))));
  for (const cards of lists) {
    assert.equal(new Set(cards.map((card) => card.slot)).size, cards.length);
    for (const card of cards) {
      assert.ok(card.fileName.endsWith(".pdf"));
      assert.ok(card.url === "" || card.url.startsWith("https://"));
      assert.ok(readFileSync(new URL(`../public${card.image}`, import.meta.url)).length > 0);
    }
  }
  const otherCount = lists[1].length;
  lists[0].pop();
  assert.equal(lists[1].length, otherCount);
});
