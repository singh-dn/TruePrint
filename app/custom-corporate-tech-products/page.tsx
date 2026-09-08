import type { Metadata } from "next";
import CategoriesPage from "../categories/category-page";
import { buildCategoryMetadata } from "../seo";

export const metadata: Metadata = buildCategoryMetadata("tech-products");

export default function TechProductsPage() {
  return <CategoriesPage categoryKey="tech-products" />;
}
