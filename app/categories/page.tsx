import type { Metadata } from "next";
import type { CSSProperties } from "react";
import ClientStories from "../client-stories";
import FooterProductIndex from "../footer-product-index";
import AnimatedWordmark from "../animated-wordmark";
import ScrollHeader from "../scroll-header";
import DiaryCatalogue from "./diary-catalogue";
import DiaryFaq from "./diary-faq";
import DiaryHeroShowcase from "./diary-hero-showcase";
import ElectricCatalogueButton from "./electric-catalogue-button";
import CategoryGallery from "./category-gallery";
import { ArrowFillLink } from "../arrow-fill-button";
import { categoryProductCopy } from "./category-product-copy";
import { CategoryMegaMenu, MobileCategoryMenu, ProductSearch } from "../nav-discovery";
import { buildCategoryJsonLd, buildCategoryMetadata, type CategorySeoKey } from "../seo";

export const metadata: Metadata = buildCategoryMetadata("diaries");

const diaryMaterials = [
  { number: "01", name: "Buckram cloth", note: "Woven · tactile · durable" },
  { number: "02", name: "Recycled cover", note: "Soft touch · considered" },
  { number: "03", name: "Uncoated paper", note: "Natural shade · clean writing" },
  { number: "04", name: "Elastic & ribbon", note: "Matched · contrasting" },
  { number: "05", name: "Foil & deboss", note: "Branded · dimensional" },
  { number: "06", name: "Thread & binding", note: "Lay-flat · section sewn" },
] as const;

const diaryJourney = [
  { number: "01", icon: "💬", title: "Share the brief", copy: "Tell us who it is for, the quantity, deadline and any idea already taking shape." },
  { number: "02", icon: "✎", title: "Shape the diary", copy: "We organise format, pages, materials and branding into one clear production route." },
  { number: "03", icon: "✓", title: "Proof and approve", copy: "Review the details, refine what matters and approve the diary before production begins." },
  { number: "04", icon: "📦", title: "Make and deliver", copy: "We print, finish, bind, check and prepare every diary for its final destination." },
] as const;

const categoryNames: Record<string, string> = {
  diaries: "Diary",
  "visiting-cards": "Visiting Cards",
  pens: "Pens",
  "joining-kits": "Joining Kits",
  "tech-products": "Tech Products",
  bags: "Bags",
  drinkware: "Drinkware",
  "t-shirts": "T-Shirts",
};

