import type { ImgHTMLAttributes } from "react";
import variants from "./image-variants.json";

const imageVariants = variants as Record<string, string>;

// Render the same img element so existing layout, styling and events stay intact.
// Static variants require no image API or database access.
export default function SiteImage({
  src,
  srcSet,
  sizes,
  loading = "lazy",
  decoding = "async",
  ...props
}: ImgHTMLAttributes<HTMLImageElement>) {
  const candidates = srcSet ?? (typeof src === "string" ? imageVariants[src] : undefined);
  return <img {...props} data-site-image="true" data-auto-image-size={sizes ? undefined : "true"} src={src} srcSet={candidates} sizes={candidates ? (sizes ?? "(max-width: 680px) 100vw, 50vw") : undefined} loading={loading} decoding={decoding} />;
}
