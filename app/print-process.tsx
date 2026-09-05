"use client";

import { useCallback, useRef, useState, type KeyboardEvent } from "react";
import { ArrowFillLink } from "./arrow-fill-button";

const ArrowIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path d="M5 12h13m-5-5 5 5-5 5" />
  </svg>
);

const CheckIcon = () => (
  <svg viewBox="0 0 20 20" aria-hidden="true">
    <circle cx="10" cy="10" r="9" />
    <path d="m6.4 10.2 2.2 2.2 5-5" />
  </svg>
);

const stages = [
  {
    id: "discover",
    label: "Discover",
    step: "01",
    short: "Brief & intent",
    kicker: "Listen before we make",
    title: "Understand what the piece needs to achieve.",
    description: "We begin with the audience, purpose, quantity, timing and the moment the print needs to create.",
    bullets: [
      "Clarify the business need before choosing a product.",
      "Collect references, samples and practical requirements.",
      "Define quantity, timing and the intended experience.",
    ],
    image: "/trueprint-detail.png",
    alt: "Close-up review of premium printed cards and tactile paper samples",
  },
  {
    id: "plan",
    label: "Plan",
    step: "02",
    short: "Format & route",
    kicker: "Make the route clear",
    title: "Build the right production plan around the idea.",
    description: "Format, stock, quantities and finishing are mapped together so every decision supports the brief and budget.",
    bullets: [
      "Match the format and material to how it will be used.",
      "Balance impact, quantity, timing and production value.",
      "Create one clear route from artwork to delivery.",
    ],
    image: "/trueprint-hero.png",
    alt: "Premium paper stocks arranged for planning a print project",
  },
  {
    id: "design",
    label: "Design",
    step: "03",
    short: "Artwork & detail",
    kicker: "Design for the physical world",
    title: "Prepare every detail for paper, ink and finish.",
    description: "We translate the visual system into production-ready artwork, checking scale, colour, folds and finishing tolerances.",
    bullets: [
      "Refine layouts for the chosen size and construction.",
      "Prepare colour, bleed, folds and finishing layers.",
      "Protect the character of the design through production.",
    ],
    image: "/trueprint-editorial.webp",
    alt: "Editorial layouts and printed pages prepared for production",
  },
  {
    id: "proof",
    label: "Proof",
    step: "04",
    short: "Check & approve",
    kicker: "Confidence before the run",
    title: "See colour, scale and finish before we commit.",
    description: "A focused proofing stage catches the small things early and makes approval clear before full production begins.",
    bullets: [
      "Check content, trim, scale and colour expectations.",
      "Review stock and finish samples where they matter.",
      "Approve one controlled version for production.",
    ],
    image: "/trueprint-detail.png",
    alt: "Detailed print proof showing premium colour and finishing quality",
  },
  {
    id: "print",
    label: "Print",
    step: "05",
    short: "Colour & craft",
    kicker: "Precision on press",
    title: "Hold colour and detail from first sheet to last.",
    description: "The chosen process is controlled for consistency, registration and the quiet details that make print feel resolved.",
    bullets: [
      "Select the production method that suits the result.",
      "Control colour, registration and consistency on press.",
      "Keep the approved character across the complete run.",
    ],
    image: "/trueprint-hero.png",
    alt: "Tactile stationery and premium printed pieces after production",
  },
  {
    id: "finish",
    label: "Finish",
    step: "06",
    short: "Texture & form",
    kicker: "Make the detail tangible",
    title: "Add the touches people notice when they hold it.",
    description: "Foil, impression, folds, binding and edge details are applied with restraint so every finish has a reason to be there.",
    bullets: [
      "Apply foil, letterpress, embossing or edge colour.",
      "Cut, fold, bind and assemble with controlled tolerances.",
      "Inspect the final object for feel as well as appearance.",
    ],
    image: "/trueprint-packaging.webp",
    alt: "Premium packaging with tactile finishing and precise construction",
  },
  {
    id: "deliver",
    label: "Deliver",
    step: "07",
    short: "Pack & arrive",
    kicker: "Ready for the real moment",
    title: "Deliver every piece organised and ready to use.",
    description: "Finished work is checked, packed and organised around where it needs to go and how it needs to arrive.",
    bullets: [
      "Complete final quality checks before packing.",
      "Organise sets, quantities and destinations clearly.",
      "Protect every piece through handling and delivery.",
    ],
    image: "/trueprint-packaging.webp",
    alt: "Finished branded packaging arranged and ready for delivery",
  },
] as const;

