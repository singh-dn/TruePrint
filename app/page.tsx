import type { Metadata } from "next";
import type { CSSProperties } from "react";
import QuoteForm from "./quote-form";
import PrintReveal from "./print-reveal";
import PrintExperiments from "./print-experiments";
import PrintProcess from "./print-process";
import ScrollHeader from "./scroll-header";
import ProductVideoShowcase from "./product-video-showcase";
import AnimatedWordmark from "./animated-wordmark";
import ClientStories from "./client-stories";
import FooterProductIndex from "./footer-product-index";
import HomeWhatsApp from "./home-whatsapp";
import SourceRequestForm from "./source-request-form";
import { ArrowFillLink } from "./arrow-fill-button";
import { CategoryMegaMenu, MobileCategoryMenu, ProductSearch } from "./nav-discovery";
import { buildPageMetadata } from "./seo";

export const metadata: Metadata = buildPageMetadata({
  title: "TruePrint | Premium Custom Printing & Corporate Gifting",
  description: "Discover premium custom printing, branded merchandise, corporate gifts, precise colour and thoughtful finishing for teams, events and brands.",
  path: "",
});

const ArrowIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path d="M5 12h13m-5-5 5 5-5 5" />
  </svg>
);

const serviceRows = [
  {
    direction: "left",
    items: [
      { mark: "BC", name: "Business cards", tone: "midnight" },
      { mark: "PK", name: "Luxury packaging", tone: "copper" },
      { mark: "ED", name: "Editorial print", tone: "ink" },
      { mark: "IN", name: "Invitations", tone: "paper" },
    ],
  },
  {
    direction: "right",
    items: [
      { mark: "FS", name: "Foil stamping", tone: "copper" },
      { mark: "LP", name: "Letterpress", tone: "midnight" },
      { mark: "EM", name: "Embossing", tone: "paper" },
      { mark: "EP", name: "Edge painting", tone: "ink" },
    ],
  },
  {
    direction: "leftFast",
    items: [
      { mark: "LS", name: "Labels & stickers", tone: "paper" },
      { mark: "LF", name: "Large format", tone: "ink" },
      { mark: "CM", name: "Colour matching", tone: "midnight" },
      { mark: "SS", name: "Sustainable stocks", tone: "copper" },
    ],
  },
] as const;

const makingJourney = [
  { number: "01", icon: "💬", title: "Share the brief", copy: "Tell us what it is for, the quantity, deadline and any idea already taking shape." },
  { number: "02", icon: "✎", title: "Shape the route", copy: "We connect format, material, construction and budget into one clear production plan." },
  { number: "03", icon: "✓", title: "Proof and make", copy: "Review the details, approve the route and let our team control production and finishing." },
  { number: "04", icon: "📦", title: "Check and deliver", copy: "Every piece is inspected, organised and packed to arrive ready for its moment." },
] as const;

