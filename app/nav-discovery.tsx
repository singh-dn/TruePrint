"use client";

import { useMemo, useRef, useState, type FocusEvent, type FormEvent } from "react";

const SearchIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path d="m21 21-4.35-4.35m2.35-5.15a7.5 7.5 0 1 1-15 0 7.5 7.5 0 0 1 15 0Z" />
  </svg>
);

const productCategories = [
  {
    name: "Visiting Cards",
    description: "Cards · introductions · identity",
    href: "/categories/visiting-cards",
    aliases: ["visiting card", "visiting cards", "business card", "business cards", "name card", "calling card", "contact card", "corporate card", "professional card", "card printing"],
  },
  {
    name: "Diaries",
    description: "Diaries · notebooks · planners",
    href: "/categories",
    aliases: ["diary", "diaries", "book", "books", "notebook", "notebooks", "note book", "journal", "journals", "planner", "planners", "organizer", "organiser", "agenda", "daily planner", "executive diary", "hardcover book", "hardbound book", "notepad"],
  },
  {
    name: "Pens",
    description: "Pens · writing tools · stationery",
    href: "/categories/pens",
    aliases: ["pen", "pens", "writing pen", "ball pen", "ballpoint", "rollerball", "fountain pen", "stylus", "writing tool", "stationery"],
  },
  {
    name: "Joining Kits",
    description: "Welcome · onboarding · employee kits",
    href: "/categories/joining-kits",
    aliases: ["joining kit", "joining kits", "onboarding kit", "employee kit", "employee welcome kit", "welcome kit", "starter kit", "induction kit", "new hire kit", "hr kit", "office kit"],
  },
  {
    name: "Tech Products",
    description: "Gadgets · electronics · accessories",
    href: "/categories/tech-products",
    aliases: ["tech", "tech product", "technology product", "technology gifts", "gadget", "gadgets", "electronic", "electronics", "power bank", "charger", "charging cable", "usb", "pendrive", "pen drive", "speaker", "earbuds", "mouse", "keyboard"],
  },
  {
    name: "Bags",
    description: "Bags · backpacks · carry goods",
    href: "/categories/bags",
    aliases: ["bag", "bags", "backpack", "backpacks", "tote", "tote bag", "laptop bag", "travel bag", "duffle", "duffel", "pouch", "carry bag", "office bag"],
  },
  {
    name: "Drinkware",
    description: "Bottles · mugs · tumblers",
    href: "/categories/drinkware",
    aliases: ["drinkware", "bottle", "bottles", "water bottle", "flask", "thermos", "tumbler", "mug", "mugs", "cup", "cups", "sipper", "coffee mug", "travel mug"],
  },
  {
    name: "T-Shirts",
    description: "T-shirts · apparel · branded wear",
    href: "/categories/t-shirts",
    aliases: ["t shirt", "t-shirt", "tshirt", "tee", "tees", "shirt", "shirts", "polo", "polo shirt", "apparel", "clothing", "branded wear", "hoodie", "hoodies", "merchandise"],
  },
] as const;

const normalize = (value: string) => value.toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();

const scoreProduct = (query: string, product: (typeof productCategories)[number]) => {
  const normalizedName = normalize(product.name);
  const searchable = [normalizedName, ...product.aliases.map(normalize)];
  if (!query) return 1;
  if (normalizedName === query) return 100;
  if (searchable.some((term) => term === query)) return 90;
  if (searchable.some((term) => term.startsWith(query))) return 70;
  if (searchable.some((term) => term.includes(query) || query.includes(term))) return 50;
  const queryWords = query.split(" ");
  if (searchable.some((term) => queryWords.every((word) => term.includes(word)))) return 30;
  return 0;
};

