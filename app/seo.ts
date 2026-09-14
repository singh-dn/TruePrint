import type { Metadata } from "next";

export const SITE_URL = "https://thetrueprint.com";

export const homeSeo = {
  title: "TruePrint | Corporate Printing, Gifting & Branded Merchandise",
  description: "Source custom branded merchandise with TruePrint: corporate diaries, T-shirts, bottles, employee welcome kits and business printing, tailored to your brand.",
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
    title: "Custom Branded Diaries & Corporate Notebooks | TruePrint",
    description: "Source custom branded diaries, corporate notebooks and planners with your company logo. Explore cover materials, printing and finishes with TruePrint.",
    path: "/custom-corporate-diaries",
  },
  "visiting-cards": {
    name: "Premium Visiting Cards & Business Cards",
    title: "Custom Visiting Cards for Businesses | TruePrint",
    description: "Order custom visiting cards and business cards with your company branding. Explore premium paper, foil and embossed finishes for corporate orders at TruePrint.",
    path: "/custom-visiting-cards",
  },
  pens: {
    name: "Custom Branded Pens & Corporate Pens",
    title: "Custom Branded Pens for Businesses | TruePrint",
    description: "Source custom branded pens with logo printing or engraving. TruePrint offers everyday, metal and executive pens for corporate gifts, events and employee kits.",
    path: "/custom-branded-pens",
  },
  "joining-kits": {
    name: "Custom Employee Joining Kits & Welcome Kits",
    title: "Custom Employee Joining Kits & Welcome Kits | TruePrint",
    description: "Create custom employee joining kits and branded welcome kits with TruePrint. Combine stationery, bottles, apparel, tech gifts and packaging for new hires.",
    path: "/custom-employee-joining-kits",
  },
  "tech-products": {
    name: "Custom Branded Tech Products & Corporate Gifts",
    title: "Custom Corporate Tech Products & Gadgets | TruePrint",
    description: "Explore custom branded tech products and corporate gadgets at TruePrint: power banks, chargers, speakers and desk accessories for employee and client gifting.",
    path: "/custom-corporate-tech-products",
  },
  bags: {
    name: "Custom Branded Bags, Backpacks & Totes",
    title: "Custom Corporate Bags & Backpacks | TruePrint",
    description: "Source custom branded bags, corporate backpacks, laptop bags and tote bags with your company logo. TruePrint helps customize bags for teams, events and gifting.",
    path: "/custom-corporate-bags",
  },
  drinkware: {
    name: "Custom Branded Drinkware, Bottles & Mugs",
    title: "Custom Branded Bottles, Mugs & Drinkware | TruePrint",
    description: "Explore custom branded bottles, mugs, tumblers and flasks with your company logo. TruePrint sources corporate drinkware for employee kits, events and gifting.",
    path: "/custom-corporate-drinkware",
  },
  "t-shirts": {
    name: "Custom Branded T-Shirts & Corporate Apparel",
    title: "Custom Branded T-Shirts & Corporate Apparel | TruePrint",
    description: "Source custom branded T-shirts and corporate polo shirts with logo printing or embroidery. Explore fabrics, colours and fits for teams and events at TruePrint.",
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
