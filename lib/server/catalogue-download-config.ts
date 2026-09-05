import type { FormTable } from "./supabase-rest";

export const catalogueDownloadTables = {
  diaries: "diary_catalogue_downloads",
  "visiting-cards": "visiting_cards_catalogue_downloads",
  pens: "pens_catalogue_downloads",
  "joining-kits": "joining_kits_catalogue_downloads",
  "tech-products": "tech_products_catalogue_downloads",
  bags: "bags_catalogue_downloads",
  drinkware: "drinkware_catalogue_downloads",
  "t-shirts": "t_shirts_catalogue_downloads",
} as const satisfies Record<string, FormTable>;

export type CatalogueDownloadCategory = keyof typeof catalogueDownloadTables;

export function resolveCatalogueDownloadTable(category: string): FormTable | null {
  return Object.prototype.hasOwnProperty.call(catalogueDownloadTables, category)
    ? catalogueDownloadTables[category as CatalogueDownloadCategory]
    : null;
}
