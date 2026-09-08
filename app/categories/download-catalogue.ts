// Fetch a real PDF before asking the browser to save it. Cross-origin hosts must
// permit CORS; do not silently navigate to a viewer or bypass the saved-lead flow.
export async function downloadCataloguePdf(url: string, fileName: string, signal?: AbortSignal) {
  if (!url.startsWith("https://")) throw new Error("This PDF link is not available yet.");
  let blob: Blob;
  try {
    const response = await fetch(url, {
      credentials: "omit",
      signal: signal ? AbortSignal.any([signal, AbortSignal.timeout(120_000)]) : AbortSignal.timeout(120_000),
    });
    if (!response.ok) throw new Error("PDF unavailable");
    blob = await response.blob();
    const signature = await blob.slice(0, 5).text();
    if (signature !== "%PDF-") throw new Error("Not a PDF");
  } catch {
    throw new Error("The PDF could not be downloaded. Please retry or contact us for the file.");
  }
  const objectUrl = URL.createObjectURL(new Blob([blob], { type: "application/pdf" }));
  const link = document.createElement("a");
  link.href = objectUrl;
  link.download = fileName.replace(/[^a-zA-Z0-9._-]/g, "-").replace(/\.pdf$/i, "") + ".pdf";
  document.body.appendChild(link);
  try {
    link.click();
  } finally {
    link.remove();
    // Give the browser time to consume the object URL before releasing it.
    setTimeout(() => URL.revokeObjectURL(objectUrl), 60_000);
  }
}
