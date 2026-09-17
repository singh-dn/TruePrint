import type { Metadata } from "next";
import Link from "next/link";
import AnimatedWordmark from "../animated-wordmark";
import ScrollHeader from "../scroll-header";
import HomeWhatsApp from "../home-whatsapp";
import { ArrowFillLink } from "../arrow-fill-button";
import { CategoryMegaMenu, MobileCategoryMenu, ProductSearch } from "../nav-discovery";
import { buildPageMetadata, SITE_URL } from "../seo";
import AboutFooter from "./about-footer";
import AboutMotion from "./about-motion";
import IndiaNetwork from "./india-network";
import "./about.css";

const description = "Meet TruePrint, your partner for custom branded merchandise, corporate gifting and printing in India. We coordinate sourcing, customization and fulfilment.";
export const metadata: Metadata = {
  ...buildPageMetadata({ title: "About TruePrint | Branded Merchandise & Corporate Gifting", description, path: "/about-us" }),
  keywords: ["TruePrint", "thetrueprint", "about TruePrint", "custom branded merchandise India", "corporate gifting India", "branded product sourcing", "corporate printing services", "custom branded diaries", "custom branded T-shirts", "custom branded bottles", "employee joining kits", "print everything"],
};

const principles = [
  { title: "Understand before we source.", copy: "We begin with the purpose, quantity, budget and timeline so the products we suggest actually fit the requirement." },
  { title: "Branding should feel considered.", copy: "Material, colour, logo placement, finish and packaging all matter. We help bring those choices together coherently." },
  { title: "Keep the process clear.", copy: "From shortlisted options and mockups to production and delivery, we keep each stage aligned before moving forward." },
] as const;
const showcaseLogos = [
  { name: "Delhi Police", image: "/Delhi-Police-Logo-optimized.webp" },
  { name: "Haryana Police", image: "/haryana-police-logo-optimized.webp" },
  { name: "FCRF Summit", image: "/FCRF 2026 logo.png" },
  { name: "Binary Global", image: "/binary.svg" },
  { name: "4n6 Care", image: "/4n6-logo (1)-optimized.webp" },
  { name: "NetApp", image: "/Netapp_logo-optimized.webp" },
];

