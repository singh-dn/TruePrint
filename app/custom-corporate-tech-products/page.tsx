import type { Metadata } from "next";
import CategoriesPage from "../categories/category-page";
import CategorySourcingHero from "../categories/category-sourcing-hero";
import { buildCategoryMetadata } from "../seo";

export const metadata: Metadata = buildCategoryMetadata("tech-products");

export default function TechProductsPage() {
  return <CategoriesPage categoryKey="tech-products" hero={<CategorySourcingHero category="tech-products" />} />;
}
