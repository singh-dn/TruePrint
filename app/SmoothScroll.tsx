"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/** Ease desktop wheel steps without transforming the page or replacing touch scroll. */
export default function SmoothScroll() {
  const pathname = usePathname();

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)");
    let frame = 0;
    let target = window.scrollY;
    let writtenY = window.scrollY;
    let previousTime = 0;
    const root = document.documentElement;

    const stop = () => {
      cancelAnimationFrame(frame);
      frame = 0;
      root.classList.remove("wheelSmoothing");
    };

    const tick = (time: number) => {
      // Yield to navigation, browser search, or other programmatic scrolling.
      if (Math.abs(window.scrollY - writtenY) > 2) {
        stop();
        return;
      }
      const elapsed = Math.min(time - previousTime, 64);
      previousTime = time;
      target = Math.max(0, Math.min(target, root.scrollHeight - window.innerHeight));
      const distance = target - window.scrollY;
      const next = Math.abs(distance) < 1 ? target : window.scrollY + distance * (1 - Math.exp(-elapsed / 135));
      window.scrollTo({ top: next, behavior: "instant" });
      writtenY = window.scrollY;
      if (Math.abs(target - writtenY) < 1) stop();
      else frame = requestAnimationFrame(tick);
    };

    const wheel = (event: WheelEvent) => {
      if (event.defaultPrevented || !event.cancelable || reducedMotion.matches || !finePointer.matches || event.ctrlKey || event.metaKey || event.shiftKey || Math.abs(event.deltaX) > Math.abs(event.deltaY)) {
        stop();
        return;
      }
      // Preserve fine trackpad input and its existing native momentum.
      if (event.deltaMode === 0 && Math.abs(event.deltaY) < 50) {
        stop();
        return;
      }
      if (!event.deltaY) return;
      if ([document.body, root].some(element => /hidden|clip/.test(getComputedStyle(element).overflowY))) {
        stop();
        return;
      }
      for (const element of event.composedPath()) {
        if (!(element instanceof HTMLElement) || element === document.body || element === root) continue;
        if (element.matches("input, textarea, select, video, [contenteditable], [role='dialog'], [data-native-scroll]") || (/auto|scroll/.test(getComputedStyle(element).overflowY) && element.scrollHeight > element.clientHeight)) {
          stop();
          return;
        }
      }
      const delta = event.deltaY * (event.deltaMode === 1 ? 16 : event.deltaMode === 2 ? window.innerHeight : 1);
      if (!frame || Math.sign(delta) !== Math.sign(target - window.scrollY)) target = window.scrollY;
      target = Math.max(0, Math.min(target + delta, root.scrollHeight - window.innerHeight));
      if (target === window.scrollY) return;
      event.preventDefault();
      if (!frame) {
        root.classList.add("wheelSmoothing");
        writtenY = window.scrollY;
        previousTime = performance.now();
        frame = requestAnimationFrame(tick);
      }
    };

    // Do not register a blocking wheel listener on touch-only devices.
    const syncInput = () => {
      stop();
      window.removeEventListener("wheel", wheel);
      if (finePointer.matches && !reducedMotion.matches) {
        window.addEventListener("wheel", wheel, { passive: false });
      }
    };
    syncInput();
    window.addEventListener("pointerdown", stop, { passive: true });
    window.addEventListener("touchstart", stop, { passive: true });
    window.addEventListener("keydown", stop);
    window.addEventListener("hashchange", stop);
    reducedMotion.addEventListener("change", syncInput);
    finePointer.addEventListener("change", syncInput);
    return () => {
      stop();
      window.removeEventListener("wheel", wheel);
      window.removeEventListener("pointerdown", stop);
      window.removeEventListener("touchstart", stop);
      window.removeEventListener("keydown", stop);
      window.removeEventListener("hashchange", stop);
      reducedMotion.removeEventListener("change", syncInput);
      finePointer.removeEventListener("change", syncInput);
    };
  }, [pathname]);

  return null;
}
