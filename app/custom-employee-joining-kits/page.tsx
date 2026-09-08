import type { Metadata } from "next";
import CategoriesPage from "../categories/category-page";
import { buildCategoryMetadata } from "../seo";

export const metadata: Metadata = buildCategoryMetadata("joining-kits");

export default function JoiningKitsPage() {
  return <CategoriesPage categoryKey="joining-kits" />;
}