export default function PrintProcess() {
  const [activeIndex, setActiveIndex] = useState(0);
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const stage = stages[activeIndex];

  const selectStage = useCallback((index: number, focus = false) => {
    const nextIndex = (index + stages.length) % stages.length;
    setActiveIndex(nextIndex);
    if (focus) tabRefs.current[nextIndex]?.focus();
  }, []);

  const handleKeyDown = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    if (event.key === "ArrowRight") {
      event.preventDefault();
      selectStage(index + 1, true);
    } else if (event.key === "ArrowLeft") {
      event.preventDefault();
      selectStage(index - 1, true);
    } else if (event.key === "Home") {
      event.preventDefault();
      selectStage(0, true);
    } else if (event.key === "End") {
      event.preventDefault();
      selectStage(stages.length - 1, true);
    }
  };

  return (
    <section className="processSection" aria-labelledby="process-title">
      <span className="processGhost" aria-hidden="true">PROCESS</span>

      <header className="processHeader">
        <p className="processKicker"><span>07</span> How it becomes tangible</p>
        <h2 id="process-title">From first thought.<br /><em>To finished piece.</em></h2>
        <p>
          One considered path from the question you bring us to the object you
          finally place in someone&apos;s hands.
        </p>
      </header>

      <div className="processNavShell">
        <div className="processTabs" role="tablist" aria-label="TruePrint process stages">
          {stages.map((item, index) => (
            <button
              aria-controls="process-panel"
              aria-selected={activeIndex === index}
              className={activeIndex === index ? "isActive" : undefined}
              id={`process-tab-${item.id}`}
              key={item.id}
              onClick={() => selectStage(index)}
              onKeyDown={(event) => handleKeyDown(event, index)}
              ref={(element) => { tabRefs.current[index] = element; }}
              role="tab"
              tabIndex={activeIndex === index ? 0 : -1}
              type="button"
            >
              <small>{item.step}</small>
              <span>{item.label}</span>
            </button>
          ))}
        </div>
        <button
          className="processNext"
          type="button"
          aria-label="Show next process stage"
          onClick={() => selectStage(activeIndex + 1)}
        >
          <ArrowIcon />
        </button>
      </div>

      <div
        aria-labelledby={`process-tab-${stage.id}`}
        className="processPanel"
        id="process-panel"
        role="tabpanel"
      >
        <div className="processPanelContent" key={stage.id}>
          <figure className="processVisual">
            <img src={stage.image} alt={stage.alt} loading="lazy" decoding="async" />
            <span className="processVisualShade" aria-hidden="true" />
            <figcaption>
              <span>{stage.step} / 07</span>
              <strong>{stage.label}</strong>
              <small>{stage.short}</small>
            </figcaption>
          </figure>

          <article className="processCopy">
            <p>{stage.kicker}</p>
            <h3>{stage.title}</h3>
            <div className="processRule" aria-hidden="true"><span /></div>
            <p className="processDescription">{stage.description}</p>
            <ul>
              {stage.bullets.map((bullet) => (
                <li key={bullet}><CheckIcon /><span>{bullet}</span></li>
              ))}
            </ul>
            <ArrowFillLink href="#contact" label="Start a project" />
          </article>
        </div>
      </div>
    </section>
  );
}
