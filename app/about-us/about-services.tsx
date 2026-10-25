import { isCategoryVisible } from "../category-visibility";
import Link from "next/link";
import "./about-services.css";
import { Backpack, CupSoda, Gift, Headphones, IdCard, NotebookPen, PenLine, Shirt } from "lucide-react";

const collections = [
  { label: "Visiting Cards", href: "/custom-visiting-cards", Icon: IdCard },
  { label: "Diaries", href: "/custom-corporate-diaries", Icon: NotebookPen },
  { label: "Pens", href: "/custom-branded-pens", Icon: PenLine },
  { label: "Joining Kits", href: "/custom-employee-joining-kits", Icon: Gift },
  { label: "Tech Products", href: "/custom-corporate-tech-products", Icon: Headphones },
  { label: "Bags", href: "/custom-corporate-bags", Icon: Backpack },
  { label: "Drinkware", href: "/custom-corporate-drinkware", Icon: CupSoda },
  { label: "Apparel", href: "/custom-corporate-t-shirts", Icon: Shirt },
] as const;

export default function AboutServices() {
  return (
    <section className="aboutEverything" aria-labelledby="about-everything-title">
      <span className="aboutEverythingTear aboutEverythingTearTop" aria-hidden="true"><i /><svg viewBox="0 0 280 220" fill="none" preserveAspectRatio="none"><path d="M 0,206 Q 10,186 16,172 Q 28,162 26,146 Q 38,136 50,124 Q 66,116 78,102 Q 94,100 106,88 Q 124,86 140,72 Q 164,68 178,54 Q 198,48 218,34 Q 240,28 262,14 Q 272,8 280,0 L 280,12 Q 258,26 238,40 Q 214,50 198,60 Q 176,70 156,76 Q 136,86 116,96 Q 100,104 82,118 Q 64,128 50,142 Q 36,152 22,170 Q 10,180 0,218 Z" fill="#fff" /></svg></span>
      <span className="aboutEverythingTear aboutEverythingTearBottom" aria-hidden="true"><i /><svg viewBox="0 0 380 240" fill="none" preserveAspectRatio="none"><path d="M 0,240 Q 20,222 36,216 Q 50,212 68,204 Q 86,198 104,186 Q 126,178 144,164 Q 166,154 186,142 Q 208,132 228,116 Q 252,106 274,88 Q 296,76 318,58 Q 338,44 356,24 Q 368,12 380,4 L 380,18 Q 364,34 344,52 Q 324,72 304,88 Q 280,106 258,118 Q 234,136 212,146 Q 190,160 172,170 Q 150,182 128,194 Q 110,204 90,212 Q 72,218 54,226 Q 36,232 20,240 Z" fill="#fff" /></svg></span>
      <span className="aboutEverythingDots aboutEverythingDotsLeft" aria-hidden="true" />
      <span className="aboutEverythingDots aboutEverythingDotsRight" aria-hidden="true" />
      <svg className="aboutEverythingScribble aboutEverythingScribbleTop" viewBox="0 0 220 130" fill="none" aria-hidden="true"><path d="M18 110C72 49 205-7 179 20S28 121 62 121 209 51 206 42" /></svg>
      <svg className="aboutEverythingScribble aboutEverythingScribbleBottom" viewBox="0 0 160 90" fill="none" aria-hidden="true"><path d="M 8,76 C 36,52 68,30 114,24 M 88,24 C 62,42 24,64 16,78 C 30,78 62,62 80,54 M 42,66 L 70,76" /></svg>
      <header className="aboutEverythingHeading">
        <svg className="aboutEverythingHeadingBurst" viewBox="0 0 50 50" fill="none" aria-hidden="true"><path d="M12 36L3 30M18 26L9 12M28 20L26 4" stroke="currentColor" strokeWidth="4.2" strokeLinecap="round" /></svg>
        <h2 id="about-everything-title"><span className="aboutEverythingBecause">BECAUSE</span><span className="aboutEverythingLead">our team can handle</span><strong>Everything</strong></h2>
        <svg className="aboutEverythingUnderline" viewBox="0 0 220 18" fill="none" aria-hidden="true"><path d="M8 9C60 4 140 5 212 11" stroke="currentColor" strokeWidth="5" strokeLinecap="round" /></svg>
        <svg className="aboutEverythingTrail aboutEverythingTrailLeft" viewBox="0 0 160 110" fill="none" aria-hidden="true"><path d="M145 28C120 4 85 2 62 18C36 36 32 70 54 94C58 98 62 102 64 106" /><path className="aboutEverythingTrailTip" d="M54 98L65 108L68 96" /></svg>
        <svg className="aboutEverythingTrail aboutEverythingTrailRight" viewBox="0 0 160 110" fill="none" aria-hidden="true"><path d="M145 28C120 4 85 2 62 18C36 36 32 70 54 94C58 98 62 102 64 106" /><path className="aboutEverythingTrailTip" d="M54 98L65 108L68 96" /></svg>
      </header>
      <nav className="aboutEverythingOptions" aria-label="Explore TruePrint collections">
        {collections.map(({ label, href, Icon }, index) => isCategoryVisible(href) && (
          <Link className={`aboutEverythingOption aboutEverythingOption${index}`} key={href} href={href}>
            <span className="aboutEverythingLabel">{label}</span>
            <span className="aboutEverythingSticker" aria-hidden="true"><Icon strokeWidth={1.65} /><i className="aboutEverythingSpark" /></span>
          </Link>
        ))}
      </nav>
    </section>
  );
}
