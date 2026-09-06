"use client";

import {
  useCallback,
  useRef,
  useState,
  type CSSProperties,
  type PointerEvent as ReactPointerEvent,
} from "react";

const ArrowIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path d="M5 12h13m-5-5 5 5-5 5" />
  </svg>
);

const possibilities = [
  {
    eyebrow: "Category 01",
    title: "Visiting Cards",
    copy: "Premium stocks, precise printing and considered finishes for a confident first introduction.",
    image: "/trueprint-detail.png",
    action: "Explore visiting cards",
    href: "/categories/visiting-cards",
  },
  {
    eyebrow: "Category 02",
    title: "Diaries",
    copy: "Thoughtful covers, useful formats and custom details made for work, gifting and everyday ideas.",
    image: "/trueprint-diaries.jpeg",
    action: "Explore diaries",
    href: "/categories/diaries",
  },
  {
    eyebrow: "Category 03",
    title: "Pens",
    copy: "Reliable writing instruments personalized with your brand for teams, events and corporate gifting.",
    image: "/trueprint-joining-kits.jpeg",
    action: "Explore pens",
    href: "/categories/pens",
  },
  {
    eyebrow: "Category 04",
    title: "Joining Kits",
    copy: "Useful products, considered packaging and consistent branding assembled into one memorable welcome.",
    image: "/trueprint-joining-kits.jpeg",
    action: "Explore joining kits",
    href: "/categories/joining-kits",
  },
  {
    eyebrow: "Category 05",
    title: "Tech Products",
    copy: "Practical technology selected for everyday use and customized to keep your brand close at hand.",
    image: "/trueprint-tech-products.jpeg",
    action: "Explore tech products",
    href: "/categories/tech-products",
  },
  {
    eyebrow: "Category 06",
    title: "Bags",
    copy: "Work, travel and everyday carry options chosen for utility, durability and clear brand presence.",
    image: "/trueprint-bags.jpeg",
    action: "Explore bags",
    href: "/categories/bags",
  },
  {
    eyebrow: "Category 07",
    title: "Drinkware",
    copy: "Bottles, tumblers and mugs designed for repeated use and finished with lasting customization.",
    image: "/trueprint-drinkware.jpeg",
    action: "Explore drinkware",
    href: "/categories/drinkware",
  },
  {
    eyebrow: "Category 08",
    title: "T-Shirts",
    copy: "Comfortable branded apparel for teams, events, campaigns and coordinated merchandise programs.",
    image: "/trueprint-apparel.jpeg",
    action: "Explore T-shirts",
    href: "/categories/t-shirts",
  },
] as const;

const wrapDifference = (index: number, activeIndex: number) => {
  let difference = index - activeIndex;
  const half = Math.floor(possibilities.length / 2);
  if (difference < -half) difference += possibilities.length;
  if (difference > half) difference -= possibilities.length;
  return difference;
};

