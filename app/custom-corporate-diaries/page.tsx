import type { Metadata } from "next";
import CategoriesPage from "../categories/category-page";
import { buildCategoryMetadata } from "../seo";
import DiarySourcingHero from "./diary-sourcing-hero";

export const metadata: Metadata = buildCategoryMetadata("diaries");

export default function DiariesPage() {
  return <CategoriesPage categoryKey="diaries" hero={<DiarySourcingHero />} />;
}