export default function CategoriesPage({ categoryKey = "diaries" }: { categoryKey?: string } = {}) {
  const categoryName = categoryNames[categoryKey] ?? categoryNames.diaries;
  const productCopy = categoryProductCopy[categoryKey as keyof typeof categoryProductCopy] ?? categoryProductCopy.diaries;
  const structuredData = buildCategoryJsonLd((categoryKey in categoryProductCopy ? categoryKey : "diaries") as CategorySeoKey);
  return (
    <main className="pageShell diaryPageShell">
      <section className={`siteCard diaryPage categoryPage--${categoryKey}`} id="top" aria-label={`TruePrint ${categoryName} category page`}>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, "\\u003c") }} />
        <div className="headerFrame">
          <header className="siteHeader categorySiteHeader" data-site-header>
            <AnimatedWordmark />

            <ProductSearch variant="category" />

            <nav className="categoryDesktopNav" aria-label={`${categoryName} page navigation`}>
              <a href="/">Home page</a>
              <CategoryMegaMenu />
              <a href="/contact">Contact us</a>
              <ElectricCatalogueButton />
            </nav>

            <details className="mobileMenu">
              <summary aria-label="Open navigation"><span /><span /><span /></summary>
              <nav aria-label={`${categoryName} mobile navigation`}>
                <ProductSearch variant="mobile" />
                <div className="mobileMenuLinks">
                  <a href="/">Home page</a>
                  <MobileCategoryMenu />
                  <a href="/contact">Contact us</a>
                  <a href="#diary-catalogue">Download catalogue</a>
                </div>
                <ArrowFillLink className="mobileTalkButton" href="/contact" label="Talk to expert" />
              </nav>
            </details>
          </header>
        </div>
        <ScrollHeader />
        <div className="headerRule" />

        <DiaryHeroShowcase category={categoryKey} />

        <section className="diaryFoundation" id="diary-collection" aria-labelledby="diary-foundation-title">
          <header className="diaryFoundationHeader">
            <p><span>02</span> The product</p>
            <h2 id="diary-foundation-title">{productCopy.headline}<br /><em>{productCopy.emphasis}</em></h2>
          </header>

          <div className="diaryFoundationGrid">
            <div className="diaryFoundationCopy">
              <p className="diaryLead">
                {productCopy.lead}
              </p>
              <p>
                {productCopy.supporting}
              </p>
              <div className="diaryBenefits" aria-label={`Ways to create your ${categoryName.toLowerCase()}`}>
                {productCopy.benefits.map((benefit, index) => (
                  <article key={benefit.title}>
                    <span>{String(index + 1).padStart(2, "0")}</span>
                    <div>
                      <h3>{benefit.title}</h3>
                      <p>{benefit.copy}</p>
                    </div>
                  </article>
                ))}
              </div>
            </div>

            <figure className="diaryFoundationVisual">
              <img src="/diary-planner.webp" alt="Open diary showing a considered lay-flat page design" loading="lazy" decoding="async" />
              <figcaption>
                <span>{productCopy.captionLabel}</span>
                <strong>{productCopy.caption}</strong>
              </figcaption>
            </figure>
          </div>

          <div className="diaryMaterials" aria-label="Diary materials and finishing options">
            {diaryMaterials.map((material) => (
              <article key={material.number}>
                <span>{material.number}</span>
                <h3>{material.name}</h3>
                <p>{material.note}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="diaryJourney" aria-labelledby="diary-journey-title">
          <span className="diaryJourneyGhost" aria-hidden="true">ROUTE</span>
          <header className="diaryJourneyHeader">
            <p><span /> From idea to object</p>
            <h2 id="diary-journey-title">Four clear steps.<br /><em>One finished diary.</em></h2>
            <p>A simple route keeps every choice visible, from the first conversation to the final packed piece.</p>
          </header>

          <div className="diaryJourneyPanel">
            <div className="diaryJourneyTrack" aria-hidden="true" />
            {diaryJourney.map((step, index) => (
              <article className="diaryJourneyStep" key={step.number} style={{ "--step-index": index } as CSSProperties}>
                <span className="diaryJourneyNode"><i>{step.icon}</i></span>
                <div>
                  <small>Step {step.number}</small>
                  <h3>{step.title}</h3>
                  <p>{step.copy}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <DiaryCatalogue categoryKey={categoryKey} />

        <DiaryFaq />

        {(categoryKey === "diaries" || categoryKey === "joining-kits") && (
          <CategoryGallery category={categoryKey} />
        )}

        <ClientStories />

        <footer className="siteFooter diaryFooter" id="about">
          <section className="closingCta" aria-labelledby="diary-closing-title">
            <span className="closingGlow" aria-hidden="true" />
            <div className="closingGrid">
              <article className="closingGlass">
                <p className="closingKicker"><span /> Your next print project</p>
                <h2 id="diary-closing-title">Make the next thing<br />worth holding.</h2>
                <p className="closingCopy">
                  Bring us the idea, the deadline or even the unfinished thought.
                  We&apos;ll shape the paper, colour and finish around what it needs to become.
                </p>
                <ArrowFillLink className="closingButton" href="/#contact" label="Start a project" />
              </article>

              <figure className="closingImage">
                <img
                  src="/trueprint-packaging.webp"
                  alt="Premium printed packaging arranged in a tactile brand collection"
                  loading="lazy"
                  decoding="async"
                />
                <figcaption>
                  <span>Made tangible</span>
                  <small>Packaging · stationery · editorial</small>
                </figcaption>
              </figure>
            </div>
          </section>

          <div className="footerBody">
            <div className="footerTop">
              <div className="footerIntro">
                <a className="footerBrand" href="/" aria-label="TruePrint home">
                  <span className="brandMark" aria-hidden="true"><span /><span /><span /></span>
                  <span>TruePrint</span>
                </a>
                <p>Premium print, precise colour and thoughtful finishing, made to be remembered.</p>
              </div>

              <nav className="footerColumn" aria-label="Print services">
                <p>Print</p>
                <a href="/categories">Diaries &amp; planners</a>
                <a href="/categories/visiting-cards">Business cards</a>
                <a href="/#contact">Premium packaging</a>
                <a href="/#contact">Books &amp; brochures</a>
              </nav>

              <nav className="footerColumn" aria-label="Finishing services">
                <p>Finish</p>
                <a href="/#materials">Foil stamping</a>
                <a href="/#materials">Letterpress</a>
                <a href="/#materials">Emboss &amp; deboss</a>
                <a href="/#materials">Edge finishing</a>
              </nav>

              <nav className="footerColumn" aria-label="TruePrint website links">
                <p>Studio</p>
                <a href="/#projects">Selected work</a>
                <a href="/#materials">Materials</a>
                <a href="/#services">Services</a>
                <a href="/#contact">Start a project</a>
              </nav>

              <div className="footerColumn footerConnect">
                <p>Connect</p>
                <a href="/#contact">Request a quote</a>
                <a href="#top">Back to top</a>
                <div className="footerSocials" aria-label="Social channels">
                  <span aria-label="Instagram">ig</span>
                  <span aria-label="LinkedIn">in</span>
                  <span aria-label="X">x</span>
                </div>
              </div>
            </div>

            <div className="footerWord" aria-hidden="true"><span>TRUEPRINT</span></div>
            <FooterProductIndex />
            <div className="footerBottom"><span>TruePrint</span><p>Ideas, made tangible.</p></div>
          </div>
        </footer>
      </section>
    </main>
  );
}
