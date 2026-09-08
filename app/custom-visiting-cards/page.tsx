import type { Metadata } from "next";
import CategoriesPage from "../categories/category-page";
import { buildCategoryMetadata } from "../seo";

export const metadata: Metadata = buildCategoryMetadata("visiting-cards");

export default function VisitingCardsPage() {
  return <CategoriesPage categoryKey="visiting-cards" />;
}
