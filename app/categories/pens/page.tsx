import type { Metadata } from "next";
import CategoriesPage from "../page";
import { buildCategoryMetadata } from "../../seo";

export const metadata: Metadata = buildCategoryMetadata("pens");

export default function PensPage() {
  return <CategoriesPage categoryKey="pens" />;
}
