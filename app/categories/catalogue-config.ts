// Each category owns its full card list. Add/remove/reorder entries in its JSON file.
// Set url to an absolute HTTPS PDF link on fcrf.in; the download endpoint allows only that host.
// Keep slot unique within a category. fileName controls the saved filename.
// Optional sizeLabel (e.g. "18.4 MB") is displayed only when supplied.
import diaries from "./catalogues/diaries.json";
import visiting_cards from "./catalogues/visiting-cards.json";
import pens from "./catalogues/pens.json";
import joining_kits from "./catalogues/joining-kits.json";
import tech_products from "./catalogues/tech-products.json";
import bags from "./catalogues/bags.json";
import drinkware from "./catalogues/drinkware.json";
import t_shirts from "./catalogues/t-shirts.json";

export type Catalogue = {
  slot: string;
  eyebrow: string;
  title: string;
  description: string;
  image: string;
  alt: string;
  badge: string;
  tags?: string[];
  url: string;
  fileName: string;
  sizeLabel?: string;
};

export const categoryCatalogues: Record<string, Catalogue[]> = {
  "diaries": diaries,
  "visiting-cards": visiting_cards,
  "pens": pens,
  "joining-kits": joining_kits,
  "tech-products": tech_products,
  "bags": bags,
  "drinkware": drinkware,
  "t-shirts": t_shirts,
};
