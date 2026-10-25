// Hidden from public discovery only; routes, content and catalogue configuration stay intact.
const hiddenCategoryPaths = new Set([
  "/custom-visiting-cards",
  "/categories/visiting-cards",
]);

export function isCategoryVisible(path: string): boolean {
  return !hiddenCategoryPaths.has(path.split(/[?#]/, 1)[0].replace(/\/$/, ""));
}
