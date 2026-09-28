export type AdminRow = Record<string, string | number | boolean | null>;
export type AdminTable = { key: string; label: string; short: string; date: string; columns: string[]; search: string[]; statuses: string[]; kind: "intake" | "contact" | "source" | "catalogue" };
const common = ["id", "name", "email", "phone", "source_page", "status"];
const statuses = ["new", "contacted", "qualified", "closed", "spam"];
const files = ["reference_file_path", "reference_file_name", "reference_file_type", "reference_file_size"];
function catalogue(key: string, label: string): AdminTable { return { key, label: `${label} catalogues`, short: label, kind: "catalogue", date: "accessed_at", statuses, columns: [...common, "category_key", "catalogue_slot", "catalogue_title", "catalogue_url", "accessed_at"], search: ["name", "email", "phone", "catalogue_title"] }; }
export const ADMIN_TABLES: AdminTable[] = [
  { key: "homepage_project_intakes", label: "Project intakes", short: "Project intakes", kind: "intake", date: "submitted_at", columns: [...common, "requirement", "estimated_quantity", "organization", ...files, "consent", "completion_status", "step_one_submitted_at", "completed_at", "submitted_at"], search: ["name", "email", "phone", "organization", "requirement"], statuses: ["incomplete", ...statuses] },
  { key: "contact_enquiries", label: "Contact enquiries", short: "Contact enquiries", kind: "contact", date: "submitted_at", columns: [...common, "organization", "requirement", "submitted_at"], search: ["name", "email", "phone", "organization", "requirement"], statuses },
  { key: "source_requests", label: "Sourcing requests", short: "Sourcing requests", kind: "source", date: "submitted_at", columns: [...common, "organization", "requirement", ...files, "submitted_at"], search: ["name", "email", "phone", "organization", "requirement"], statuses: ["new", "reviewing", "sourced", "contacted", "closed", "spam"] },
  catalogue("diary_catalogue_downloads", "Diaries"), catalogue("visiting_cards_catalogue_downloads", "Visiting cards"), catalogue("pens_catalogue_downloads", "Pens"), catalogue("joining_kits_catalogue_downloads", "Joining kits"), catalogue("tech_products_catalogue_downloads", "Tech products"), catalogue("bags_catalogue_downloads", "Bags"), catalogue("drinkware_catalogue_downloads", "Drinkware"), catalogue("t_shirts_catalogue_downloads", "T-shirts"),
];
export function findAdminTable(key: string | null) { return ADMIN_TABLES.find(table => table.key === key); }
export function fieldLabel(key: string) { return key.replaceAll("_", " ").replace(/\b\w/g, c => c.toUpperCase()); }
export type AdminFilters = { search: string; status: string; from: string; to: string; sort: "newest" | "oldest" };
export const EMPTY_FILTERS: AdminFilters = { search: "", status: "", from: "", to: "", sort: "newest" };
export type RecordsResult = { rows: AdminRow[]; total: number; offset: number; hasMore: boolean };