export default function PrintExperiments() {
  const [activeIndex, setActiveIndex] = useState(2);
  const [dragOffset, setDragOffset] = useState(0);
  const dragRef = useRef({ pointerId: -1, startX: 0, currentX: 0, frame: 0 });
  const suppressClickRef = useRef(false);

  const move = useCallback((direction: -1 | 1) => {
    setActiveIndex((current) => (current + direction + possibilities.length) % possibilities.length);
  }, []);

  const finishDrag = useCallback((pointerId?: number) => {
    const drag = dragRef.current;
    if (pointerId !== undefined && drag.pointerId !== pointerId) return;

    const distance = drag.currentX - drag.startX;
    suppressClickRef.current = Math.abs(distance) > 8;
    if (drag.frame) cancelAnimationFrame(drag.frame);
    drag.pointerId = -1;
    drag.startX = 0;
    drag.currentX = 0;
    drag.frame = 0;
    setDragOffset(0);

    if (distance > 54) move(-1);
    if (distance < -54) move(1);
  }, [move]);

  const handlePointerDown = (event: ReactPointerEvent<HTMLDivElement>) => {
    suppressClickRef.current = false;
    dragRef.current.pointerId = event.pointerId;
    dragRef.current.startX = event.clientX;
    dragRef.current.currentX = event.clientX;
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const handlePointerMove = (event: ReactPointerEvent<HTMLDivElement>) => {
    const drag = dragRef.current;
    if (drag.pointerId !== event.pointerId) return;
    drag.currentX = event.clientX;

    if (!drag.frame) {
      drag.frame = requestAnimationFrame(() => {
        const offset = Math.max(-130, Math.min(130, drag.currentX - drag.startX));
        setDragOffset(offset);
        drag.frame = 0;
      });
    }
  };

  const handleCardClick = (index: number) => {
    if (suppressClickRef.current) {
      suppressClickRef.current = false;
      return;
    }
    if (index !== activeIndex) {
      setActiveIndex(index);
      return;
    }
    window.location.assign(possibilities[index].href);
  };

  return (
    <section className="labSection" aria-labelledby="lab-title">
      <span className="labGhost" aria-hidden="true">POSSIBILITIES</span>

      <header className="labHeader">
        <p><span>05</span> Print possibilities</p>
        <h2 id="lab-title">Start with the idea.<br /><em>We&apos;ll shape the rest.</em></h2>
        <div className="labHeaderNote">
          <span aria-hidden="true" />
          Browse, shortlist and explore what fits your brand.
        </div>
      </header>

      <div className="labCarousel">
        <div
          className="labStage"
          onPointerCancel={(event) => finishDrag(event.pointerId)}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={(event) => finishDrag(event.pointerId)}
          role="group"
          aria-roledescription="carousel"
          aria-label="TruePrint product categories"
        >
          {possibilities.map((possibility, index) => {
            const difference = wrapDifference(index, activeIndex);
            const absoluteDifference = Math.abs(difference);
            const isActive = difference === 0;
            const style = {
              "--lab-x": `${difference * 260 + dragOffset * 0.42}px`,
              "--lab-y": `${Math.pow(absoluteDifference, 1.7) * 20}px`,
              "--lab-z": `${absoluteDifference * -115}px`,
              "--lab-rotate": `${difference * -9 + dragOffset * -0.025}deg`,
              "--lab-scale": Math.max(0.72, 1 - absoluteDifference * 0.1),
              "--lab-opacity": Math.max(0.2, 1 - absoluteDifference * 0.25),
              "--lab-order": 20 - absoluteDifference,
            } as CSSProperties;

            return (
              <button
                aria-label={isActive ? `Open ${possibility.title} category.` : `Show ${possibility.title}`}
                className="labCard"
                data-active={isActive}
                key={possibility.title}
                onClick={() => handleCardClick(index)}
                style={style}
                tabIndex={isActive ? 0 : -1}
                type="button"
              >
                <span className="labImage">
                  <img src={possibility.image} alt="" loading="lazy" decoding="async" draggable="false" />
                  <span aria-hidden="true" />
                </span>
                <span className="labCardBody">
                  <small>{possibility.eyebrow}</small>
                  <strong>{possibility.title}</strong>
                  <span>{possibility.copy}</span>
                </span>
                <span className="labCardAction">
                  {possibility.action} <ArrowIcon />
                </span>
              </button>
            );
          })}
        </div>

        <div className="labControls" aria-label="Browse product categories">
          <button type="button" onClick={() => move(-1)} aria-label="Previous category">
            <ArrowIcon />
          </button>
          <div className="labDots" role="group" aria-label="Choose a product category">
            {possibilities.map((possibility, index) => (
              <button
                aria-label={`Show ${possibility.title}`}
                aria-pressed={activeIndex === index}
                className={activeIndex === index ? "isActive" : undefined}
                key={possibility.title}
                onClick={() => setActiveIndex(index)}
                type="button"
              />
            ))}
          </div>
          <button type="button" onClick={() => move(1)} aria-label="Next category">
            <ArrowIcon />
          </button>
        </div>

        <p className="srOnly" aria-live="polite">
          Showing {possibilities[activeIndex].title}, {activeIndex + 1} of {possibilities.length}.
        </p>
      </div>
    </section>
  );
}
