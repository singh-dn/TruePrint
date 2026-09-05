export const defaultCatalogueViewerUrl =
  "https://drive.google.com/file/d/1mLRRmqM-3ARBjWvk508X0O2pnjbzqZG3/view?usp=drive_link";

export type CatalogueCategoryKey =
  | "diaries"
  | "visiting-cards"
  | "pens"
  | "joining-kits"
  | "tech-products"
  | "bags"
  | "drinkware"
  | "t-shirts";

export type CatalogueSlot =
  | "complete-collection"
  | "diaries-and-planners"
  | "corporate-gifting"
  | "softcover-diaries"
  | "executive-editions"
  | "presentation-and-packaging"
  | "branded-details";

// Add a URL under the relevant category and card slot whenever a catalogue
// receives its own Google Drive PDF. Unset slots use the shared default above.
export const catalogueViewerLinks: Record<
  CatalogueCategoryKey,
  Partial<Record<CatalogueSlot, string>>
> = {
  diaries: {},
  "visiting-cards": {},
  pens: {},
  "joining-kits": {},
  "tech-products": {},
  bags: {},
  drinkware: {},
  "t-shirts": {},
};

export function getCatalogueViewerUrl(category: string, slot: CatalogueSlot): string {
  const categoryLinks = catalogueViewerLinks[category as CatalogueCategoryKey];
  return categoryLinks?.[slot] ?? defaultCatalogueViewerUrl;
}
