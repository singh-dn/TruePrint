import { categoryCatalogues } from "../../categories/catalogue-config";

export async function GET(request: Request): Promise<Response> {
  const source = new URL(request.url).searchParams.get("url") ?? "";
  let url: URL;
  try {
    url = new URL(source);
  } catch {
    return Response.json({ message: "Invalid catalogue link." }, { status: 400 });
  }
  // Exact domain only: no subdomains, credentials, custom ports or redirects.
  if (url.protocol !== "https:" || url.hostname !== "fcrf.in" || url.port || url.username || url.password || url.hash) {
    return Response.json({ message: "Catalogue host is not allowed." }, { status: 403 });
  }
  const catalogue = Object.values(categoryCatalogues).flat().find((card) => card.url === source);
  if (!catalogue) {
    return Response.json({ message: "Catalogue not found." }, { status: 404 });
  }
  try {
    const upstream = await fetch(url.href, {
      redirect: "manual",
      credentials: "omit",
      headers: { Accept: "application/pdf" },
      signal: AbortSignal.any([request.signal, AbortSignal.timeout(120_000)]),
    });
    if (upstream.status !== 200 || !upstream.body || !upstream.headers.get("content-type")?.toLowerCase().startsWith("application/pdf")) {
      await upstream.body?.cancel();
      return Response.json({ message: "The catalogue server could not provide a PDF. Please retry." }, { status: 502 });
    }
    const fileName = catalogue.fileName.replace(/[^a-zA-Z0-9._-]/g, "-").replace(/\.pdf$/i, "") + ".pdf";
    // Forward only the document stream, never upstream cookies or other headers.
    return new Response(upstream.body, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="${fileName}"`,
        "Cache-Control": "private, no-store",
        "X-Content-Type-Options": "nosniff",
      },
    });
  } catch {
    return Response.json({ message: "The catalogue server is unavailable. Please retry." }, { status: 502 });
  }
}
