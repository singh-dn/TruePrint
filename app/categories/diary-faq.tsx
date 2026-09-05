"use client";

import { useState } from "react";

const faqGroups = [
  {
    label: "General",
    items: [
      { question: "Can the cover and inside pages both be customised?", answer: "Yes. Cover material, colour, branding, page layout and useful internal sections can be planned together as one diary system." },
      { question: "Which diary formats can I choose from?", answer: "The collection includes A5, B5 and custom formats, with executive hardcover, lay-flat planner and thread-sewn notebook routes." },
      { question: "Can the diary be dated or undated?", answer: "Yes. Dated, undated and fully custom page structures are available, including ruled, dotted and plain page styles." },
    ],
  },
  {
    label: "Materials",
    items: [
      { question: "Which cover materials are available?", answer: "Routes include buckram cloth, recycled covers, soft-touch stocks and other suitable materials selected around the intended use and finish." },
      { question: "Can paper colour and writing feel be chosen?", answer: "Yes. Paper shade, weight and surface can be considered alongside the page layout so the finished diary feels comfortable to use every day." },
      { question: "Which binding styles can lie flat?", answer: "Thread-sewn and selected lay-flat constructions are available when an open, stable writing surface is important to the brief." },
    ],
  },
  {
    label: "Branding",
    items: [
      { question: "Which branding and finishing options are available?", answer: "Depending on the construction, diaries can use print, foil, deboss, matched ribbons, elastic closures and gift-box presentation." },
      { question: "Can colours be matched to our brand?", answer: "Yes. Cover, ribbon, elastic, print and foil colours can be coordinated to create a considered brand system rather than a single applied logo." },
      { question: "Can every diary be personalised?", answer: "Names, teams or event details may be added where the selected production route and quantity support individual personalisation." },
    ],
  },
  {
    label: "Ordering",
    items: [
      { question: "Can I bring an unusual diary idea?", answer: "Absolutely. A photo, sketch, planning system or unfinished thought is enough for us to begin shaping a custom route with you." },
      { question: "How do I start a diary project?", answer: "Choose the closest diary route or send us your idea. We can then organise the format, materials, artwork and finishing into a clear direction." },
      { question: "When will I receive a production timeline?", answer: "Once the format, quantity, artwork and finishes are clear, the TruePrint team can provide a timeline shaped around your exact project." },
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
        <h2 id="diary-faq-title">Before your diary<br /><em>takes shape.</em></h2>
        <p>Useful answers about formats, custom pages, finishing and how a project begins.</p>
        <a href="/#contact">Still have a question? <span>↗</span></a>
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
