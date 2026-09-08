"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import ProjectFaq from "./project-faq";

const stories = [
  {
    short: "Gifting system",
    colour: "#8f1026",
    ink: "#ffffff",
    quote: "TruePrint took a loose gifting brief and turned it into one clear diary system. Every material choice felt connected, useful and unmistakably ours.",
    role: "Brand operations lead · Consumer goods",
    image: "/trueprint-packaging.webp",
    alt: "Premium TruePrint packaging produced as a connected gifting system",
    route: "Corporate gifting",
    finish: "Foil · deboss · presentation",
  },
  {
    short: "Diary programme",
    colour: "#0b0b0a",
    ink: "#ffffff",
    quote: "The process stayed calm from the first page plan to final delivery. The diaries feel considered, practical and far more personal than an off-the-shelf product.",
    role: "People experience manager · Professional services",
    image: "/diary-hero.webp",
    alt: "Custom TruePrint diary produced for a branded programme",
    route: "Diary programme",
    finish: "Custom pages · matched details",
  },
  {
    short: "Editorial launch",
    colour: "#d9d8d3",
    ink: "#11110f",
    quote: "They helped us resolve the paper, colour and binding without losing the original creative idea. The finished edition has exactly the weight we wanted.",
    role: "Creative studio partner · Editorial",
    image: "/trueprint-editorial.webp",
    alt: "Editorial print project produced with considered paper and binding",
    route: "Editorial print",
    finish: "Uncoated stock · section sewn",
  },
  {
    short: "Event edition",
    colour: "#07152f",
    ink: "#ffffff",
    quote: "A short timeline never felt rushed. TruePrint organised the artwork, proofing and production into simple decisions and delivered a piece people wanted to keep.",
    role: "Programme manager · Events",
    image: "/trueprint-detail.png",
    alt: "Detailed TruePrint event edition with premium finishing",
    route: "Event edition",
    finish: "Short run · tactile finish",
  },
  {
    short: "Welcome kit",
    colour: "#215a52",
    ink: "#ffffff",
    quote: "Every item arrived feeling like part of one welcome. TruePrint kept the colours, materials and presentation consistent from the first sample to the packed kits.",
    role: "People and culture lead · Technology",
    image: "/trueprint-joining-kits.jpeg",
    alt: "Coordinated TruePrint welcome kit with branded products",
    route: "Joining kits",
    finish: "Mixed products · matched branding",
  },
  {
    short: "Brand merchandise",
    colour: "#72513c",
    ink: "#ffffff",
    quote: "The merchandise felt considered instead of promotional. TruePrint helped us choose useful products, refine every placement and deliver a collection people genuinely wanted to use.",
    role: "Marketing lead · Business services",
    image: "/trueprint-bags.jpeg",
    alt: "Branded TruePrint merchandise prepared as a coordinated collection",
    route: "Brand merchandise",
    finish: "Curated range · consistent identity",
  },
] as const;

// Temporary assets for design review, not client endorsements.
const brands = [
  { name: "Google", image: "/placeholder-google.png", colour: "#e5edff" },
  { name: "Microsoft", image: "/placeholder-microsoft.png", colour: "#e9e5fa" },
  { name: "Adobe", image: "/placeholder-adobe.svg", colour: "#f5ddd8" },
  { name: "Spotify", image: "/placeholder-spotify.svg", colour: "#dceee2" },
  { name: "Slack", image: "/placeholder-slack.svg", colour: "#faedcb" },
  { name: "IBM", image: "/placeholder-ibm.svg", colour: "#dcedf2" },
];

export default function ClientStories({ showFaq = true }: { showFaq?: boolean }) {
  const [activeStory, setActiveStory] = useState(0);
  const [manualSelection, setManualSelection] = useState(false);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const active = stories[activeStory];

  useEffect(() => {
    if (manualSelection) return;
    timer.current = setInterval(() => {
      setActiveStory((index) => (index + 1) % brands.length);
    }, 4000);
    return () => {
      if (timer.current) clearInterval(timer.current);
      timer.current = null;
    };
  }, [manualSelection]);

  const selectBrand = (index: number) => {
    if (timer.current) clearInterval(timer.current);
    timer.current = null;
    setManualSelection(true);
    setActiveStory(index);
  };

  return (
    <>
      <section className="clientStories" aria-labelledby="client-stories-title">
        <span className="clientStoriesGhost" aria-hidden="true">VOICES</span>
        <header className="clientStoriesHeader">
          <div>
            <p><span /> Client notes</p>
            <h2 id="client-stories-title">Made together.<br /><em>Remembered by clients.</em></h2>
          </div>
          <p>Temporary logos for design preview. These brands are not presented as TruePrint clients.</p>
        </header>
        <div className="clientStoriesDeck clientLogoDeck" style={{ "--story-colour": active.colour } as CSSProperties}>
          <div className="clientStoryTabs" role="tablist" aria-label="Brand logo preview">
            {brands.map((brand, index) => (
              <button
                ref={(node) => { tabs.current[index] = node; }}
                className={`clientStoryTab${activeStory === index ? " isActive" : ""}`}
                style={{ "--tab-colour": brand.colour } as CSSProperties}
                type="button"
                role="tab"
                id={`client-story-tab-${index}`}
                aria-label={brand.name}
                aria-selected={activeStory === index}
                aria-controls="client-story-panel"
                tabIndex={activeStory === index ? 0 : -1}
                onClick={() => selectBrand(index)}
                onKeyDown={(event) => {
                  let next = index;
                  if (event.key === "ArrowRight") next = (index + 1) % brands.length;
                  else if (event.key === "ArrowLeft") next = (index + brands.length - 1) % brands.length;
                  else if (event.key === "Home") next = 0;
                  else if (event.key === "End") next = brands.length - 1;
                  else return;
                  event.preventDefault();
                  selectBrand(next);
                  tabs.current[next]?.focus();
                }}
                key={brand.name}
              >
                <img src={brand.image} alt="" draggable={false} />
              </button>
            ))}
          </div>
        <article
          className="clientStoryPanel"
          id="client-story-panel"
          role="tabpanel"
          aria-labelledby={`client-story-tab-${activeStory}`}
          key={activeStory}
        >
          <div className="clientStoryCopy">
            <small>Client note</small>
            <blockquote>“{active.quote}”</blockquote>
            <p>{active.role}</p>
            <a href="#">Start a similar project <span>↗</span></a>
          </div>

          <figure>
            <img src={active.image} alt={active.alt} loading="lazy" decoding="async" />
            <span className="clientStoryImageShade" aria-hidden="true" />
            <figcaption>
              <div className="clientStoryMetric">
                <small>Production route</small>
                <strong>{active.route}</strong>
              </div>
              <div className="clientStoryMetric">
                <small>Material direction</small>
                <strong>{active.finish}</strong>
              </div>
            </figcaption>
          </figure>
        </article>
        </div>
      </section>
      {showFaq && <ProjectFaq />}
    </>
  );
}
