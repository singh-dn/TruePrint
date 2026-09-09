import { ArrowFillLink } from "./arrow-fill-button";

const questions = [
  {
    question: "What kind of products can TruePrint supply?",
    answer: "TruePrint can source and customise tens of thousands of products across printing, gifting, merchandise, apparel, tech, drinkware, awards, kits, packaging and more. If you cannot find what you need in our catalogue, share a reference, image or description and we will try to source it for you.",
  },
  {
    question: "What if the product I need is not listed on your website?",
    answer: "That is exactly what our sourcing team is for. Send us a photo, product link, sketch or even a rough idea, and we can explore suitable suppliers and customisation options to find the closest match for your requirement.",
  },
  {
    question: "Can you customise products with our company branding?",
    answer: "Yes. Depending on the product, we can support logo printing, engraving, embroidery, embossing, debossing, foil printing, custom packaging, colour customisation and other branding options.",
  },
  {
    question: "Can you help us choose the right product?",
    answer: "Yes. Share your requirement, audience, quantity, budget and occasion, and our team can help shortlist suitable products and branding options for your project.",
  },
  {
    question: "How long does it take to complete an order?",
    answer: "Timelines depend on the product and customisation involved. Ready products available with our suppliers may be dispatched within a day or two, while highly customised, specially manufactured or imported products may take a few weeks.",
  },
  {
    question: "Can you handle bulk corporate requirements?",
    answer: "Yes. TruePrint is built for B2B and corporate requirements, including employee onboarding, events, conferences, gifting, promotional campaigns, merchandise and large-scale branded orders.",
  },
];

export default function ProjectFaq() {
  return (
    <section className="projectFaq" aria-labelledby="project-faq-title">
      <span className="projectFaqGhost" aria-hidden="true">ANSWERS</span>
      <div className="projectFaqGrid">
        <header className="projectFaqHeader">
          <p className="projectFaqKicker">A little clarity</p>
          <h2 id="project-faq-title">Before you begin.<br /><em>A few clear answers.</em></h2>
          <p>From sourcing and pricing to customization and delivery, here is what you may want to know first.</p>
          <ArrowFillLink href="/contact-trueprint" label="Talk to expert" />
        </header>
        <div className="projectFaqList">
          {questions.map((item, index) => (
            <details className="projectFaqItem" key={item.question}>
              <summary>
                <span className="projectFaqNumber">{String(index + 1).padStart(2, "0")}</span>
                <span>{item.question}</span>
                <span className="projectFaqToggle" aria-hidden="true" />
              </summary>
              <p>{item.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
