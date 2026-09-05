"use client";

import { useEffect } from "react";

const SCROLL_THRESHOLD = 28;

export default function ScrollHeader() {
  useEffect(() => {
    const header = document.querySelector<HTMLElement>("[data-site-header]");

    if (!header) return;

    const materials = document.getElementById("materials");
    const homeLinks = header.querySelectorAll<HTMLAnchorElement>('a[href="#top"]');
    const materialLinks = header.querySelectorAll<HTMLAnchorElement>('a[href="#materials"]');

    let frame = 0;
    let materialsThreshold = Number.POSITIVE_INFINITY;

    const measureSections = () => {
      materialsThreshold = materials
        ? materials.offsetTop - window.innerHeight * 0.38
        : Number.POSITIVE_INFINITY;
    };

    const updateHeader = () => {
      frame = 0;
      const scrollPosition = window.scrollY;
      const materialsActive = scrollPosition >= materialsThreshold;

      header.classList.toggle("isScrolled", scrollPosition > SCROLL_THRESHOLD);
      homeLinks.forEach((link) => {
        link.classList.toggle("active", !materialsActive);
      });
      materialLinks.forEach((link) => {
        link.classList.toggle("active", materialsActive);
      });
    };

    const handleScroll = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(updateHeader);
    };

    const handleResize = () => {
      measureSections();
      handleScroll();
    };

    measureSections();
    updateHeader();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleResize, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  return null;
}
