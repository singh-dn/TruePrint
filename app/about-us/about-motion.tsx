"use client";
import { useEffect } from "react";

export default function AboutMotion() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || !("IntersectionObserver" in window)) return;
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-revealed");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    document.querySelectorAll(".aboutPage .aboutReveal").forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);
  return null;
}
