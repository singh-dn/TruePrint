"use client";

import { useState, type CSSProperties } from "react";

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

function ClientLogo() {
  return (
    <span className="clientStoryLogo clientStoryClientLogo" aria-label="Temporary client logo">
      <img src="/favicon.svg" alt="" />
    </span>
  );
}

function StoryLogo({ index, secondary = false }: { index: number; secondary?: boolean }) {
  const logoClass = `clientStoryLogo${secondary ? " clientStoryLogoSecondary" : ""}`;

  if (index === 0) {
    return (
      <span className={logoClass} aria-hidden="true">
        <svg viewBox="0 0 32 32" fill="none">
          {secondary ? (
            <><path d="M16 5v22M5 16h22" /><path d="m8.5 8.5 15 15m0-15-15 15" /></>
          ) : (
            <><path d="M6 13h20v14H6zM4.5 9h23v5h-23zM16 9v18" /><path d="M16 9c-4.7 0-7-1.4-7-3.4 0-1.5 1.2-2.6 2.8-2.6C14.5 3 16 6.2 16 9Zm0 0c4.7 0 7-1.4 7-3.4 0-1.5-1.2-2.6-2.8-2.6C17.5 3 16 6.2 16 9Z" /></>
          )}
        </svg>
      </span>
    );
  }

  if (index === 1) {
    return (
      <span className={logoClass} aria-hidden="true">
        <svg viewBox="0 0 32 32" fill="none">
          {secondary ? (
            <><path d="m9 23 3.5-1 11-11a2.1 2.1 0 0 0-3-3l-11 11L9 23Z" /><path d="m18.5 10 3 3M8 26h16" /></>
          ) : (
            <><rect x="7" y="4" width="19" height="24" rx="3" /><path d="M11 4v24M15 10h7M15 15h7M15 20h5" /></>
          )}
        </svg>
      </span>
    );
  }

  if (index === 2) {
    return (
      <span className={logoClass} aria-hidden="true">
        <svg viewBox="0 0 32 32" fill="none">
          {secondary ? (
            <><rect x="6" y="6" width="8" height="8" rx="1" /><rect x="18" y="6" width="8" height="8" rx="1" /><rect x="6" y="18" width="8" height="8" rx="1" /><rect x="18" y="18" width="8" height="8" rx="1" /></>
          ) : (
            <><path d="m5 11 11-6 11 6-11 6-11-6Z" /><path d="m7 16 9 5 9-5M7 21l9 5 9-5" /></>
          )}
        </svg>
      </span>
    );
  }

  return (
    <span className={logoClass} aria-hidden="true">
      <svg viewBox="0 0 32 32" fill="none">
        {secondary ? (
          <path d="m16 4 3.1 7.6 8.1.6-6.2 5.2 1.9 7.9-6.9-4.2-6.9 4.2 1.9-7.9-6.2-5.2 8.1-.6L16 4Z" />
        ) : (
          <><path d="M5 9a3 3 0 0 0 3-3h16a3 3 0 0 0 3 3v4a3 3 0 0 0 0 6v4a3 3 0 0 0-3 3H8a3 3 0 0 0-3-3v-4a3 3 0 0 0 0-6V9Z" /><path d="M16 8v16" /></>
        )}
      </svg>
    </span>
  );
}

export default function ClientStories() {
  const [activeStory, setActiveStory] = useState(1);
  const active = stories[activeStory];
  const activeStyle = {
    "--story-colour": active.colour,
    "--story-ink": active.ink,
  } as CSSProperties;

  return (
    <section className="clientStories" aria-labelledby="client-stories-title">
      <span className="clientStoriesGhost" aria-hidden="true">VOICES</span>
      <header className="clientStoriesHeader">
        <div>
          <p><span /> Client notes</p>
          <h2 id="client-stories-title">Made together.<br /><em>Remembered after.</em></h2>
        </div>
        <p>Six perspectives on how an unfinished brief becomes a finished object worth keeping.</p>
      </header>

      <div className="clientStoriesDeck" style={activeStyle}>
        <div className="clientStoryTabs" role="tablist" aria-label="Client stories">
          {stories.map((story, index) => {
            const isActive = activeStory === index;
            const tabStyle = {
              "--tab-colour": story.colour,
              "--tab-ink": story.ink,
            } as CSSProperties;

            return (
              <button
                className={`clientStoryTab${isActive ? " isActive" : ""}`}
                style={tabStyle}
                type="button"
                role="tab"
                id={`client-story-tab-${index}`}
                aria-label={story.short}
                aria-selected={isActive}
                aria-controls="client-story-panel"
                onClick={() => setActiveStory(index)}
                key={story.short}
              >
                <span>0{index + 1}</span>
                {isActive ? <ClientLogo /> : <strong>{story.short}</strong>}
                {isActive ? <StoryLogo index={index} secondary /> : <small>{story.route}</small>}
              </button>
            );
          })}
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
            <a href="/#contact">Start a similar project <span>↗</span></a>
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
  );
}
