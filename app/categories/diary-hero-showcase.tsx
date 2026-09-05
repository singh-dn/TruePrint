"use client";

import { useState, type CSSProperties } from "react";
import { ArrowFillLink } from "../arrow-fill-button";

const heroThemes = {
  diaries: {
    word: "DIARIES",
    aria: "diary",
    palette: ["#f7fafb", "#edf3f5", "#dbe8ec", "rgba(79, 117, 157, 0.18)", "rgba(123, 164, 188, 0.2)", "21vw"],
    options: [
      {
        pill: "Diaries, made for your brand.",
        title: "One diary.",
        emphasis: "Endless ways to make it yours.",
        name: "Executive hardcover",
        description: "A structured, gift-ready diary with a tactile cover and confident brand finish.",
        button: "Customize Your Diary",
      },
      {
        pill: "Write it your way.",
        title: "From first page to final finish,",
        emphasis: "make it yours.",
        name: "Premium everyday notebook",
        description: "A versatile notebook customized around the cover, paper, layout and branding your team needs.",
        button: "Explore Diary Options",
      },
      {
        pill: "Your reference. Our sourcing.",
        title: "If you can show it,",
        emphasis: "we can help source it.",
        name: "Custom-built diary",
        description: "Share a reference and we will explore materials, construction and branding to create the right fit.",
        button: "Share Your Reference",
      },
    ],
  },
  "visiting-cards": {
    word: "VISITING CARDS",
    aria: "visiting card",
    palette: ["#fff9fe", "#f2dced", "#e5bddf", "rgba(229, 189, 223, 0.58)", "rgba(229, 189, 223, 0.42)", "12vw"],
    options: [
      {
        pill: "Visiting cards, made to introduce you.",
        title: "A first impression",
        emphasis: "worth keeping.",
        name: "Premium soft-touch card",
        description: "A refined business card with a smooth tactile finish and crisp, confident branding.",
        button: "Create Your Visiting Card",
      },
      {
        pill: "Your identity, in every detail.",
        title: "Small card.",
        emphasis: "Strong impression.",
        name: "Textured executive card",
        description: "A distinctive card built around premium stock, considered typography and precise finishing.",
        button: "Customize Your Cards",
      },
      {
        pill: "Business cards, beyond standard.",
        title: "Made to feel as good",
        emphasis: "as your brand looks.",
        name: "Foil & raised-finish card",
        description: "A statement card with elevated finishing options for brands that want to stand apart.",
        button: "Explore Card Options",
      },
    ],
  },
  pens: {
    word: "PENS",
    aria: "pen",
    palette: ["#f7fffe", "#c9f1ed", "#99e1d9", "rgba(56, 169, 157, 0.34)", "rgba(153, 225, 217, 0.5)", "21vw"],
    options: [
      {
        pill: "Pens, made to carry your brand.",
        title: "A pen people keep.",
        emphasis: "A brand they remember.",
        name: "Executive metal pen",
        description: "A refined writing instrument with a premium weight, smooth finish and clean logo treatment.",
        button: "Customize Your Pens",
      },
      {
        pill: "Write with your identity.",
        title: "From everyday pens",
        emphasis: "to executive gifts.",
        name: "Everyday branded pen",
        description: "A practical, high-utility pen designed for offices, events, campaigns and everyday brand visibility.",
        button: "Explore Pen Options",
      },
      {
        pill: "Need a particular pen?",
        title: "Show us the style.",
        emphasis: "We'll source the fit.",
        name: "Reference-sourced pen",
        description: "Share the look, material or mechanism you want and we will explore suitable sourcing and branding options.",
        button: "Share Your Reference",
      },
    ],
  },
  "joining-kits": {
    word: "JOINING KITS",
    aria: "joining kit",
    palette: ["#faf8ff", "#d9cfee", "#36255c", "rgba(92, 68, 145, 0.25)", "rgba(204, 189, 239, 0.42)", "14vw"],
    options: [
      {
        pill: "Joining kits, made for day one.",
        title: "Make the first day",
        emphasis: "feel like your brand.",
        name: "Premium employee welcome kit",
        description: "A coordinated onboarding kit combining useful essentials, thoughtful packaging and consistent branding.",
        button: "Build Your Joining Kit",
      },
      {
        pill: "Welcome, thoughtfully packed.",
        title: "More than a box.",
        emphasis: "A complete first impression.",
        name: "Everyday onboarding kit",
        description: "A practical mix of branded work essentials designed around your people, budget and onboarding experience.",
        button: "Customize Your Kit",
      },
      {
        pill: "No fixed kit required.",
        title: "Choose every item.",
        emphasis: "Or show us the kit you want.",
        name: "Custom-sourced joining kit",
        description: "Build from our product range or share references and let us source the components around your requirement.",
        button: "Start Your Custom Kit",
      },
    ],
  },
  "tech-products": {
    word: "TECH PRODUCTS",
    aria: "tech product",
    palette: ["#f7faff", "#dce8f7", "#102552", "rgba(74, 126, 190, 0.3)", "rgba(172, 203, 238, 0.48)", "13vw"],
    options: [
      {
        pill: "Tech, made useful. Branding, made visible.",
        title: "Useful tech.",
        emphasis: "Unmistakably your brand.",
        name: "Premium power bank",
        description: "A practical everyday tech accessory with a clean form, useful capacity and considered brand placement.",
        button: "Customize Tech Products",
      },
      {
        pill: "Tech gifts people use.",
        title: "From desk accessories",
        emphasis: "to everyday devices.",
        name: "Wireless desk accessory",
        description: "A functional branded product designed for workspaces, onboarding, gifting and events.",
        button: "Explore Tech Options",
      },
      {
        pill: "Seen a gadget you like?",
        title: "Show us the product.",
        emphasis: "We'll explore the source.",
        name: "Custom-sourced tech product",
        description: "Share a reference for a charger, speaker, stand, earbud, cable or accessory and we will investigate suitable options.",
        button: "Share Your Reference",
      },
    ],
  },
  bags: {
    word: "BAGS",
    aria: "bag",
    palette: ["#f4feff", "#b9f0f3", "#1ec1cb", "rgba(0, 134, 144, 0.38)", "rgba(30, 193, 203, 0.5)", "21vw"],
    options: [
      {
        pill: "Bags, made to move with your brand.",
        title: "Carry your brand",
        emphasis: "everywhere.",
        name: "Premium laptop backpack",
        description: "A structured work bag combining everyday utility, clean design and considered corporate branding.",
        button: "Customize Your Bags",
      },
      {
        pill: "Built to carry more.",
        title: "From workday backpacks",
        emphasis: "to event totes.",
        name: "Everyday corporate tote",
        description: "A versatile branded bag for conferences, campaigns, employee kits and high-utility giveaways.",
        button: "Explore Bag Options",
      },
      {
        pill: "Have a bag in mind?",
        title: "Show us the shape.",
        emphasis: "We'll explore the source.",
        name: "Custom-sourced bag",
        description: "Share a reference for a backpack, laptop bag, duffel, tote or travel bag and we will explore suitable options.",
        button: "Share Your Reference",
      },
    ],
  },
  drinkware: {
    word: "DRINKWARE",
    aria: "drinkware",
    palette: ["#7accc8", "#5fbdb9", "#1f5f5d", "rgba(28, 125, 121, 0.24)", "rgba(185, 239, 235, 0.38)", "17vw"],
    options: [
      {
        pill: "Drinkware, made for your brand.",
        title: "Your brand,",
        emphasis: "in every sip.",
        name: "Premium vacuum bottle",
        description: "A reusable insulated bottle with a clean silhouette, practical everyday utility and refined logo placement.",
        button: "Customize Drinkware",
      },
      {
        pill: "Made to be used daily.",
        title: "Bottles, mugs and tumblers",
        emphasis: "built around your brand.",
        name: "Everyday insulated tumbler",
        description: "A versatile branded tumbler for desks, travel, employee kits, events and corporate gifting.",
        button: "Explore Drinkware",
      },
      {
        pill: "Seen the perfect bottle?",
        title: "Send the reference.",
        emphasis: "We'll explore the source.",
        name: "Custom-sourced drinkware",
        description: "Share the bottle, mug, flask or tumbler style you want and we will investigate suitable sourcing options.",
        button: "Share Your Reference",
      },
    ],
  },
  "t-shirts": {
    word: "T-SHIRTS",
    aria: "T-shirt",
    palette: ["#c93349", "#8b1221", "#510811", "rgba(255, 116, 131, 0.22)", "rgba(255, 198, 205, 0.32)", "18vw"],
    options: [
      {
        pill: "Apparel, made to wear your brand well.",
        title: "Wear the brand.",
        emphasis: "Not just the logo.",
        name: "Premium corporate T-shirt",
        description: "A well-fitted everyday tee with considered fabric, colour and branding for teams, events and merchandise.",
        button: "Customize Your T-Shirts",
      },
      {
        pill: "Made for teams. Built for repeat wear.",
        title: "From event tees",
        emphasis: "to everyday corporate apparel.",
        name: "Event & team T-shirt",
        description: "A comfortable branded T-shirt designed for events, campaigns, staff teams and high-volume requirements.",
        button: "Explore T-Shirt Options",
      },
      {
        pill: "Have a fit or style in mind?",
        title: "Show us the reference.",
        emphasis: "We'll help source it.",
        name: "Custom-sourced apparel",
        description: "Share a T-shirt reference, fabric direction or fit and we will explore suitable production and branding options.",
        button: "Share Your Reference",
      },
    ],
  },
} as const;

