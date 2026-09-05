import type { Metadata } from "next";

export const SITE_URL = "https://trueprint.internsatthe420.chatgpt.site";

const socialImage = {
  url: `${SITE_URL}/og.png`,
  width: 1200,
  height: 630,
  alt: "TruePrint premium printing, corporate gifting and branded merchandise",
};

type PageMetadataInput = {
  title: string;
  description: string;
  path: string;
};

export function buildPageMetadata({ title, description, path }: PageMetadataInput): Metadata {
  const canonical = `${SITE_URL}${path}`;

  return {
    title,
    description,
    alternates: { canonical },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1,
      },
    },
    openGraph: {
      title,
      description,
      url: canonical,
      siteName: "TruePrint",
      locale: "en_IN",
      type: "website",
      images: [socialImage],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [socialImage.url],
    },
  };
}

export const categorySeo = {
  diaries: {
    name: "Custom Diaries & Branded Planners",
    title: "Custom Diaries & Branded Planners | TruePrint",
    description: "Create custom diaries and branded planners with tailored covers, paper, layouts, foil, embossing and packaging for teams, clients and events.",
    path: "/categories",
  },
  "visiting-cards": {
    name: "Premium Visiting Cards & Business Cards",
    title: "Premium Visiting Cards & Business Cards | TruePrint",
    description: "Print premium visiting cards and business cards with custom paper, thickness, foil, embossing, spot UV, edge finishes and precise colour.",
    path: "/categories/visiting-cards",
  },
  pens: {
    name: "Custom Branded Pens & Corporate Pens",
    title: "Custom Branded Pens & Corporate Pens | TruePrint",
    description: "Source and customise branded pens for offices, events and corporate gifting, including metal, ballpoint, rollerball, stylus and engraved options.",
    path: "/categories/pens",
  },
  "joining-kits": {
    name: "Custom Employee Joining Kits & Welcome Kits",
    title: "Custom Employee Joining Kits & Welcome Kits | TruePrint",
    description: "Build custom employee joining kits with coordinated merchandise, personalised details, branded packaging and presentation-ready delivery.",
    path: "/categories/joining-kits",
  },
  "tech-products": {
    name: "Custom Branded Tech Products & Corporate Gifts",
    title: "Custom Branded Tech Products & Corporate Gifts | TruePrint",
    description: "Explore branded tech products including power banks, chargers, speakers, earbuds, stands and desk accessories for gifting and onboarding.",
    path: "/categories/tech-products",
  },
  bags: {
    name: "Custom Branded Bags, Backpacks & Totes",
    title: "Custom Branded Bags, Backpacks & Totes | TruePrint",
    description: "Customise branded backpacks, laptop bags, totes, duffels and travel bags with considered materials, embroidery, printing and practical details.",
    path: "/categories/bags",
  },
  drinkware: {
    name: "Custom Branded Drinkware, Bottles & Mugs",
    title: "Custom Branded Drinkware, Bottles & Mugs | TruePrint",
    description: "Create branded bottles, mugs, tumblers, flasks and sippers with custom printing, engraving and packaging for teams, events and corporate gifts.",
    path: "/categories/drinkware",
  },
  "t-shirts": {
    name: "Custom Branded T-Shirts & Corporate Apparel",
    title: "Custom Branded T-Shirts & Corporate Apparel | TruePrint",
    description: "Order custom branded T-shirts with selected fabrics, fits, colours, screen printing, DTF or embroidery for teams, events and merchandise.",
    path: "/categories/t-shirts",
  },
} as const;

export type CategorySeoKey = keyof typeof categorySeo;

export function buildCategoryMetadata(categoryKey: CategorySeoKey): Metadata {
  return buildPageMetadata(categorySeo[categoryKey]);
}

export function buildCategoryJsonLd(categoryKey: CategorySeoKey) {
  const category = categorySeo[categoryKey];
  const url = `${SITE_URL}${category.path}`;

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        "@id": `${url}#collection`,
        url,
        name: category.name,
        description: category.description,
        isPartOf: { "@id": `${SITE_URL}/#website` },
        about: { "@type": "Thing", name: category.name },
        inLanguage: "en-IN",
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
          { "@type": "ListItem", position: 2, name: category.name, item: url },
        ],
      },
    ],
  };
}
