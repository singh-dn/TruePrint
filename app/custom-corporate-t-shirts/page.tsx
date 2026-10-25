import type { Metadata } from "next";
import CategoriesPage from "../categories/category-page";
import CategorySourcingHero from "../categories/category-sourcing-hero";
import { buildCategoryMetadata } from "../seo";

export const metadata: Metadata = buildCategoryMetadata("t-shirts");

export default function TShirtsPage() {
  return <CategoriesPage categoryKey="t-shirts" hero={<CategorySourcingHero category="t-shirts" />} />;
}
