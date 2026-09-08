import type { Metadata } from "next";

export const SITE_URL = "https://thetrueprint.com";

export const homeSeo = {
  title: "TruePrint | Corporate Printing, Gifting & Branded Merchandise",
  description: "TruePrint helps businesses source, customize and deliver corporate printing, branded merchandise, gifting, joining kits, apparel and more.",
  path: "",
};

const socialImage = {
  url: `${SITE_URL}/og.png`,
  type: "image/png",
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
  const canonical = new URL(path || "/", SITE_URL).href;

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
    title: "Custom Corporate Diaries & Notebooks | TruePrint",
    description: "Explore custom corporate diaries and notebooks for employees, clients, events and gifting, with premium finishes and branding options.",
    path: "/custom-corporate-diaries",
  },
  "visiting-cards": {
    name: "Premium Visiting Cards & Business Cards",
    title: "Custom Visiting Cards for Businesses | TruePrint",
    description: "Order premium custom visiting cards for businesses with multiple paper, finish and branding options. Ideal for bulk corporate requirements.",
    path: "/custom-visiting-cards",
  },
  pens: {
    name: "Custom Branded Pens & Corporate Pens",
    title: "Custom Branded Pens for Businesses | TruePrint",
    description: "Source custom branded pens for employees, events, gifting and promotions, with everyday, executive and premium options for businesses.",
    path: "/custom-branded-pens",
  },
  "joining-kits": {
    name: "Custom Employee Joining Kits & Welcome Kits",
    title: "Custom Employee Joining Kits & Welcome Kits | TruePrint",
    description: "Create custom employee joining kits with branded merchandise, stationery, drinkware, tech products, packaging and more for new hires.",
    path: "/custom-employee-joining-kits",
  },
  "tech-products": {
    name: "Custom Branded Tech Products & Corporate Gifts",
    title: "Custom Corporate Tech Products & Gadgets | TruePrint",
    description: "Explore branded tech products and corporate gadgets for employee gifting, onboarding, events and client gifts, customized for your brand.",
    path: "/custom-corporate-tech-products",
  },
  bags: {
    name: "Custom Branded Bags, Backpacks & Totes",
    title: "Custom Corporate Bags & Backpacks | TruePrint",
    description: "Source custom corporate bags, backpacks, laptop bags and travel bags for employees, events, gifting and promotional requirements.",
    path: "/custom-corporate-bags",
  },
  drinkware: {
    name: "Custom Branded Drinkware, Bottles & Mugs",
    title: "Custom Corporate Drinkware & Bottles | TruePrint",
    description: "Explore custom bottles, mugs, tumblers and flasks for corporate gifting, employee onboarding, events and branded merchandise.",
    path: "/custom-corporate-drinkware",
  },
  "t-shirts": {
    name: "Custom Branded T-Shirts & Corporate Apparel",
    title: "Custom Corporate T-Shirts & Branded Apparel | TruePrint",
    description: "Get custom corporate T-shirts for employees, events and promotions with multiple fabrics, colours, fits and branding options.",
    path: "/custom-corporate-t-shirts",
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
