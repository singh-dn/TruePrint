"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { CSSProperties, KeyboardEvent, PointerEvent as ReactPointerEvent } from "react";

type GalleryCategory = "diaries" | "joining-kits";

type GalleryItem = {
  title: string;
  context: string;
  src: string;
  alt: string;
};

type GalleryProfile = {
  eyebrow: string;
  title: string;
  titleLines: readonly [string, string];
  lede: string;
  itemName: string;
  items: GalleryItem[];
};

const galleryProfiles: Record<GalleryCategory, GalleryProfile> = {
  diaries: {
    eyebrow: "The gallery",
    title: "Diaries, made tangible.",
    titleLines: ["Diaries, made", "tangible."],
    lede: "Explore considered cover materials, page formats and finishing details shaped for everyday use, teams and gifting.",
    itemName: "diary",
    items: [
      { title: "Bound in texture", context: "Hardcover diary", src: "/diary-hero.webp", alt: "Premium hardcover TruePrint diary with a tactile cover" },
      { title: "Open to planning", context: "Planner layout", src: "/diary-planner.webp", alt: "Open TruePrint diary showing a practical planner layout" },
      { title: "A lighter format", context: "Softcover diary", src: "/diary-softcover.webp", alt: "Flexible softcover TruePrint diary" },
      { title: "Executive detail", context: "Editorial finish", src: "/trueprint-editorial.webp", alt: "Premium editorial print details suitable for executive diaries" },
      { title: "Brand in the details", context: "Foil and print", src: "/trueprint-detail.png", alt: "Close-up of refined TruePrint branding and finishing" },
      { title: "Made for presentation", context: "Gift packaging", src: "/trueprint-packaging.webp", alt: "TruePrint presentation packaging for a premium diary gift" },
      { title: "A complete collection", context: "Branded diaries", src: "/trueprint-diaries.jpeg", alt: "Collection of branded TruePrint diaries" },
      { title: "Plans that stay clear", context: "Inside pages", src: "/diary-planner.webp", alt: "Detailed planner pages inside a TruePrint diary" },
      { title: "Ready to be remembered", context: "Finished diary", src: "/diary-hero.webp", alt: "Finished premium TruePrint diary ready for gifting" },
    ],
  },
  "joining-kits": {
    eyebrow: "The gallery",
    title: "Joining kits, thoughtfully assembled.",
    titleLines: ["Joining kits,", "thoughtfully assembled."],
    lede: "See how useful products, considered packaging and consistent branding come together as one memorable welcome.",
    itemName: "joining kit",
    items: [
      { title: "Welcome in one box", context: "Complete joining kit", src: "/trueprint-joining-kits.jpeg", alt: "Complete branded TruePrint employee joining kit" },
      { title: "Presentation comes first", context: "Custom packaging", src: "/trueprint-packaging.webp", alt: "Premium TruePrint packaging for an employee welcome kit" },
      { title: "Made for the team", context: "Branded apparel", src: "/trueprint-apparel.jpeg", alt: "Branded apparel included in a TruePrint joining kit" },
      { title: "Useful from day one", context: "Tech products", src: "/trueprint-tech-products.jpeg", alt: "Branded technology products for an employee joining kit" },
      { title: "Carry the brand forward", context: "Custom bags", src: "/trueprint-bags.jpeg", alt: "Custom branded bag for a TruePrint joining kit" },
      { title: "Details that connect", context: "Printed essentials", src: "/trueprint-detail.png", alt: "Close-up of coordinated TruePrint branded details" },
      { title: "Everyday essentials", context: "Drinkware", src: "/trueprint-drinkware.jpeg", alt: "Branded drinkware for a TruePrint employee joining kit" },
      { title: "One coordinated system", context: "Kit collection", src: "/trueprint-joining-kits.jpeg", alt: "Coordinated collection of TruePrint joining kit products" },
      { title: "Packed and ready", context: "Final presentation", src: "/trueprint-packaging.webp", alt: "Finished TruePrint joining kit packed for delivery" },
    ],
  },
};

const Arrow = ({ reverse = false }: { reverse?: boolean }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={reverse ? { transform: "rotate(180deg)" } : undefined}>
    <path d="M5 12h14" />
    <path d="m12 5 7 7-7 7" />
  </svg>
);

const pad = (value: number) => String(value).padStart(2, "0");

