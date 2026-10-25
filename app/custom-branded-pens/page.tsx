import type { Metadata } from "next";
import CategoriesPage from "../categories/category-page";
import CategorySourcingHero from "../categories/category-sourcing-hero";
import { buildCategoryMetadata } from "../seo";

export const metadata: Metadata = buildCategoryMetadata("pens");

export default function PensPage() {
  return <CategoriesPage categoryKey="pens" hero={<CategorySourcingHero category="pens" />} />;
}
