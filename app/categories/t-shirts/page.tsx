import type { Metadata } from "next";
import CategoriesPage from "../page";
import { buildCategoryMetadata } from "../../seo";

export const metadata: Metadata = buildCategoryMetadata("t-shirts");

export default function TShirtsPage() {
  return <CategoriesPage categoryKey="t-shirts" />;
}
