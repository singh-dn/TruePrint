import type { Metadata } from "next";
import CategoriesPage from "../categories/category-page";
import { buildCategoryMetadata } from "../seo";

export const metadata: Metadata = buildCategoryMetadata("diaries");

export default function DiariesPage() {
  return <CategoriesPage categoryKey="diaries" />;
}
