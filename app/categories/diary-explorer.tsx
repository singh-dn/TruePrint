"use client";

import { useEffect, useRef, useState, type KeyboardEvent as ReactKeyboardEvent } from "react";

const diaryCards = [
  {
    id: "executive-hardcovers",
    title: "Executive hardcover",
    category: "Structured daily use",
    palette: "Obsidian cloth",
    tone: "obsidian",
    image: "/diary-hero.webp",
    alt: "Premium black executive hardcover diary",
    detail: "A substantial cloth-bound diary with blind debossing, a ribbon marker and a considered professional finish.",
    format: "A5 · B5 · custom",
    finish: "Blind deboss · foil",
  },
  {
    title: "Soft-touch edition",
    category: "Flexible everyday notes",
    palette: "Warm stone",
    tone: "warm",
    image: "/diary-softcover.webp",
    alt: "Stack of tactile soft-touch notebooks",
    detail: "A lighter notebook route with a tactile cover, flexible binding and clean branding for events, teams and ideas.",
    format: "A5 · custom",
    finish: "Tonal print · stitch",
  },
  {
    id: "lay-flat-planners",
    title: "Lay-flat planner",
    category: "Planning with clarity",
    palette: "Moonstone silver",
    tone: "moonstone",
    image: "/diary-planner.webp",
    alt: "Open lay-flat diary planner with pen",
    detail: "A practical planner that stays open while the day takes shape, with dated or undated page structures.",
    format: "A5 · B5",
    finish: "Elastic · ribbon",
  },
  {
    id: "thread-sewn-notebooks",
    title: "Thread-sewn notebook",
    category: "Visible craft detail",
    palette: "Parchment",
    tone: "parchment",
    image: "/diary-softcover.webp",
    alt: "Thread-sewn notebook collection",
    detail: "A compact, expressive notebook with visible thread detail and ruled, dotted or plain inside pages.",
    format: "A5 · compact",
    finish: "Colour thread · print",
  },
  {
    title: "Presentation diary",
    category: "Premium corporate gifting",
    palette: "Midnight blue",
    tone: "midnight",
    image: "/diary-hero.webp",
    alt: "Premium presentation diary with ribbon marker",
    detail: "A gift-ready hardcover diary designed around presentation, branded finishing and a refined opening experience.",
    format: "A5 · B5 · custom",
    finish: "Foil · hard case",
  },
  {
    title: "Undated planner",
    category: "Flexible start",
    palette: "Steel blue",
    tone: "steel",
    image: "/diary-planner.webp",
    alt: "Undated diary planner open to a clean spread",
    detail: "A flexible planning system with clean priority pages that can begin whenever its owner is ready.",
    format: "A5 · B5",
    finish: "Elastic · soft touch",
  },
  {
    title: "Project notes",
    category: "Focused working pages",
    palette: "Deep ink",
    tone: "ink",
    image: "/diary-softcover.webp",
    alt: "Compact project notebooks in neutral finishes",
    detail: "A project-led notebook with custom sections for milestones, working notes and important decisions.",
    format: "A5 · custom",
    finish: "Print · thread sew",
  },
] as const;

const slideNames = [
  "Executive editions",
  "Lay-flat planners",
  "Thread-sewn notes",
  "Presentation diaries",
  "Flexible formats",
] as const;

const diaryToneClasses = {
  obsidian: "diaryCapsuleToneObsidian",
  warm: "diaryCapsuleToneWarm",
  moonstone: "diaryCapsuleToneMoonstone",
  parchment: "diaryCapsuleToneParchment",
  midnight: "diaryCapsuleToneMidnight",
  steel: "diaryCapsuleToneSteel",
  ink: "diaryCapsuleToneInk",
} as const;

function ArrowIcon({ direction = "right" }: { direction?: "left" | "right" }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      {direction === "left"
        ? <path d="m14.5 6-6 6 6 6" />
        : <path d="m9.5 6 6 6-6 6" />}
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M6 6l12 12M18 6 6 18" />
    </svg>
  );
}

