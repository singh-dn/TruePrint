import { ArrowFillLink } from "./arrow-fill-button";

const questions = [
  {
    question: "What can I customise with TruePrint?",
    answer: "Explore branded stationery, apparel, bags, drinkware, tech products, joining kits and corporate gifts. Share your requirements so we can discuss suitable products and branding options.",
  },
  {
    question: "Can you source something outside the catalogue?",
    answer: "Yes. Send us a reference image, a product link or a description of your idea. We can explore sourcing options and help you find a suitable match for your brief.",
  },
  {
    question: "What details do you need to prepare a quote?",
    answer: "Tell us the product, quantity, branding requirements, delivery location and preferred timeline. A reference image and an approximate budget help us shortlist relevant options.",
  },
  {
    question: "Is there a minimum order quantity?",
    answer: "Minimum quantities depend on the product and the customisation involved. Share the quantity you have in mind, and we can discuss the options available for your project.",
  },
  {
    question: "Will I see the design before production?",
    answer: "The product and branding mockup are reviewed with you before production begins. This is the stage to confirm the artwork, placement and finishing details.",
  },
  {
    question: "How long will my order take?",
    answer: "Timelines depend on the selected products, quantity, branding and delivery location. Share your deadline at the start so the team can confirm a suitable production and delivery schedule.",
  },
];

export default function ProjectFaq() {
  return (
    <section className="projectFaq" aria-labelledby="project-faq-title">
      <span className="projectFaqGhost" aria-hidden="true">ANSWERS</span>
      <div className="projectFaqGrid">
        <header className="projectFaqHeader">
          <p className="projectFaqKicker">A little clarity</p>
          <h2 id="project-faq-title">Good questions.<br /><em>Clear answers.</em></h2>
          <p>From the first idea to the final delivery, here are a few things worth knowing.</p>
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
