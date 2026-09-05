import type { Metadata } from "next";
import type { CSSProperties } from "react";
import AnimatedWordmark from "../animated-wordmark";
import FooterProductIndex from "../footer-product-index";
import { CategoryMegaMenu, MobileCategoryMenu, ProductSearch } from "../nav-discovery";
import ScrollHeader from "../scroll-header";
import { ArrowFillLink } from "../arrow-fill-button";
import { buildPageMetadata, SITE_URL } from "../seo";
import ContactEnquiryForm from "./contact-enquiry-form";

export const metadata: Metadata = buildPageMetadata({
  title: "Contact TruePrint | Start Your Custom Print Project",
  description: "Contact TruePrint for custom printing, branded merchandise, corporate gifting and product sourcing. Share your requirement with our team.",
  path: "/contact",
});

const contactJourney = [
  { number: "01", icon: "●", title: "Share the brief", copy: "Tell us what it is for, the quantity, deadline and any idea already taking shape." },
  { number: "02", icon: "✎", title: "Shape the route", copy: "We connect format, material, construction and budget into one clear production plan." },
  { number: "03", icon: "✓", title: "Proof and make", copy: "Review the details, approve the route and let our team control production and finishing." },
  { number: "04", icon: "◆", title: "Check and deliver", copy: "Every piece is inspected, organised and packed to arrive ready for its moment." },
] as const;

export default function ContactPage() {
  return (
    <main className="pageShell contactPageShell">
      <section className="siteCard contactPage" id="top" aria-label="Contact TruePrint">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "ContactPage",
              "@id": `${SITE_URL}/contact#contact-page`,
              url: `${SITE_URL}/contact`,
              name: "Contact TruePrint",
              description: "Start a custom printing, branded merchandise or corporate gifting project with TruePrint.",
              mainEntity: { "@id": `${SITE_URL}/#organization` },
              inLanguage: "en-IN",
            }).replace(/</g, "\\u003c"),
          }}
        />
        <div className="headerFrame">
          <header className="siteHeader" data-site-header>
            <AnimatedWordmark />

            <nav className="desktopNav" aria-label="Primary navigation">
              <a href="/">Home</a>
              <CategoryMegaMenu />
              <a href="/#services">Services</a>
              <a href="/#materials">Materials</a>
              <a href="/#about">About</a>
              <a className="active" href="#contact-form">Contact</a>
            </nav>

            <div className="headerTools">
              <ProductSearch />
              <ArrowFillLink className="talkExpertButton" href="#contact-form" label="Talk to expert" />
            </div>

            <details className="mobileMenu">
              <summary aria-label="Open navigation"><span /><span /><span /></summary>
              <nav aria-label="Mobile navigation">
                <ProductSearch variant="mobile" />
                <div className="mobileMenuLinks">
                  <a href="/">Home</a>
                  <MobileCategoryMenu />
                  <a href="/#services">Services</a>
                  <a href="/#materials">Materials</a>
                  <a href="/#about">About</a>
                  <a href="#contact-form">Contact</a>
                </div>
                <ArrowFillLink className="mobileTalkButton" href="#contact-form" label="Talk to expert" />
              </nav>
            </details>
          </header>
        </div>
        <ScrollHeader />
        <div className="headerRule" />

        <section className="contactHero" id="contact-form" aria-labelledby="contact-page-title">
          <span className="contactHeroGhost" aria-hidden="true">CONTACT</span>
          <span className="contactHeroGlow contactHeroGlowOne" aria-hidden="true" />
          <span className="contactHeroGlow contactHeroGlowTwo" aria-hidden="true" />

          <div className="contactHeroGrid">
            <article className="contactHeroCopy">
              <p className="contactEyebrow"><span /> Begin a project</p>
              <h1 id="contact-page-title">Let&apos;s make<br />something <em>worth holding.</em></h1>
              <p>
                Tell us what you&apos;re planning, even if the idea is still taking shape.
                Our team will help connect the right product, material, finish and timeline.
              </p>
              <ArrowFillLink href="#enquiry-fields" label="Share your requirement" />
            </article>

            <div id="enquiry-fields">
              <ContactEnquiryForm />
            </div>
          </div>
        </section>

        <section className="diaryJourney contactJourney" aria-labelledby="contact-journey-title">
          <span className="diaryJourneyGhost" aria-hidden="true">MAKE</span>
          <header className="diaryJourneyHeader">
            <p><span /> How a project moves</p>
            <h2 id="contact-journey-title">Four clear<br />moves. <em>One thing<br />worth holding.</em></h2>
            <p>A connected route keeps the idea, material and final result moving in the same direction from the first conversation to delivery.</p>
          </header>

          <div className="diaryJourneyPanel" aria-label="TruePrint project journey">
            <div className="diaryJourneyTrack" aria-hidden="true" />
            {contactJourney.map((step, index) => (
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

        <footer className="siteFooter contactSiteFooter" id="about">
          <section className="closingCta" aria-labelledby="contact-closing-title">
            <span className="closingGlow" aria-hidden="true" />
            <div className="closingGrid">
              <article className="closingGlass">
                <p className="closingKicker"><span /> Your next print project</p>
                <h2 id="contact-closing-title">Make the next thing<br />worth holding.</h2>
                <p className="closingCopy">Bring us the idea, the deadline or even the unfinished thought. We&apos;ll shape the paper, colour and finish around what it needs to become.</p>
                <ArrowFillLink className="closingButton" href="#contact-form" label="Start a project" />
              </article>

              <figure className="closingImage">
                <img src="/trueprint-packaging.webp" alt="Premium printed packaging arranged in a tactile brand collection" loading="lazy" decoding="async" />
                <figcaption><span>Made tangible</span><small>Packaging · stationery · editorial</small></figcaption>
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
                <a href="#contact-form">Premium packaging</a>
                <a href="#contact-form">Books &amp; brochures</a>
                <a href="#contact-form">Invitations &amp; stationery</a>
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
                <a href="#contact-form">Start a project</a>
              </nav>

              <div className="footerColumn footerConnect">
                <p>Connect</p>
                <a href="#contact-form">Request a quote</a>
                <a href="#top">Back to top</a>
                <div className="footerSocials" aria-label="Social channels"><span aria-label="Instagram">ig</span><span aria-label="LinkedIn">in</span><span aria-label="X">x</span></div>
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
