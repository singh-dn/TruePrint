import type { Metadata } from "next";
import CategoriesPage from "../page";
import { buildCategoryMetadata } from "../../seo";

export const metadata: Metadata = buildCategoryMetadata("bags");

export default function BagsPage() {
  return <CategoriesPage categoryKey="bags" />;
}
