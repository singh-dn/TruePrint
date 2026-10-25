// Banner-only presentation. Product, catalogue and SEO configuration stay in their existing modules.
export type CategoryBannerTheme = {
  patternLabel: string;
  patternWord: string;
  pill: string;
  title: readonly [string, string];
  emphasis: readonly [string, string];
  detailTitle: string;
  description: string;
  cta: string;
  imageAlt: string;
  colours: { ink: string; accent: string; start: string; mid: string; end: string; light: string; pale: string; muted: string; heading: string };
};

export const categoryBannerThemes = {
  pens: {
    patternLabel: "CUSTOM PENS", patternWord: "PENS",
    pill: "Useful every day. Branded your way.",
    title: ["A pen", "people keep."], emphasis: ["Your brand,", "remembered."],
    detailTitle: "Pens with a personal touch",
    description: "From everyday ballpoints to executive metal pens, explore finishes and branding for your next brief.",
    cta: "Explore Pen Catalogues",
    imageAlt: "Illustrative collection of teal, silver and black executive pens with a gift sleeve",
    colours: { ink: "#0b3f3a", accent: "#176f66", start: "#99e1d9", mid: "#38a99d", end: "#176f66", light: "#c9f1ed", pale: "#f7fffe", muted: "#416c67", heading: "#f7fffe" },
  },
  "joining-kits": {
    patternLabel: "JOINING KITS", patternWord: "KITS",
    pill: "A thoughtful welcome, from day one.",
    title: ["Make day one", "feel special."], emphasis: ["Welcome them", "your way."],
    detailTitle: "A welcome worth opening",
    description: "Bring useful essentials, thoughtful packaging and your identity together in one coordinated joining kit.",
    cta: "Explore Kit Catalogues",
    imageAlt: "Illustrative purple employee welcome kit with notebook, pen, bottle and folded apparel",
    colours: { ink: "#2a1d48", accent: "#6a50a0", start: "#6a50a0", mid: "#36255c", end: "#2a1d48", light: "#d9cfee", pale: "#faf8ff", muted: "#625775", heading: "#d9cfee" },
  },
  "tech-products": {
    patternLabel: "BRANDED TECH", patternWord: "TECH",
    pill: "Useful tech. A lasting brand connection.",
    title: ["Smart gifts.", "Daily use."], emphasis: ["Your brand,", "in the mix."],
    detailTitle: "Tech that earns its place",
    description: "Explore power banks, speakers and desk accessories for workdays, welcome kits and corporate gifting.",
    cta: "Explore Tech Catalogues",
    imageAlt: "Illustrative navy and silver tech gifts including power bank, earbuds, speaker and charging stand",
    colours: { ink: "#102552", accent: "#315e98", start: "#315e98", mid: "#102552", end: "#102552", light: "#dce8f7", pale: "#f7faff", muted: "#53647d", heading: "#dce8f7" },
  },
  bags: {
    patternLabel: "CUSTOM BAGS", patternWord: "BAGS",
    pill: "Made to carry more than the essentials.",
    title: ["Ready for", "every day."], emphasis: ["Your brand,", "on the move."],
    detailTitle: "A better way to carry",
    description: "Find backpacks, totes and travel bags with practical details and branding made for everyday visibility.",
    cta: "Explore Bag Catalogues",
    imageAlt: "Illustrative charcoal laptop backpack, cyan canvas tote and deep-teal travel duffel",
    colours: { ink: "#053e42", accent: "#08727a", start: "#1ec1cb", mid: "#14adb6", end: "#08727a", light: "#b9f0f3", pale: "#f4feff", muted: "#315f62", heading: "#f4feff" },
  },
  drinkware: {
    patternLabel: "DRINKWARE", patternWord: "DRINKWARE",
    pill: "For the desk, the commute and beyond.",
    title: ["A daily sip.", "A lasting"], emphasis: ["impression", "of your brand."],
    detailTitle: "Drinkware made personal",
    description: "Explore bottles, mugs, flasks and tumblers with finishes and logo treatments to suit your audience.",
    cta: "Explore Drinkware",
    imageAlt: "Illustrative deep-teal bottle, mint travel tumbler, stainless-steel flask and white ceramic mug",
    colours: { ink: "#0b3f3d", accent: "#176e6a", start: "#5fbdb9", mid: "#1f5f5d", end: "#124d4b", light: "#cdebea", pale: "#f1fbfa", muted: "#315f5c", heading: "#cdebea" },
  },
  "t-shirts": {
    patternLabel: "CUSTOM TEES", patternWord: "T-SHIRTS",
    pill: "For teams, events and everyday wear.",
    title: ["Wear it well.", "Make it"], emphasis: ["part of your", "brand story."],
    detailTitle: "Apparel with your identity",
    description: "Choose polos and everyday tees, then explore fabric, fit, colour and branding for your people.",
    cta: "Explore Apparel",
    imageAlt: "Illustrative burgundy polo with folded white and charcoal corporate t-shirts",
    colours: { ink: "#510811", accent: "#a62537", start: "#c93349", mid: "#8b1221", end: "#510811", light: "#ffd3d9", pale: "#fff7f8", muted: "#78535a", heading: "#ffd3d9" },
  },
} as const satisfies Record<string, CategoryBannerTheme>;

export type CategoryBannerKey = keyof typeof categoryBannerThemes;
