"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

// Start section images ahead of the viewport, including clipped carousel slides.
// Keep real src/srcSet attributes in server HTML for native/no-JavaScript loading.
export default function ImageReadiness() {
  const pathname = usePathname();

  useEffect(() => {
    if (!("IntersectionObserver" in window)) return;
    const groups = new Map<Element, Set<HTMLImageElement>>();
    const seen = new WeakSet<HTMLImageElement>();
    const ready = new WeakSet<Element>();
    const connection = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection;

    const sizeImage = (image: HTMLImageElement) => {
      // Use the actual layout width before the lazy request starts. This avoids
      // downloading a half-screen image for a small logo, and preserves DPR.
      const width = image.getBoundingClientRect().width;
      if (image.dataset.autoImageSize === "true" && width > 0 && image.srcset) {
        const sizes = `${Math.ceil(width)}px`;
        if (image.sizes !== sizes) image.sizes = sizes;
      }
    };
    const resize = typeof ResizeObserver !== "undefined" ? new ResizeObserver(entries => {
      entries.forEach(entry => sizeImage(entry.target as HTMLImageElement));
    }) : null;

    const start = (image: HTMLImageElement) => {
      sizeImage(image);
      if (image.dataset.autoImageSize === "true") resize?.observe(image);
      image.loading = "eager";
    };

    const observer = new IntersectionObserver(entries => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        ready.add(entry.target);
        groups.get(entry.target)?.forEach(start);
        groups.delete(entry.target);
        observer.unobserve(entry.target);
      }
    }, { rootMargin: connection?.saveData ? "600px 0px" : "2400px 0px", threshold: 0 });

    const register = (scope: ParentNode) => {
      const images = Array.from(scope.querySelectorAll<HTMLImageElement>('img[data-site-image][loading="lazy"]'));
      if (scope instanceof HTMLImageElement && scope.matches('[data-site-image][loading="lazy"]')) images.push(scope);
      for (const image of images) {
        if (seen.has(image)) continue;
        seen.add(image);
        const section = image.closest("section, footer") || image;
        if (ready.has(section)) {
          start(image);
        } else {
          if (!groups.has(section)) {
            groups.set(section, new Set());
            observer.observe(section);
          }
          groups.get(section)!.add(image);
        }
      }
    };

    register(document);
    // Also cover images mounted after switching a client story or gallery tab.
    const mutations = new MutationObserver(records => {
      for (const record of records) {
        for (const node of record.addedNodes) {
          if (node instanceof Element) register(node);
        }
        for (const node of record.removedNodes) {
          if (!(node instanceof Element)) continue;
          if (node instanceof HTMLImageElement) resize?.unobserve(node);
          node.querySelectorAll("img[data-site-image]").forEach(image => resize?.unobserve(image));
        }
      }
    });
    mutations.observe(document.body, { childList: true, subtree: true });
    return () => {
      observer.disconnect();
      mutations.disconnect();
      resize?.disconnect();
      groups.clear();
    };
  }, [pathname]);

  return null;
}
