import SiteImage from "../site-image";
import AnimatedWordmark from "../animated-wordmark";
import FooterProductIndex from "../footer-product-index";
import { ArrowFillLink } from "../arrow-fill-button";

export default function AboutFooter() {
  return (
        <footer className="siteFooter" id="about-footer">
          <section className="closingCta" aria-labelledby="closing-title">
            <span className="closingGlow" aria-hidden="true" />
            <div className="closingGrid">
              <article className="closingGlass">
                <p className="closingKicker"><span /> READY WHEN YOU ARE</p>
                <h2 id="closing-title">Let&apos;s make something worth<br />putting your name on.</h2>
                <p className="closingCopy">
                  Share the idea, quantity or reference. We&apos;ll help take it from the first conversation to the finished product.
                </p>
                <ArrowFillLink className="closingButton" href="/contact-trueprint" label="Start a project" />
              </article>

              <figure className="closingImage">
                <SiteImage
                  src="/all.webp"
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
              <AnimatedWordmark className="footerBrand" />
              <p>TruePrint at thetrueprint.com — custom branded products, corporate gifting and printing, made to be remembered.</p>
            </div>

            <nav className="footerColumn" aria-label="Print services">
              <p>Print</p>
              <a href="/custom-corporate-diaries">Diaries &amp; planners</a>
              <a href="/custom-visiting-cards">Business cards</a>
              <a href="/contact-trueprint">Premium packaging</a>
              <a href="/contact-trueprint">Books &amp; brochures</a>
              <a href="/contact-trueprint">Invitations &amp; stationery</a>
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
              <a href="/about-us" aria-current="page">About TruePrint</a>
              <a href="/#projects">Selected work</a>
              <a href="/#materials">Materials</a>
              <a href="/#services">Services</a>
              <a href="/contact-trueprint">Start a project</a>
            </nav>

            <div className="footerColumn footerConnect">
              <p>Connect</p>
              <a href="/contact-trueprint">Request a quote</a>
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
              <AnimatedWordmark />
              <p>Ideas, made tangible.</p>
            </div>
          </div>
        </footer>
  );
}

