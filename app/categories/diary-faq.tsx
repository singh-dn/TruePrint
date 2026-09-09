"use client";

import { useState } from "react";
import { ArrowFillLink } from "../arrow-fill-button";

const faqGroups = [
  {
    label: "General",
    items: [
      { question: "What kind of products can TruePrint supply?", answer: "TruePrint can source and customise tens of thousands of products across printing, gifting, merchandise, apparel, tech, drinkware, awards, kits, packaging and more. If you cannot find what you need in our catalogue, share a reference, image or description and we will try to source it for you." },

      { question: "What if the product I need is not listed on your website?", answer: "That is exactly what our sourcing team is for. Share a photo, product link, sketch or even a rough idea, and we can explore suitable suppliers and customisation options to find the closest possible match for your requirement." },

      { question: "Can you customise products with our company branding?", answer: "Yes. Depending on the product, we can support logo printing, engraving, embroidery, embossing, debossing, foil printing, custom packaging, colour customisation and other branding options." },

      { question: "Can you help us choose the right product?", answer: "Yes. Tell us your requirement, audience, quantity, budget and occasion, and our team can help shortlist suitable products and branding options." },

      { question: "How long does it take to complete an order?", answer: "Timelines depend on the product and customisation involved. Ready products available with our suppliers may be dispatched within a day or two, while highly customised, specially manufactured or imported products may take a few weeks." },

      { question: "Can you handle bulk corporate requirements?", answer: "Yes. TruePrint is built primarily for B2B and corporate requirements, including employee onboarding, events, conferences, gifting, promotional campaigns, merchandise and large-scale branded orders." },
    ],
  },
  {
    label: "Payments & Orders",
    items: [
      { question: "How does payment work?", answer: "We generally require an advance payment before sourcing, customisation or production begins. The exact payment terms depend on the size, nature and complexity of the order." },

      { question: "Do you offer discounts for full advance payment?", answer: "Yes. Depending on the order, we may offer better commercial terms when the complete payment is made before delivery. Our team will share the applicable pricing while finalising the quotation." },

      { question: "Will you accept an order if you are unsure it can be fulfilled?", answer: "No. We prefer to confirm feasibility, availability and timelines before committing to an order. If we believe a requirement cannot be fulfilled reliably, we will tell you before accepting the order or payment." },

      { question: "When does production begin?", answer: "Production normally begins once the product, quantity, pricing, artwork or mockup and applicable advance payment have been confirmed." },

      { question: "Can pricing change after I receive a quotation?", answer: "A quotation is generally based on the quantity, specifications, availability and delivery requirements shared at that time. Any change in product, quantity, customisation, timeline or shipping requirement may affect the final price." },

      { question: "Are taxes included in the quotation?", answer: "The quotation will clearly mention whether applicable taxes and delivery charges are included or additional, so you know the complete commercial terms before confirming the order." },
    ],
  },
  {
    label: "Delivery & Fulfilment",
    items: [
      { question: "How long does delivery usually take?", answer: "Once the product and mockup are finalised, delivery can range from a few days to a few weeks depending on the product, quantity, customisation, production process and destination." },

      { question: "What is the minimum order quantity?", answer: "MOQ varies by product and customisation method. As a general rule, many products can begin from around 10 units, while certain products may require a higher minimum quantity." },

      { question: "Do you deliver across India?", answer: "Yes. We can arrange delivery across India, subject to serviceability, product type and order size." },

      { question: "Can you deliver to multiple locations?", answer: "Yes. For corporate requirements, we can explore multi-location or individual delivery depending on the quantity, product and shipping requirements." },

      { question: "Can you handle urgent orders?", answer: "Where the product is readily available and the required customisation can be completed quickly, we may be able to support urgent timelines. Share your deadline with our team and we will confirm feasibility before committing." },

      { question: "How is the delivery timeline confirmed?", answer: "The estimated dispatch and delivery timeline is shared once the product, quantity, customisation, artwork and destination have been finalised." },

      { question: "What if my order requires importing or special manufacturing?", answer: "Specially manufactured or imported products naturally require additional lead time. Our team will communicate the estimated timeline before the order is confirmed and keep you informed through the process." },
    ],
  },
] as const;

export default function DiaryFaq() {
  const [activeGroup, setActiveGroup] = useState(0);
  const group = faqGroups[activeGroup];

  return (
    <section className="diaryFaq" aria-labelledby="diary-faq-title">
      <span className="diaryFaqGhost" aria-hidden="true">FAQ</span>
      <header className="diaryFaqHeader">
        <p><span /> Questions, answered</p>
        <h2 id="diary-faq-title">Before you begin.<br /><em>A few clear answers.</em></h2>
        <p>From sourcing and pricing to customization and delivery, here is what you may want to know first.</p>
        <ArrowFillLink href="/#contact" label="Still have a question?" />
      </header>

      <div className="diaryFaqWorkspace">
        <div className="diaryFaqTabs" role="tablist" aria-label="Frequently asked question categories">
          {faqGroups.map((faqGroup, index) => (
            <button
              key={faqGroup.label}
              type="button"
              role="tab"
              id={`diary-faq-tab-${index}`}
              aria-controls="diary-faq-panel"
              aria-selected={activeGroup === index}
              className={activeGroup === index ? "isActive" : ""}
              onClick={() => setActiveGroup(index)}
            >
              {faqGroup.label}
            </button>
          ))}
        </div>

        <div className="diaryFaqList" id="diary-faq-panel" role="tabpanel" aria-labelledby={`diary-faq-tab-${activeGroup}`} key={group.label}>
          {group.items.map((item, index) => (
            <details key={item.question} open={index === 0}>
              <summary>
                <strong>{item.question}</strong>
                <i aria-hidden="true" />
              </summary>
              <p>{item.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
