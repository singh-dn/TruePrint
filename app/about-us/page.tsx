import type { Metadata } from "next";
import Link from "next/link";
import AnimatedWordmark from "../animated-wordmark";
import ScrollHeader from "../scroll-header";
import HomeWhatsApp from "../home-whatsapp";
import { ArrowFillLink } from "../arrow-fill-button";
import { CategoryMegaMenu, MobileCategoryMenu, ProductSearch } from "../nav-discovery";
import { buildPageMetadata, categorySeo, SITE_URL } from "../seo";
import AboutFooter from "./about-footer";
import AboutMotion from "./about-motion";
import IndiaNetwork from "./india-network";
import "./about.css";

const description = "Meet TruePrint, your sourcing partner for custom branded merchandise, corporate gifting and printing. From the first idea to branding, packing and delivery.";
export const metadata: Metadata = buildPageMetadata({ title: "About TruePrint | Your Partner for Everything Branded", description, path: "/about-us" });

const principles = [
  { title: "Your brief comes first.", copy: "The right product starts with the people receiving it. We consider the purpose, quantity, budget and timeline before suggesting a direction." },
  { title: "Details make the difference.", copy: "Material, colour, logo placement, finish and packaging all contribute to how a product feels. We help you bring those choices together." },
  { title: "Clarity at every step.", copy: "A clear shortlist, a reviewed mockup and agreed specifications give everyone a shared direction before production begins." },
] as const;
const journey = [
  { title: "Tell us the idea.", copy: "A brief, a reference image or simply a problem to solve. Share the quantity, budget and delivery location." },
  { title: "Find the right fit.", copy: "Explore suitable products, materials and branding options. We help narrow the choices around your requirement." },
  { title: "Make it yours.", copy: "Review the artwork, product specifications and mockup. Confirm the details before production moves ahead." },
  { title: "Bring it together.", copy: "We coordinate production, quality checks, packaging and dispatch against the agreed project plan." },
] as const;
const categoryLabels = ["Diaries & notebooks", "Visiting cards", "Branded pens", "Employee joining kits", "Tech products", "Bags & backpacks", "Bottles & drinkware", "T-shirts & apparel"];
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
          <div className="aboutHeroMarquee" aria-hidden="true"><div>{[0, 1].map(copy => <span key={copy}>Everything branded. Worth keeping.&nbsp;</span>)}</div></div>
          <div className="aboutHeroContent">
            <p className="aboutEyebrow">( ABOUT TRUEPRINT )</p>
            <h1 id="about-title">Let&apos;s make something<br />worth keeping.</h1>
            <p className="aboutHeroCopy">One partner for sourcing, customization and delivery.<br />Your idea. Your brand. Brought together.</p>
            <ArrowFillLink className="aboutHeroButton" href="/contact-trueprint" label="Start the conversation" />
            <a className="aboutHeroStoryLink" href="#our-story">Meet the people behind the products <span aria-hidden="true">↓</span></a>
          </div>
        </section>

        <section className="aboutStory aboutSection" id="our-story" aria-labelledby="about-story-title">
          <div className="aboutSectionIntro aboutReveal"><h2 id="about-story-title">Many possibilities. One point of contact.</h2></div>
          <div className="aboutStoryColumns aboutReveal">
            <h3 className="aboutLead">Our mission — make everything branded simpler for your business.</h3>
            <div className="aboutBodyCopy"><p>TruePrint is a B2B sourcing partner for corporate merchandise, gifting and printing. We help businesses find the right products, adapt them to their brand and coordinate the steps that bring an order together.</p><p>From a single category to a complete employee welcome kit, our role is to make the choices feel manageable. You bring the purpose. We help with the product, material, branding and presentation.</p><p>And if your idea goes beyond the catalogue, that is a starting point too. Share a reference, a photograph or a sample, and we will explore a suitable sourcing route.</p></div>
          </div>
          <div className="aboutFacts aboutReveal" aria-label="How TruePrint works">
            <article className="aboutFactMain"><span className="aboutPill">OUR STARTING POINT</span><strong>{String(Object.keys(categorySeo).length).padStart(2, "0")}</strong><h3>Core product categories.<br />Room for your next idea.</h3><p>Explore our collections or share something different for us to source.</p><span className="aboutFactLines" aria-hidden="true" /></article>
            <article className="aboutFactWide"><div><span className="aboutEyebrow">FROM BRIEF TO DELIVERY</span><strong>04 <small>clear stages</small></strong></div><div className="aboutStepsGraphic" aria-hidden="true"><i /><i /><i /><i /></div></article>
            <article className="aboutFactSmall"><strong>01</strong><p>Connected brief.<br />Coordinated execution.</p></article>
            <article className="aboutFactNote"><span aria-hidden="true">✳</span><div><h3>Built around you.</h3><p>Your brand, your use case,<br />your requirements.</p></div></article>
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
          <header className="aboutSectionIntro aboutReveal"><p className="aboutEyebrow">02 / WHAT MATTERS TO US</p><h2 id="about-approach-title">Thought in every choice.<br /><em>Care in every detail.</em></h2></header>
          <div className="aboutPrinciples">{principles.map((item, i) => <article className="aboutPrinciple aboutReveal" key={item.title}><span>{String(i + 1).padStart(2, "0")}</span><h3>{item.title}</h3><p>{item.copy}</p></article>)}</div>
        </section>

        <section className="aboutOffer aboutSection" aria-labelledby="about-offer-title">
          <header className="aboutSectionIntro aboutReveal"><p className="aboutEyebrow">03 / WHAT WE BRING TOGETHER</p><h2 id="about-offer-title">For the everyday.<br /><em>And the big moments.</em></h2></header>
          <div className="aboutOfferGrid aboutReveal"><p className="aboutLead">A notebook on a desk.<br />A T-shirt at an event.<br />A welcome on day one.</p><div className="aboutBodyCopy"><p>We source products for the moments when a business becomes something you can hold. Employee onboarding, client gifting, events and everyday work all call for a different mix.</p><p>Choose a category to explore, then shape the details around your audience. Products, branding and packaging can be coordinated within one brief.</p></div></div>
          <div className="aboutCategoryLinks aboutReveal">{Object.entries(categorySeo).map(([key, category], i) => <Link key={key} href={category.path}><span>{String(i + 1).padStart(2, "0")}</span>{categoryLabels[i]}<span aria-hidden="true">↗</span></Link>)}</div>
        </section>

        <section className="aboutNetwork aboutSection" aria-labelledby="about-network-title">
          <header className="aboutSectionIntro aboutReveal"><p className="aboutEyebrow">04 / CONNECTING THE DOTS</p><h2 id="about-network-title">One brief.<br /><em>Across India.</em></h2><p className="aboutNetworkIntro">For teams in one city or plans that span the country, we help coordinate products, branding and dispatch around your required locations.</p></header>
          <div className="aboutNetworkGrid"><IndiaNetwork /><div className="aboutNetworkText aboutReveal"><span className="aboutPill">LOCAL NEEDS. A CONNECTED APPROACH.</span><h3>Your brand belongs<br />where your people are.</h3><p>Share where your products need to go. We consider destinations, quantities, packaging and timelines as part of the brief, so delivery is planned alongside the product.</p><ul><li>Employee kits for distributed teams</li><li>Branded merchandise for regional events</li><li>Corporate gifting across locations</li></ul><ArrowFillLink href="/contact-trueprint" label="Discuss your locations" /><small>Map connections are illustrative, not office locations. Delivery availability and timelines are confirmed for each order.</small></div></div>
        </section>

        <section className="aboutJourney aboutSection" aria-labelledby="about-journey-title"><header className="aboutSectionIntro aboutReveal"><p className="aboutEyebrow">05 / HOW WE WORK</p><h2 id="about-journey-title">Clear from the start.<br /><em>Considered to the finish.</em></h2></header><div className="aboutJourneyGrid">{journey.map((item, i) => <article className="aboutReveal" key={item.title}><span className="aboutJourneyNumber">0{i + 1}</span><h3>{item.title}</h3><p>{item.copy}</p></article>)}</div></section>
        <AboutFooter /><HomeWhatsApp />
      </div>
    </main>
  );
}
