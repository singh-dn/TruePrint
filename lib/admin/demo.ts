import { ADMIN_TABLES, type AdminRow } from "./schema";
/** Fictional preview data only; never written to the database. */
export function demoRecords(now = new Date()): Record<string, AdminRow[]> {
  const names = ["Aarav Mehta", "Ananya Shah", "Rohan Kapoor", "Meera Nair", "Dev Malhotra", "Kavya Rao", "Arjun Sethi", "Ishita Bose", "Neel Joshi", "Sana Khan", "Vihaan Das", "Tara Verma"];
  const organizations = ["Studio North (sample)", "Meridian Labs (sample)", "Cedar Works (sample)", "Bloom Collective (sample)"];
  const requirements = ["We need 500 custom joining kits for our new team. Delivery this week if possible.", "Premium notebooks with our company logo for the annual conference.", "Exploring sustainable corporate gifts. Please share available options.", "Please quote for branded bottles for an upcoming event. Budget INR 40,000."];
  return Object.fromEntries(ADMIN_TABLES.map((table, t) => [table.key, Array.from({ length: 36 - t }, (_, i) => {
    const date = new Date(now.getTime() - (i * 21 + t) * 3600000).toISOString(); const row: AdminRow = Object.fromEntries(table.columns.map(key => [key, null]));
    Object.assign(row, { id: `00000000-0000-4000-8000-${String(t * 1000 + i).padStart(12, "0")}`, name: names[i % names.length], email: `sample${i % names.length + 1}@example.com`, phone: "+91 00000 00000", source_page: table.kind === "contact" ? "/contact-trueprint" : "/", status: table.statuses[i % 4 === 0 ? 0 : i % table.statuses.length], [table.date]: date });
    if (table.kind === "catalogue") Object.assign(row, { category_key: table.short.toLowerCase().replaceAll(" ", "-"), catalogue_slot: "premium", catalogue_title: `${table.short} — premium collection`, catalogue_url: "https://example.com/sample-catalogue.pdf" }); else Object.assign(row, { requirement: requirements[i % requirements.length], organization: organizations[i % organizations.length] });
    if (table.kind === "intake") Object.assign(row, { estimated_quantity: row.status === "incomplete" ? null : 250 * ((i % 4) + 1), consent: row.status !== "incomplete", completion_status: row.status === "incomplete" ? "incomplete" : "complete", completed_at: row.status === "incomplete" ? null : date, step_one_submitted_at: date }); return row;
  })]));
}
