import type { AdminRow, AdminTable } from "./schema";
import { fieldLabel } from "./schema";
export async function downloadWorkbook(sheets: { table: AdminTable; rows: AdminRow[] }[], demo: boolean, signal?: AbortSignal) {
  const { default: ExcelJS } = await import("exceljs");
  const workbook = new ExcelJS.Workbook(); workbook.creator = "TruePrint"; workbook.created = new Date();
  for (const { table, rows } of sheets) {
    const sheet = workbook.addWorksheet(table.short.slice(0, 31)); sheet.columns = table.columns.map(key => ({ header: fieldLabel(key), key, width: key === "requirement" ? 65 : key.includes("email") || key.includes("at") ? 30 : 24 }));
    // Form text is a string cell, never a formula or an executable hyperlink.
    for (const row of rows) sheet.addRow(Object.fromEntries(table.columns.map(key => { const value = row[key]; return [key, typeof value === "string" ? value.replace(/[\x00-\x08\x0b\x0c\x0e-\x1f]/g, "").slice(0, 32767) : value ?? ""]; })));
    sheet.views = [{ state: "frozen", ySplit: 1 }]; sheet.autoFilter = { from: { row: 1, column: 1 }, to: { row: Math.max(1, rows.length + 1), column: table.columns.length } }; sheet.getRow(1).font = { bold: true, color: { argb: "FFFFFFFF" } }; sheet.getRow(1).fill = { type: "pattern", pattern: "solid", fgColor: { argb: "FF176BDD" } }; sheet.getRow(1).height = 26;
  }
  const buffer = await workbook.xlsx.writeBuffer(); signal?.throwIfAborted();
  const url = URL.createObjectURL(new Blob([new Uint8Array(buffer)], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" })); const link = document.createElement("a"); link.href = url; link.download = `trueprint-${demo ? "SAMPLE-" : ""}${sheets.length === 1 ? sheets[0].table.key : "all-tables"}-${new Date().toISOString().slice(0, 10)}.xlsx`; document.body.appendChild(link); link.click(); link.remove(); setTimeout(() => URL.revokeObjectURL(url), 60000);
}
