import type { Metadata } from "next";
import CategoriesPage from "../categories/category-page";
import CategorySourcingHero from "../categories/category-sourcing-hero";
import { buildCategoryMetadata } from "../seo";

export const metadata: Metadata = buildCategoryMetadata("bags");

export default function BagsPage() {
  return <CategoriesPage categoryKey="bags" hero={<CategorySourcingHero category="bags" />} />;
}