export default function DiaryExplorer() {
  const galleryRef = useRef<HTMLDivElement>(null);
  const [activeSlide, setActiveSlide] = useState(0);
  const [selectedCard, setSelectedCard] = useState<number | null>(null);
  const [storyOpen, setStoryOpen] = useState(false);

  useEffect(() => {
    if (selectedCard === null && !storyOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const close = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setSelectedCard(null);
        setStoryOpen(false);
      }
    };

    window.addEventListener("keydown", close);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", close);
    };
  }, [selectedCard, storyOpen]);

  const scrollToSlide = (index: number) => {
    const track = galleryRef.current;
    if (!track) return;

    const groups = track.querySelectorAll<HTMLElement>("[data-diary-group]");
    const nextIndex = Math.max(0, Math.min(index, groups.length - 1));
    const behavior = window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth";
    groups[nextIndex]?.scrollIntoView({ behavior, block: "nearest", inline: "center" });
    setActiveSlide(nextIndex);
  };

  const syncActiveSlide = () => {
    const track = galleryRef.current;
    if (!track || window.innerWidth >= 1024) return;

    const groups = Array.from(track.querySelectorAll<HTMLElement>("[data-diary-group]"));
    const centre = track.scrollLeft + track.clientWidth / 2;
    const closest = groups.reduce(
      (best, group, index) => {
        const distance = Math.abs(group.offsetLeft + group.offsetWidth / 2 - centre);
        return distance < best.distance ? { index, distance } : best;
      },
      { index: 0, distance: Number.POSITIVE_INFINITY },
    );

    setActiveSlide(closest.index);
  };

  const handleGalleryKey = (event: ReactKeyboardEvent<HTMLDivElement>) => {
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      scrollToSlide(activeSlide - 1);
    }
    if (event.key === "ArrowRight") {
      event.preventDefault();
      scrollToSlide(activeSlide + 1);
    }
  };

  const card = selectedCard === null ? null : diaryCards[selectedCard];

  return (
    <section className="diaryCapsule" id="diary-collection" aria-labelledby="diary-capsule-title">
      <svg className="diaryCapsuleClips" aria-hidden="true">
        <defs>
          <clipPath id="diary-folder-left" clipPathUnits="objectBoundingBox">
            <path d="M0,.065C0,.025,.045,0,.1,0H.44C.5,0,.53,.022,.56,.042C.59,.06,.62,.065,.68,.065H.9C.955,.065,1,.09,1,.13V.94C1,.975,.955,1,.9,1H.1C.045,1,0,.975,0,.94Z" />
          </clipPath>
          <clipPath id="diary-folder-right" clipPathUnits="objectBoundingBox">
            <path d="M0,.13C0,.09,.045,.065,.1,.065H.32C.38,.065,.41,.06,.44,.042C.47,.022,.5,0,.56,0H.9C.955,0,1,.025,1,.065V.94C1,.975,.955,1,.9,1H.1C.045,1,0,.975,0,.94Z" />
          </clipPath>
        </defs>
      </svg>

      <header className="diaryCapsuleHeader">
        <button
          className="diaryCapsuleStoryMark"
          type="button"
          onClick={() => setStoryOpen(true)}
          aria-label="Open the TruePrint diary story"
        >
          <svg viewBox="0 0 100 100" aria-hidden="true">
            <defs>
              <path id="diary-capsule-ring" d="M50 50m-36 0a36 36 0 1 1 72 0a36 36 0 1 1-72 0" />
            </defs>
            <text>
              <textPath href="#diary-capsule-ring">LEARN ABOUT OUR DIARIES · MADE TO BE YOURS · </textPath>
            </text>
          </svg>
          <i aria-hidden="true" />
        </button>

        <div className="diaryCapsuleHeading">
          <p>Browse by construction</p>
          <h2 id="diary-capsule-title">Explore the<br />collection.</h2>
        </div>

        <div className="diaryCapsulePalette" aria-label="Featured TruePrint materials">
          <span className="diaryCapsulePaletteObsidian" title="Obsidian cloth" />
          <span className="diaryCapsulePaletteMoonstone" title="Moonstone silver" />
          <span className="diaryCapsulePaletteMidnight" title="Midnight blue" />
          <i aria-hidden="true">+</i>
        </div>
      </header>

      <div className="diaryCapsuleMobileNav">
        <p><span /> {activeSlide + 1} / {slideNames.length} · {slideNames[activeSlide]}</p>
        <div>
          <button
            type="button"
            onClick={() => scrollToSlide(activeSlide - 1)}
            disabled={activeSlide === 0}
            aria-label="Previous diary group"
          >
            <ArrowIcon direction="left" />
          </button>
          <span className="diaryCapsuleMobileDots" aria-label="Choose a diary group">
            {slideNames.map((name, index) => (
              <button
                className={activeSlide === index ? "active" : ""}
                type="button"
                onClick={() => scrollToSlide(index)}
                aria-label={`Show ${name}`}
                aria-current={activeSlide === index ? "true" : undefined}
                key={name}
              />
            ))}
          </span>
          <button
            type="button"
            onClick={() => scrollToSlide(activeSlide + 1)}
            disabled={activeSlide === slideNames.length - 1}
            aria-label="Next diary group"
          >
            <ArrowIcon />
          </button>
        </div>
      </div>

      <div className="diaryCapsuleGallery">
        <button
          className="diaryCapsuleSideControl diaryCapsuleSideControlPrevious"
          type="button"
          onClick={() => scrollToSlide(activeSlide - 1)}
          disabled={activeSlide === 0}
          aria-label="Previous diary group"
        >
          <ArrowIcon direction="left" />
        </button>

        <button
          className="diaryCapsuleSideControl diaryCapsuleSideControlNext"
          type="button"
          onClick={() => scrollToSlide(activeSlide + 1)}
          disabled={activeSlide === slideNames.length - 1}
          aria-label="Next diary group"
        >
          <ArrowIcon />
        </button>

        <div
          className="diaryCapsuleTrack"
          ref={galleryRef}
          onScroll={syncActiveSlide}
          onKeyDown={handleGalleryKey}
          tabIndex={0}
          aria-label="TruePrint diary collection. Use arrow keys or swipe to browse."
        >
          <div className="diaryCapsuleGroup diaryCapsuleGroupSplit" data-diary-group>
            <button
              className="diaryCapsuleCard diaryCapsuleCardTall diaryCapsuleFolderLeft diaryCapsuleToneObsidian"
              id="executive-hardcovers"
              type="button"
              onClick={() => setSelectedCard(0)}
            >
              <img src={diaryCards[0].image} alt={diaryCards[0].alt} loading="lazy" decoding="async" />
              <span><small>{diaryCards[0].category}</small><strong>{diaryCards[0].title}</strong></span>
            </button>
            <button
              className="diaryCapsuleCard diaryCapsuleCardShort diaryCapsuleRoundedSmall diaryCapsuleToneWarm"
              type="button"
              onClick={() => setSelectedCard(1)}
            >
              <img src={diaryCards[1].image} alt={diaryCards[1].alt} loading="lazy" decoding="async" />
              <span><small>{diaryCards[1].category}</small><strong>{diaryCards[1].title}</strong></span>
            </button>
          </div>

          <div className="diaryCapsuleGroup" data-diary-group>
            <button
              className="diaryCapsuleCard diaryCapsuleCardFull diaryCapsuleFolderLeft diaryCapsuleToneMoonstone"
              id="lay-flat-planners"
              type="button"
              onClick={() => setSelectedCard(2)}
            >
              <img src={diaryCards[2].image} alt={diaryCards[2].alt} loading="lazy" decoding="async" />
              <span><small>{diaryCards[2].category}</small><strong>{diaryCards[2].title}</strong></span>
            </button>
          </div>

          <div className="diaryCapsuleGroup diaryCapsuleGroupCentre" data-diary-group>
            <div className="diaryCapsuleSunburst" aria-hidden="true">
              <svg viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="2.2" />
                <circle cx="12" cy="3.5" r="1.3" />
                <circle cx="12" cy="20.5" r="1.3" />
                <circle cx="3.5" cy="12" r="1.3" />
                <circle cx="20.5" cy="12" r="1.3" />
                <circle cx="6" cy="6" r="1.2" />
                <circle cx="18" cy="18" r="1.2" />
                <circle cx="18" cy="6" r="1.2" />
                <circle cx="6" cy="18" r="1.2" />
              </svg>
            </div>
            <button
              className="diaryCapsuleCard diaryCapsuleCardCentre diaryCapsuleRounded diaryCapsuleToneParchment"
              id="thread-sewn-notebooks"
              type="button"
              onClick={() => setSelectedCard(3)}
            >
              <img src={diaryCards[3].image} alt={diaryCards[3].alt} loading="lazy" decoding="async" />
              <span><small>{diaryCards[3].category}</small><strong>{diaryCards[3].title}</strong></span>
            </button>
            <a className="diaryCapsuleCta" href="/#contact">
              Get your custom diary <span aria-hidden="true">↗</span>
            </a>
          </div>

          <div className="diaryCapsuleGroup" data-diary-group>
            <button
              className="diaryCapsuleCard diaryCapsuleCardFull diaryCapsuleFolderRight diaryCapsuleToneMidnight"
              type="button"
              onClick={() => setSelectedCard(4)}
            >
              <img src={diaryCards[4].image} alt={diaryCards[4].alt} loading="lazy" decoding="async" />
              <span><small>{diaryCards[4].category}</small><strong>{diaryCards[4].title}</strong></span>
            </button>
          </div>

          <div className="diaryCapsuleGroup diaryCapsuleGroupSplit" data-diary-group>
            <button
              className="diaryCapsuleCard diaryCapsuleCardTall diaryCapsuleFolderRight diaryCapsuleToneSteel"
              type="button"
              onClick={() => setSelectedCard(5)}
            >
              <img src={diaryCards[5].image} alt={diaryCards[5].alt} loading="lazy" decoding="async" />
              <span><small>{diaryCards[5].category}</small><strong>{diaryCards[5].title}</strong></span>
            </button>
            <button
              className="diaryCapsuleCard diaryCapsuleCardShort diaryCapsuleRoundedSmall diaryCapsuleToneInk"
              type="button"
              onClick={() => setSelectedCard(6)}
            >
              <img src={diaryCards[6].image} alt={diaryCards[6].alt} loading="lazy" decoding="async" />
              <span><small>{diaryCards[6].category}</small><strong>{diaryCards[6].title}</strong></span>
            </button>
          </div>
        </div>
      </div>

      <p className="diaryCapsuleSwipePrompt">Use buttons or swipe horizontally</p>

      {card && (
        <div className="diaryCapsuleModal" role="presentation" onClick={() => setSelectedCard(null)}>
          <article
            role="dialog"
            aria-modal="true"
            aria-labelledby="diary-card-dialog-title"
            onClick={(event) => event.stopPropagation()}
          >
            <button className="diaryCapsuleModalClose" type="button" onClick={() => setSelectedCard(null)} aria-label="Close diary details">
              <CloseIcon />
            </button>
            <figure className={`diaryCapsuleModalVisual ${diaryToneClasses[card.tone]}`}>
              <img src={card.image} alt={card.alt} />
              <figcaption>Palette: {card.palette}</figcaption>
            </figure>
            <div className="diaryCapsuleModalCopy">
              <div>
                <small>{card.category}</small>
                <h3 id="diary-card-dialog-title">{card.title}</h3>
                <p>{card.detail}</p>
                <dl>
                  <div><dt>Format</dt><dd>{card.format}</dd></div>
                  <div><dt>Finish</dt><dd>{card.finish}</dd></div>
                  <div><dt>Collection</dt><dd>TruePrint Diaries</dd></div>
                </dl>
              </div>
              <a href="/#contact">Start with this diary <span aria-hidden="true">↗</span></a>
            </div>
          </article>
        </div>
      )}

      {storyOpen && (
        <div className="diaryCapsuleModal diaryCapsuleStoryModal" role="presentation" onClick={() => setStoryOpen(false)}>
          <article
            role="dialog"
            aria-modal="true"
            aria-labelledby="diary-story-dialog-title"
            onClick={(event) => event.stopPropagation()}
          >
            <button className="diaryCapsuleModalClose" type="button" onClick={() => setStoryOpen(false)} aria-label="Close diary story">
              <CloseIcon />
            </button>
            <figure>
              <img src="/diary-hero.webp" alt="Premium TruePrint diary in production-ready detail" />
              <span aria-hidden="true"><i /></span>
            </figure>
            <div>
              <small>Inside the collection</small>
              <h3 id="diary-story-dialog-title">Made around the way it will be used.</h3>
              <p>Every TruePrint diary begins with its purpose, then brings format, cover, pages, binding and finishing together as one complete object.</p>
              <a href="/#contact">Start your diary <span aria-hidden="true">↗</span></a>
            </div>
          </article>
        </div>
      )}
    </section>
  );
}