const heroFrames = [
  {
    image: "/diary-hero.webp",
    alt: "Premium product presentation",
  },
  {
    image: "/diary-planner.webp",
    alt: "Detailed custom product presentation",
  },
  {
    image: "/diary-softcover.webp",
    alt: "Custom product collection",
  },
] as const;

const Arrow = ({ reverse = false }: { reverse?: boolean }) => (
  <svg viewBox="0 0 24 24" aria-hidden="true" style={reverse ? { transform: "rotate(180deg)" } : undefined}>
    <path d="M5 12h13m-5-5 5 5-5 5" />
  </svg>
);

export default function DiaryHeroShowcase({ category = "diaries" }: { category?: string }) {
  const theme = heroThemes[category as keyof typeof heroThemes] ?? heroThemes.diaries;
  const [active, setActive] = useState(0);
  const current = theme.options[active];
  const heroStyle = {
    "--category-hero-start": theme.palette[0],
    "--category-hero-middle": theme.palette[1],
    "--category-hero-end": theme.palette[2],
    "--category-hero-glow": theme.palette[3],
    "--category-stage-glow": theme.palette[4],
    "--category-word-size": theme.palette[5],
  } as CSSProperties;

  const move = (direction: number) => {
    setActive((value) => (value + direction + heroFrames.length) % heroFrames.length);
  };

  return (
    <section className="categoryDiaryHero" style={heroStyle} aria-labelledby="category-diary-hero-title">
      <span className="categoryDiaryHeroWord" aria-hidden="true">{theme.word}</span>

      <div className="categoryDiaryHeroCopy">
        <p className="categoryDiaryHeroPill">{current.pill}</p>
        <h1 id="category-diary-hero-title">{current.title}<br /><em>{current.emphasis}</em></h1>

        <div className="categoryDiaryHeroDetail" aria-live="polite">
          <strong>{String(active + 1).padStart(2, "0")}</strong>
          <span aria-hidden="true" />
          <div>
            <h2>{current.name}</h2>
            <p>{current.description}</p>
          </div>
        </div>

        <ArrowFillLink className="categoryDiaryHeroButton" href="/#contact" label={current.button} />
      </div>

      <div className="categoryDiaryStage" role="region" aria-label={`Choose a ${theme.aria} style`}>
        <span className="categoryDiaryStageGlow" aria-hidden="true" />
        <span className="categoryDiaryStageBase" aria-hidden="true" />

        {heroFrames.map((frame, index) => {
          const option = theme.options[index];
          const offset = (index - active + heroFrames.length) % heroFrames.length;
          const position = offset === 0 ? "active" : offset === 1 ? "next" : "previous";
          return (
            <button
              className={`categoryDiaryProduct categoryDiaryProduct${position}`}
              type="button"
              onClick={() => setActive(index)}
              key={option.name}
              aria-label={`Show ${option.name}`}
              aria-current={index === active ? "true" : undefined}
            >
              <img src={frame.image} alt={`${option.name}: ${frame.alt}`} draggable="false" />
              <span>{option.name}</span>
            </button>
          );
        })}

        <div className="categoryDiaryStageControls">
          <button type="button" onClick={() => move(-1)} aria-label={`Previous ${theme.aria}`}><Arrow reverse /></button>
          <div aria-label={`${theme.aria} position`}>
            {heroFrames.map((frame, index) => (
              <button
                className={index === active ? "active" : ""}
                type="button"
                onClick={() => setActive(index)}
                aria-label={`Show ${theme.options[index].name}`}
                aria-current={index === active ? "true" : undefined}
                key={frame.image}
              />
            ))}
          </div>
          <button type="button" onClick={() => move(1)} aria-label={`Next ${theme.aria}`}><Arrow /></button>
        </div>
      </div>
    </section>
  );
}
