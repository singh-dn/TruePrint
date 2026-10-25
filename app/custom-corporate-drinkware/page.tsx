import type { Metadata } from "next";
import CategoriesPage from "../categories/category-page";
import CategorySourcingHero from "../categories/category-sourcing-hero";
import { buildCategoryMetadata } from "../seo";

export const metadata: Metadata = buildCategoryMetadata("drinkware");

export default function DrinkwarePage() {
  return <CategoriesPage categoryKey="drinkware" hero={<CategorySourcingHero category="drinkware" />} />;
}