export default function CategoryGallery({ category }: { category: GalleryCategory }) {
  const profile = galleryProfiles[category];
  const [active, setActive] = useState(() => Math.floor(profile.items.length / 2));
  const [dragX, setDragX] = useState(0);
  const [dragging, setDragging] = useState(false);
  const [stepSize, setStepSize] = useState(230);
  const [visible, setVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const firstSlideRef = useRef<HTMLButtonElement>(null);
  const startXRef = useRef(0);
  const movedRef = useRef(false);

  const go = useCallback((index: number) => {
    setActive((index + profile.items.length) % profile.items.length);
  }, [profile.items.length]);

  useEffect(() => {
    const measure = () => {
      const width = firstSlideRef.current?.offsetWidth || 260;
      setStepSize(width * (window.innerWidth <= 640 ? 0.58 : 0.66));
    };

    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [category]);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || !("IntersectionObserver" in window)) {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver((entries) => {
      if (entries.some((entry) => entry.isIntersecting)) {
        setVisible(true);
        observer.disconnect();
      }
    }, { threshold: 0.2 });

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  const handlePointerDown = (event: ReactPointerEvent<HTMLDivElement>) => {
    setDragging(true);
    movedRef.current = false;
    startXRef.current = event.clientX;
    setDragX(0);
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const handlePointerMove = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (!dragging) return;
    const nextDrag = startXRef.current - event.clientX;
    if (Math.abs(nextDrag) > 4) movedRef.current = true;
    setDragX(nextDrag);
  };

  const endDrag = () => {
    if (!dragging) return;
    setDragging(false);
    const jumped = Math.round(dragX / stepSize);
    setDragX(0);
    if (jumped) go(active + jumped);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "ArrowLeft") {
      go(active - 1);
      event.preventDefault();
    }
    if (event.key === "ArrowRight") {
      go(active + 1);
      event.preventDefault();
    }
  };

  return (
    <section ref={sectionRef} className={`categoryGallery categoryGallery--${category}${visible ? " is-visible" : ""}`} aria-labelledby={`${category}-gallery-title`}>
      <span className="categoryGalleryGhost" aria-hidden="true">GALLERY</span>
      <div className="categoryGalleryInner">
        <header className="categoryGalleryHead">
          <p><span /> {profile.eyebrow}</p>
          <h2 id={`${category}-gallery-title`}>
            <span>{profile.titleLines[0]}</span><br />
            <span>{profile.titleLines[1]}</span>
          </h2>
          <p>{profile.lede}</p>
        </header>

        <div
          className={`categoryGalleryStage${dragging ? " is-dragging" : ""}`}
          aria-label={`${profile.title} image carousel`}
          aria-roledescription="carousel"
          onKeyDown={handleKeyDown}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={endDrag}
          onPointerCancel={endDrag}
          onPointerLeave={endDrag}
          onClickCapture={(event) => {
            if (!movedRef.current) return;
            event.preventDefault();
            event.stopPropagation();
            movedRef.current = false;
          }}
        >
          <div className="categoryGalleryTrack">
            {profile.items.map((item, index) => {
              const offset = index - active - dragX / stepSize;
              const distance = Math.abs(offset);
              const scale = Math.max(0.6, 1 - distance * 0.15);
              const rotate = Math.max(-16, Math.min(16, -offset * 8));
              const opacity = distance > 3.4 ? 0 : Math.max(0, 1 - distance * 0.2);
              const blur = distance <= 1 ? 0 : Math.min(2.5, (distance - 1) * 1.1);
              const isActive = Math.round(offset) === 0;
              const style = {
                transform: `translateX(${offset * stepSize}px) scale(${scale}) rotateY(${rotate}deg)`,
                opacity,
                filter: `saturate(${Math.max(0.55, 1 - distance * 0.18)}) blur(${blur}px)`,
                zIndex: 100 - Math.round(distance * 10),
                pointerEvents: distance > 3.4 ? "none" : "auto",
              } as CSSProperties;

              return (
                <button
                  ref={index === 0 ? firstSlideRef : undefined}
                  className={`categoryGallerySlide${isActive ? " is-active" : ""}`}
                  style={style}
                  type="button"
                  tabIndex={distance > 3.4 ? -1 : 0}
                  aria-label={`${item.title} — ${item.context}`}
                  aria-current={isActive ? "true" : undefined}
                  onClick={() => {
                    if (index === active) {
                      window.location.hash = `${category}-gallery-${index + 1}`;
                    } else {
                      go(index);
                    }
                  }}
                  key={`${category}-${item.title}`}
                >
                  <img src={item.src} alt={item.alt} loading="lazy" draggable="false" />
                </button>
              );
            })}
          </div>
        </div>

        <div className="categoryGalleryControls" aria-label={`${profile.title} controls`}>
          <button type="button" className="categoryGalleryNav categoryGalleryNavPrev" onClick={() => go(active - 1)} aria-label={`Previous ${profile.itemName}`}><Arrow reverse /></button>
          <span className="categoryGalleryCounter" aria-live="polite"><b>{pad(active + 1)}</b> / {pad(profile.items.length)}</span>
          <button type="button" className="categoryGalleryNav" onClick={() => go(active + 1)} aria-label={`Next ${profile.itemName}`}><Arrow /></button>
        </div>
      </div>
    </section>
  );
}