export function ProductSearch({ variant = "home" }: { variant?: "home" | "category" | "mobile" }) {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const normalizedQuery = normalize(query);
  const results = useMemo(
    () => productCategories
      .map((product) => ({ product, score: scoreProduct(normalizedQuery, product) }))
      .filter(({ score }) => score > 0)
      .sort((a, b) => b.score - a.score)
      .map(({ product }) => product),
    [normalizedQuery],
  );

  const submitSearch = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    window.location.assign(results[0]?.href ?? "/contact");
  };

  const leaveSearch = (event: FocusEvent<HTMLFormElement>) => {
    if (!formRef.current?.contains(event.relatedTarget as Node | null)) setOpen(false);
  };

  if (variant === "category" || variant === "mobile") {
    return (
      <form className={`categoryNavSearch productSearch productSearchCategory${variant === "mobile" ? " mobileNavSearch" : ""}`} ref={formRef} onSubmit={submitSearch} onFocus={() => setOpen(true)} onBlur={leaveSearch}>
        <label>
          <span className="srOnly">Search all TruePrint products</span>
          <input value={query} onChange={(event) => setQuery(event.target.value)} type="search" placeholder="Search products..." autoComplete="off" />
        </label>
        <button type="submit" aria-label="Search TruePrint products"><SearchIcon /></button>
        {open && <SearchResults query={query} results={results} />}
      </form>
    );
  }

  return (
    <form className="productSearch productSearchHome" ref={formRef} onSubmit={submitSearch} onFocus={() => setOpen(true)} onBlur={leaveSearch}>
      <label className="searchField">
        <span className="srOnly">Search TruePrint products</span>
        <SearchIcon />
        <input value={query} onChange={(event) => setQuery(event.target.value)} type="search" placeholder="Search" autoComplete="off" />
      </label>
      {open && <SearchResults query={query} results={results} />}
    </form>
  );
}

function SearchResults({ query, results }: { query: string; results: readonly (typeof productCategories)[number][] }) {
  return (
    <div className="productSearchResults" role="listbox" aria-label="Product search results">
      <p>{query.trim() ? "Best matches" : "Browse products"}</p>
      {results.length ? results.map((product) => (
        <a href={product.href} role="option" aria-selected="false" key={product.name}>
          <span>{product.name.slice(0, 2).toUpperCase()}</span>
          <div><strong>{product.name}</strong><small>{product.description}</small></div>
          <i aria-hidden="true">↗</i>
        </a>
      )) : (
        <a href="/contact" role="option" aria-selected="false">
          <span>TP</span>
          <div><strong>Ask TruePrint</strong><small>Tell us what you are looking for</small></div>
          <i aria-hidden="true">↗</i>
        </a>
      )}
    </div>
  );
}

export function CategoryMegaMenu() {
  return (
    <div className="navCategoryItem">
      <a className="navCategoryTrigger" href="/categories" aria-haspopup="true">Categories <span className="navCategoryChevron" aria-hidden="true" /></a>
      <div className="categoryMega" aria-label="Product categories">
        <div className="categoryMegaList">
          <p>Print essentials</p>
          {productCategories.slice(0, 4).map((product) => <a href={product.href} key={product.name}>{product.name}<span>↗</span></a>)}
        </div>
        <div className="categoryMegaList">
          <p>Brand merchandise</p>
          {productCategories.slice(4).map((product) => <a href={product.href} key={product.name}>{product.name}<span>↗</span></a>)}
        </div>
        <a className="categoryMegaFeature" href="/categories">
          <img src="/diary-hero.webp" alt="TruePrint diary collection" />
          <span>Explore diaries <b>↗</b></span>
        </a>
        <a className="categoryMegaFeature" href="/contact">
          <img src="/trueprint-packaging.webp" alt="TruePrint custom gifting and packaging" />
          <span>Custom projects <b>↗</b></span>
        </a>
      </div>
    </div>
  );
}

export function MobileCategoryMenu() {
  return (
    <details className="mobileCategoryMenu">
      <summary>Categories <span aria-hidden="true">+</span></summary>
      <div>
        {productCategories.map((product) => (
          <a href={product.href} key={product.name}>
            <span><strong>{product.name}</strong><small>{product.description}</small></span>
            <i aria-hidden="true">↗</i>
          </a>
        ))}
      </div>
    </details>
  );
}