export default function Home() {
  return (
    <main className="pageShell">
      <section className="siteCard" id="top" aria-label="TruePrint home page">
        <div className="headerFrame">
          <header className="siteHeader" data-site-header>
            <AnimatedWordmark />

            <nav className="desktopNav" aria-label="Primary navigation">
              <a className="active" href="#top">Home</a>
              <CategoryMegaMenu />
              <a href="#services">Services</a>
              <a href="#materials">Materials</a>
              <a href="#about">About</a>
              <a href="/contact">Contact</a>
            </nav>

            <div className="headerTools">
              <ProductSearch />
              <ArrowFillLink className="talkExpertButton" href="/contact" label="Talk to expert" />
            </div>

            <details className="mobileMenu">
              <summary aria-label="Open navigation"><span /><span /><span /></summary>
              <nav aria-label="Mobile navigation">
                <ProductSearch variant="mobile" />
                <div className="mobileMenuLinks">
                  <a href="#top">Home</a>
                  <MobileCategoryMenu />
                  <a href="#services">Services</a>
                  <a href="#materials">Materials</a>
                  <a href="#about">About</a>
                  <a href="/contact">Contact</a>
                </div>
                <ArrowFillLink className="mobileTalkButton" href="/contact" label="Talk to expert" />
              </nav>
            </details>
          </header>
        </div>
        <ScrollHeader />

        <div className="headerRule" />

        <div className="heroScene">
          <div className="depthWord" aria-hidden="true">
            TRUEPRINT
          </div>

          <div className="heroGrid">
            <section className="heroCopy">
              <p className="eyebrow"><span /> Made to be remembered</p>
              <h1>Ideas, made<br />tangible.</h1>
              <p className="heroIntro">
                Premium print, precise colour and thoughtful finishing for brands
                that care about every last detail.
              </p>
              <ArrowFillLink className="primaryButton" href="#services" label="Explore our print" />

              <article className="featuredProduct">
                <img
                  src="/trueprint-detail.png"
                  alt="Close-up of premium printed business cards and paper stocks"
                />
                <div>
                  <p>Featured finish</p>
                  <h2>Foil &amp; letterpress</h2>
                  <span>Texture you can see. Quality you can feel.</span>
                </div>
              </article>
            </section>

            <section className="formStage" id="services" aria-label="Request a TruePrint quote">
              <span className="liquidOrb liquidOrbOne" aria-hidden="true" />
              <span className="liquidOrb liquidOrbTwo" aria-hidden="true" />
              <a className="roundCta" href="#contact" aria-label="Start a print project">
                <svg viewBox="0 0 160 160" aria-hidden="true">
                  <defs>
                    <path id="ctaCircle" d="M80,80 m-58,0 a58,58 0 1,1 116,0 a58,58 0 1,1 -116,0" />
                  </defs>
                  <text>
                    <textPath href="#ctaCircle">PRINT • PACK • CREATE • PRINT • PACK • CREATE • </textPath>
                  </text>
                </svg>
                <span><ArrowIcon /><small>Start a project</small></span>
              </a>
              <span className="notchRim" aria-hidden="true" />
              <div className="quotePanel">
                <div className="formAnchor" id="contact" aria-hidden="true" />
                <QuoteForm />
              </div>
            </section>
          </div>
        </div>

        <section className="marqueeSection" aria-label="TruePrint creative process">
          <div className="marqueeTrack">
            <p className="marqueeSet">
              <span>Create.</span>
              <span>Print.</span>
              <span>Finish.</span>
              <span>Deliver.</span>
            </p>
            <p className="marqueeSet" aria-hidden="true">
              <span>Create.</span>
              <span>Print.</span>
              <span>Finish.</span>
              <span>Deliver.</span>
            </p>
          </div>
        </section>

        <section className="projectsSection" id="projects" aria-labelledby="projects-title">
          <header className="projectsHeader">
            <span className="projectsGhost" aria-hidden="true">PROJECTS</span>
            <p className="projectsKicker"><span>03</span> Selected print work</p>
            <h2 id="projects-title">Selected work.<br /><em>Made tangible.</em></h2>
            <p>
              Thoughtful print systems shaped around the way each brand needs to
              look, feel and be remembered.
            </p>
          </header>

          <div className="projectsGrid">
            <a className="projectCard projectApparel" href="/categories/t-shirts">
              <span className="projectImage">
                <img
                  src="/trueprint-apparel.jpeg"
                  alt="Custom T-shirts and polo shirts from the TruePrint apparel collection"
                  loading="lazy"
                  decoding="async"
                />
              </span>
              <span className="projectShade" aria-hidden="true" />
              <span className="projectHover">
                <span className="projectHoverTop">
                  <strong>Custom apparel collection</strong>
                  <small>T-shirts, polos and wearable essentials selected to carry a brand comfortably and consistently.</small>
                </span>
                <span className="projectHoverBottom">
                  <span>View project <ArrowIcon /></span>
                  <em>T-shirts · Polos · Branding</em>
                </span>
              </span>
              <span className="projectInfo">
                <small>Apparel collection</small>
                <strong>Wearable branding, made to belong.</strong>
              </span>
              <span className="projectLink" aria-hidden="true"><ArrowIcon /></span>
            </a>

            <a className="projectCard projectDrinkware" href="/categories/drinkware">
              <span className="projectImage">
                <img
                  src="/trueprint-drinkware.jpeg"
                  alt="Custom bottles, mugs and tumblers from the TruePrint drinkware range"
                  loading="lazy"
                  decoding="async"
                />
              </span>
              <span className="projectShade" aria-hidden="true" />
              <span className="projectHover">
                <span className="projectHoverTop">
                  <strong>Branded drinkware range</strong>
                  <small>Bottles, mugs and tumblers chosen for daily use, practical gifting and visible brand recall.</small>
                </span>
                <span className="projectHoverBottom">
                  <span>View project <ArrowIcon /></span>
                  <em>Bottles · Mugs · Tumblers</em>
                </span>
              </span>
              <span className="projectInfo">
                <small>Drinkware range</small>
                <strong>Useful objects, remembered daily.</strong>
              </span>
              <span className="projectLink" aria-hidden="true"><ArrowIcon /></span>
            </a>

            <a className="projectCard projectJoiningKits" href="/categories/joining-kits">
              <span className="projectImage">
                <img
                  src="/trueprint-joining-kits.jpeg"
                  alt="Premium TruePrint employee joining kit with coordinated branded products"
                  loading="lazy"
                  decoding="async"
                />
              </span>
              <span className="projectShade" aria-hidden="true" />
              <span className="projectHover">
                <span className="projectHoverTop">
                  <strong>Employee joining kit</strong>
                  <small>A coordinated welcome experience with useful products, considered presentation and room for customization.</small>
                </span>
                <span className="projectHoverBottom">
                  <span>View project <ArrowIcon /></span>
                  <em>Welcome kits · Gifting · Customization</em>
                </span>
              </span>
              <span className="projectInfo">
                <small>Joining kit system</small>
                <strong>A welcome people want to unpack.</strong>
              </span>
              <span className="projectLink" aria-hidden="true"><ArrowIcon /></span>
            </a>

            <a className="projectCard projectDiaries" href="/categories">
              <span className="projectImage">
                <img
                  src="/trueprint-diaries.jpeg"
                  alt="Premium TruePrint custom diary with pen and detailed cover finishes"
                  loading="lazy"
                  decoding="async"
                />
              </span>
              <span className="projectShade" aria-hidden="true" />
              <span className="projectHover">
                <span className="projectHoverTop">
                  <strong>Premium diary collection</strong>
                  <small>Practical formats, tactile covers and considered details made for everyday planning and corporate gifting.</small>
                </span>
                <span className="projectHoverBottom">
                  <span>View project <ArrowIcon /></span>
                  <em>Diaries · Planners · Covers</em>
                </span>
              </span>
              <span className="projectInfo">
                <small>Diary collection</small>
                <strong>Planning tools with a premium touch.</strong>
              </span>
              <span className="projectLink" aria-hidden="true"><ArrowIcon /></span>
            </a>

            <a className="projectCard projectBags" href="/categories/bags">
              <span className="projectImage">
                <img
                  src="/trueprint-bags.jpeg"
                  alt="Custom backpacks, office bags and travel luggage from TruePrint"
                  loading="lazy"
                  decoding="async"
                />
              </span>
              <span className="projectShade" aria-hidden="true" />
              <span className="projectHover">
                <span className="projectHoverTop">
                  <strong>Custom bag collection</strong>
                  <small>Work, travel and everyday carry options built around utility, brand colour and thoughtful detailing.</small>
                </span>
                <span className="projectHoverBottom">
                  <span>View project <ArrowIcon /></span>
                  <em>Backpacks · Office bags · Travel</em>
                </span>
              </span>
              <span className="projectInfo">
                <small>Bag collection</small>
                <strong>Carry the brand beyond the desk.</strong>
              </span>
              <span className="projectLink" aria-hidden="true"><ArrowIcon /></span>
            </a>

            <a className="projectCard projectTech" href="/categories/tech-products">
              <span className="projectImage">
                <img
                  src="/trueprint-tech-products.jpeg"
                  alt="Useful branded technology products and desk accessories from TruePrint"
                  loading="lazy"
                  decoding="async"
                />
              </span>
              <span className="projectShade" aria-hidden="true" />
              <span className="projectHover">
                <span className="projectHoverTop">
                  <strong>Tech gifting range</strong>
                  <small>Useful devices and desk essentials selected for modern teams, events and thoughtful corporate gifting.</small>
                </span>
                <span className="projectHoverBottom">
                  <span>View project <ArrowIcon /></span>
                  <em>Desk tech · Audio · Everyday utility</em>
                </span>
              </span>
              <span className="projectInfo">
                <small>Tech product range</small>
                <strong>Smart essentials, branded with purpose.</strong>
              </span>
              <span className="projectLink" aria-hidden="true"><ArrowIcon /></span>
            </a>
          </div>
        </section>

        <section className="materialsSection" id="materials" aria-labelledby="materials-title">
          <span className="materialsOrb materialsOrbOne" aria-hidden="true" />
          <span className="materialsOrb materialsOrbTwo" aria-hidden="true" />

          <header className="materialsHeader">
            <p className="sectionLabel"><span>02</span> Materials &amp; finishes</p>
            <h2 id="materials-title">Paper with presence.<br />Finishes with purpose.</h2>
            <p className="materialsIntro">
              From soft cotton stocks to deep impressions and light-catching foil,
              every choice is considered for touch, tone and lasting impact.
            </p>
          </header>

          <div className="materialsShowcase">
            <figure className="stockGallery">
              <img
                src="/trueprint-hero.png"
                alt="Premium paper stocks, folded card and presentation box in warm neutral tones"
              />
              <span className="imageIndex" aria-hidden="true">01 / 04</span>
              <figcaption>
                <div>
                  <span>Paper library</span>
                  <strong>Stocks with substance</strong>
                </div>
                <p>Compare weight, grain, colour and finish before committing to print.</p>
              </figcaption>
            </figure>

            <div className="finishPanel">
              <div className="finishPanelHeading">
                <p>Finishing room</p>
                <h3>Details that reward a closer look.</h3>
              </div>

              <div className="finishList">
                <details className="finishItem" open>
                  <summary>
                    <span>01</span>
                    <strong>Foil stamping</strong>
                    <em>Metallic · pigment</em>
                    <i aria-hidden="true">+</i>
                  </summary>
                  <p>A crisp layer of foil adds controlled shine and contrast to type, marks and fine details.</p>
                </details>
                <details className="finishItem">
                  <summary>
                    <span>02</span>
                    <strong>Letterpress</strong>
                    <em>Deep · tactile</em>
                    <i aria-hidden="true">+</i>
                  </summary>
                  <p>A considered impression gives lettering and artwork a distinctive, crafted depth.</p>
                </details>
                <details className="finishItem">
                  <summary>
                    <span>03</span>
                    <strong>Emboss &amp; deboss</strong>
                    <em>Raised · recessed</em>
                    <i aria-hidden="true">+</i>
                  </summary>
                  <p>Sculpt the stock itself to create dimension without relying on ink or colour.</p>
                </details>
                <details className="finishItem">
                  <summary>
                    <span>04</span>
                    <strong>Edge finishing</strong>
                    <em>Painted · gilded</em>
                    <i aria-hidden="true">+</i>
                  </summary>
                  <p>Carry colour or metallic detail around the edge for an unexpected final accent.</p>
                </details>
              </div>

              <ArrowFillLink className="finishCta" href="#contact" label="Build your finish" />
            </div>
          </div>

          <div className="materialGuide" aria-label="Available paper stock families">
            <article>
              <span>01</span>
              <h3>Cotton</h3>
              <p>Soft touch · rich impression</p>
            </article>
            <article>
              <span>02</span>
              <h3>Uncoated</h3>
              <p>Natural grain · understated</p>
            </article>
            <article>
              <span>03</span>
              <h3>Recycled</h3>
              <p>Characterful · responsible</p>
            </article>
            <article>
              <span>04</span>
              <h3>Coloured</h3>
              <p>Deep tones · bold contrast</p>
            </article>
          </div>
        </section>

        <PrintReveal />

        <PrintExperiments />

        <section className="sourceSection" aria-labelledby="source-title">
          <span className="sourceOrb sourceOrbOne" aria-hidden="true" />
          <span className="sourceOrb sourceOrbTwo" aria-hidden="true" />

          <header className="sourceHeader">
            <p className="sectionLabel"><span>06</span> Beyond the catalogue</p>
            <h2 id="source-title">Can&apos;t find it?<br /><em>We&apos;ll source it.</em></h2>
            <p className="sourceIntro">
              A photo, a sketch, a half-formed thought—send it. Our network turns
              unusual requests into real, branded objects.
            </p>
          </header>

          <div className="sourceShowcase">
            <article className="sourceGlass">
              <div className="sourceBriefMeta">
                <span>Open brief / 001</span>
                <small>No product name needed</small>
              </div>

              <div className="sourceGlassHeading">
                <p>Start with anything</p>
                <h3>Give us the clue.<br />We&apos;ll find the object.</h3>
              </div>

              <div className="sourceInputs" aria-label="Ways to share an idea">
                <span>Photo</span>
                <span>Sketch</span>
                <span>Reference link</span>
                <span>Voice note</span>
              </div>

              <div className="sourceRoute" aria-label="Three-step sourcing route">
                <span><i>01</i> Share</span>
                <b aria-hidden="true" />
                <span><i>02</i> Source</span>
                <b aria-hidden="true" />
                <span><i>03</i> Make</span>
              </div>

              <p className="sourceGlassCopy">
                It does not need a product name or a finished specification. Show
                us what caught your eye and tell us what it needs to do.
              </p>

              <ArrowFillLink
                className="sourceButton"
                href="https://trueprint-brand-studio.harshwardensingh.chatgpt.site/#quote"
                label="Show us the idea"
              />

              <small>One unusual brief. One considered route to making it real.</small>
            </article>

            <article className="sourceFormPanel">
              <span className="sourceFormBadge">Sourced / shaped / finished</span>
              <SourceRequestForm />
            </article>
          </div>

          <div className="sourceRequestCloud" aria-label="Examples of unusual requests">
            <p>Things we can help make</p>
            <div>
              <span className="sourceRequestBright">Oddly-shaped award</span>
              <span>Custom board game</span>
              <span>Miniature mascot</span>
              <span>The thing you saw on Instagram</span>
            </div>
          </div>
        </section>

        <PrintProcess />

        <section className="diaryJourney homeJourney" aria-labelledby="making-flow-title">
          <span className="diaryJourneyGhost" aria-hidden="true">MAKE</span>
          <header className="diaryJourneyHeader">
            <p><span /> How a project moves</p>
            <h2 id="making-flow-title">Four clear moves.<br /><em>One thing worth holding.</em></h2>
            <p>
              A connected route keeps the idea, material and final result moving
              in the same direction from the first conversation to delivery.
            </p>
          </header>

          <div className="diaryJourneyPanel" aria-label="TruePrint four-step production process">
            <div className="diaryJourneyTrack" aria-hidden="true" />
            {makingJourney.map((step, index) => (
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

        <ProductVideoShowcase />

        <section className="possibilitySection" aria-labelledby="possibility-title">
          <header className="possibilityHeader">
            <p className="possibilityKicker">One studio. Every possibility.</p>
            <h2 id="possibility-title">Bring the idea.<br /><span>We&apos;ll make it tangible.</span></h2>
            <p>
              From a first business card to a complete launch system, TruePrint
              brings every printed piece together with precision.
            </p>
            <div className="possibilityActions">
              <ArrowFillLink className="possibilityPrimary" href="#contact" label="Start a project" />
              <a className="possibilitySecondary" href="#materials">
                Explore materials <ArrowIcon />
              </a>
            </div>
          </header>

          <div className="serviceRows" aria-label="TruePrint products and finishing services">
            {serviceRows.map((row, rowIndex) => (
              <div className={`serviceMarquee serviceMarquee${row.direction}`} key={row.direction}>
                <div className="serviceTrack">
                  {[0, 1].map((copy) => (
                    <div className="serviceGroup" aria-hidden={copy === 1 ? true : undefined} key={copy}>
                      {row.items.map((item) => (
                        <span className="serviceToken" key={`${rowIndex}-${copy}-${item.mark}`}>
                          <i className={`serviceMark serviceMark${item.tone}`} aria-hidden="true">{item.mark}</i>
                          <strong>{item.name}</strong>
                        </span>
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        <ClientStories />

        <footer className="siteFooter" id="about">
          <section className="closingCta" aria-labelledby="closing-title">
            <span className="closingGlow" aria-hidden="true" />
            <div className="closingGrid">
              <article className="closingGlass">
                <p className="closingKicker"><span /> Your next print project</p>
                <h2 id="closing-title">Make the next thing<br />worth holding.</h2>
                <p className="closingCopy">
                  Bring us the idea, the deadline or even the unfinished thought.
                  We&apos;ll shape the paper, colour and finish around what it needs to become.
                </p>
                <ArrowFillLink className="closingButton" href="#contact" label="Start a project" />
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
              <a className="footerBrand" href="#top" aria-label="TruePrint home">
                <span className="brandMark" aria-hidden="true">
                  <span />
                  <span />
                  <span />
                </span>
                <span>TruePrint</span>
              </a>
              <p>Premium print, precise colour and thoughtful finishing, made to be remembered.</p>
            </div>

            <nav className="footerColumn" aria-label="Print services">
              <p>Print</p>
              <a href="/categories">Diaries &amp; planners</a>
              <a href="/categories/visiting-cards">Business cards</a>
              <a href="#contact">Premium packaging</a>
              <a href="#contact">Books &amp; brochures</a>
              <a href="#contact">Invitations &amp; stationery</a>
            </nav>

            <nav className="footerColumn" aria-label="Finishing services">
              <p>Finish</p>
              <a href="#materials">Foil stamping</a>
              <a href="#materials">Letterpress</a>
              <a href="#materials">Emboss &amp; deboss</a>
              <a href="#materials">Edge finishing</a>
            </nav>

            <nav className="footerColumn" aria-label="TruePrint website links">
              <p>Studio</p>
              <a href="#projects">Selected work</a>
              <a href="#materials">Materials</a>
              <a href="#services">Services</a>
              <a href="#contact">Start a project</a>
            </nav>

            <div className="footerColumn footerConnect">
              <p>Connect</p>
              <a href="#contact">Request a quote</a>
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

            <div className="footerBottom">
              <span>TruePrint</span>
              <p>Ideas, made tangible.</p>
            </div>
          </div>
        </footer>
        <HomeWhatsApp />
      </section>
    </main>
  );
}
