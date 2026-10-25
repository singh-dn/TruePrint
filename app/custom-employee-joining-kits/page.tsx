import type { Metadata } from "next";
import CategoriesPage from "../categories/category-page";
import CategorySourcingHero from "../categories/category-sourcing-hero";
import { buildCategoryMetadata } from "../seo";

export const metadata: Metadata = buildCategoryMetadata("joining-kits");

export default function JoiningKitsPage() {
  return <CategoriesPage categoryKey="joining-kits" hero={<CategorySourcingHero category="joining-kits" />} />;
}