export default function AboutPage() {
  return (
    <main className="pageShell aboutPageShell">
      <div className="siteCard aboutPage" id="top">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context": "https://schema.org", "@type": "AboutPage", "@id": `${SITE_URL}/about-us#page`,
          url: `${SITE_URL}/about-us`, name: "About TruePrint", description,
          mainEntity: { "@id": `${SITE_URL}/#organization` }, isPartOf: { "@id": `${SITE_URL}/#website` }, inLanguage: "en-IN",
        }).replace(/</g, "\\u003c") }} />
        <div className="headerFrame">
          <header className="siteHeader" data-site-header>
            <AnimatedWordmark />
            <nav className="desktopNav" aria-label="Primary navigation">
              <Link href="/">Home</Link><CategoryMegaMenu /><Link className="active" aria-current="page" href="/about-us">About</Link><Link href="/contact-trueprint">Contact</Link>
            </nav>
            <div className="headerTools"><ProductSearch /><ArrowFillLink className="talkExpertButton" href="/contact-trueprint" label="Talk to expert" /></div>
            <details className="mobileMenu">
              <summary aria-label="Open navigation"><span /><span /><span /></summary>
              <nav aria-label="Mobile navigation">
                <ProductSearch variant="mobile" />
                <div className="mobileMenuLinks">
                  <Link href="/">Home</Link><MobileCategoryMenu /><Link href="/#services">Services</Link><Link href="/#materials">Materials</Link><Link href="/about-us" aria-current="page">About</Link><Link href="/contact-trueprint">Contact</Link>
                </div>
                <ArrowFillLink className="mobileTalkButton" href="/contact-trueprint" label="Talk to expert" />
              </nav>
            </details>
          </header>
        </div>
        <ScrollHeader /><AboutMotion />

        <section className="aboutHero" aria-labelledby="about-title">
          <div className="aboutHeroMarquee" aria-hidden="true"><div>{[0, 1].map(copy => <span key={copy}>Everything branded&nbsp;</span>)}</div></div>
          <div className="aboutHeroContent">
            <p className="aboutEyebrow">( ABOUT TRUEPRINT )</p>
            <h1 id="about-title">One partner.<br />Endless branded possibilities.</h1>
            <p className="aboutHeroCopy">We work across sourcing, customization and fulfilment to help businesses create branded products that feel considered and complete.</p>
            <ArrowFillLink className="aboutHeroButton" href="/contact-trueprint" label="Start a project" />
          </div>
        </section>

        <section className="aboutStory aboutSection" id="our-story" aria-labelledby="about-story-title">
          <div className="aboutSectionIntro aboutReveal"><h2 id="about-story-title">Everything branded. One team to handle it.</h2></div>
          <div className="aboutStoryColumns aboutReveal">
            <h3 className="aboutLead">Our mission — take the complexity out of branded sourcing, customization and delivery.</h3>
            <div className="aboutBodyCopy"><p>TruePrint helps businesses manage branded requirements across merchandise, gifting, printing and custom sourcing. We work as a single point of contact to help companies find suitable products, customize them to their identity and coordinate the steps needed to complete the order.</p><p>That could mean a single line of products or a complete branded requirement for a company, team or event. From joining kits, stationery and apparel to drinkware, tech products, event branding and beyond, we help bring structure to what often feels scattered.</p><p>Because we operate as both a sourcing partner and a branding partner, we help with more than procurement. We help with the product, the look, the fit, the customization and the route to delivery — while taking much of the operational headache off your team. And if what you need is not already in our catalogue, that works too. If your brand can go on it, we can explore how to source it, adapt it and bring it together.</p></div>
          </div>
          <div className="aboutFacts aboutReveal" aria-label="How TruePrint works">
            <article className="aboutFactMain"><strong>50k+</strong><h3>Catalogue products.<br />And room for custom sourcing.</h3><p>Explore our collections or share something beyond the catalogue for us to source.</p><span className="aboutFactLines" aria-hidden="true" /></article>
            <article className="aboutFactWide"><div><strong>04 <small>clear stages</small></strong></div><div className="aboutStepsGraphic" aria-hidden="true"><i /><i /><i /><i /></div></article>
            <article className="aboutFactSmall"><strong>01</strong><p>Single point of contact.<br />Coordinated execution.</p></article>
            <article className="aboutFactNote"><span aria-hidden="true">✳</span><div><h3>Built around your brand.</h3><p>Your requirement, your use case,<br />your identity.</p></div></article>
          </div>
        </section>

        <section className="aboutLogoShowcase" aria-label="Professional affiliations showcase">
          <p className="aboutEyebrow">PROFESSIONALS ACROSS ORGANISATIONS</p>
          <div className="aboutLogoRails">
            {[showcaseLogos, [...showcaseLogos.slice(3), ...showcaseLogos.slice(0, 3)]].map((row, index) => <div className={`aboutLogoRail aboutLogoRail${index}`} key={index}><div className="aboutLogoTrack">{[0, 1].map(copy => <div className="aboutLogoGroup" key={copy} aria-hidden={copy === 1 || index === 1 ? true : undefined}>{row.map(brand => <span className="aboutLogoItem" key={brand.name}><img src={brand.image} alt={brand.name} loading="lazy" decoding="async" /></span>)}</div>)}</div></div>)}
          </div>
          <p className="aboutLogoNote">Organisations are shown as employers or affiliations of individual professionals who have engaged with TruePrint. No partnership or endorsement is implied.</p>
        </section>

        <section className="aboutApproach aboutSection" aria-labelledby="about-approach-title">
          <span className="aboutGhost" aria-hidden="true">INTENT</span>
          <header className="aboutSectionIntro aboutReveal"><p className="aboutEyebrow">02 / WHAT MATTERS TO US</p><h2 id="about-approach-title">The brief comes first.<br /><em>The details follow through.</em></h2></header>
          <div className="aboutPrinciples">{principles.map((item, i) => <article className="aboutPrinciple aboutReveal" key={item.title}><span>{String(i + 1).padStart(2, "0")}</span><h3>{item.title}</h3><p>{item.copy}</p></article>)}</div>
        </section>

        <section className="aboutNetwork aboutSection" aria-labelledby="about-network-title">
          <header className="aboutSectionIntro aboutReveal"><p className="aboutEyebrow">04 / CONNECTING THE DOTS</p><h2 id="about-network-title">One partner.<br /><em>Across India.</em></h2><p className="aboutNetworkIntro">From a single destination to requirements spread across the country, we help coordinate branded products and deliveries through one connected process.</p></header>
          <div className="aboutNetworkGrid"><IndiaNetwork /><div className="aboutNetworkText aboutReveal"><span className="aboutPill">NATIONWIDE NEEDS. ONE CONNECTED ROUTE.</span><h3>One brand.<br />Many destinations.</h3><p>Share the locations, quantities and timeline. We help coordinate production, packing and dispatch so the requirement stays consistent across cities.</p><ul><li>Employee onboarding across cities</li><li>Event merchandise across regions</li><li>Corporate gifts across India</li></ul><ArrowFillLink href="/contact-trueprint" label="Start a Project" /><small>Map routes are illustrative only. Serviceability, dispatch schedules and delivery timelines are confirmed against each requirement.</small></div></div>
        </section>

        <AboutFooter /><HomeWhatsApp />
      </div>
    </main>
  );
}
