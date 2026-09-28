import type { Metadata } from "next";
import AdminDashboard from "./dashboard";
import { adminConfigured } from "../../lib/server/admin-auth";
import "./admin.css";
export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "TruePrint Admin", description: "Private TruePrint administration.", robots: { index: false, follow: false, nocache: true, googleBot: { index: false, follow: false, noimageindex: true } } };
export default function AdminPage() { return <AdminDashboard configured={adminConfigured()} demoEnabled={process.env.TRUEPRINT_ADMIN_DEMO === "true"} />; }
