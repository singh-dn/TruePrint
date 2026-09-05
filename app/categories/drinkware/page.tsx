import type { Metadata } from "next";
import CategoriesPage from "../page";
import { buildCategoryMetadata } from "../../seo";

export const metadata: Metadata = buildCategoryMetadata("drinkware");

export default function DrinkwarePage() {
  return <CategoriesPage categoryKey="drinkware" />;
}
