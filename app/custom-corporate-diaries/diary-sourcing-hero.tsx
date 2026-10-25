import { ArrowRight, BookOpen } from "lucide-react";
import SiteImage from "../site-image";
import "./diary-sourcing-hero.css";

// The curves, repeating lettering and paper pattern are vector geometry, not a screenshot.
function BannerPattern() {
  const randomAt = (index: number) => {
    const value = Math.sin(index * 12.9898 + 78.233) * 43758.5453;
    return value - Math.floor(value);
  };
  const speckles = Array.from({ length: 350 }, (_, index) => (
    <circle key={index} cx={randomAt(index * 4 + 1) * 251} cy={randomAt(index * 4 + 2) * 251} r={0.7 + randomAt(index * 4 + 3) * 2.3} opacity={0.1 + randomAt(index * 4 + 4) * 0.27} />
  ));
  const headingLetters = Array.from("CUSTOM DIARIES");
  const advances = [65, 65, 60, 55, 70, 75, 25, 65, 25, 65, 65, 25, 60, 60];
  let headingOffset = 0;
  const curvedHeading = headingLetters.map((letter, index) => {
    const angle = -17.5 + headingOffset * 0.975 / 1030 * 180 / Math.PI;
    const radians = angle * Math.PI / 180;
    const x = 1470 + 1030 * Math.sin(radians);
    const y = 1135 - 1030 * Math.cos(radians);
    headingOffset += advances[index] - 1;
    return <text key={index} transform={`translate(${x.toFixed(2)} ${y.toFixed(2)}) rotate(${angle.toFixed(2)})`}>{letter}</text>;
  });
  return (
    <svg className="diarySourceHeroPattern" viewBox="0 0 1949 807" preserveAspectRatio="xMidYMid slice" aria-hidden="true" focusable="false">
      <defs>
        <linearGradient id="diary-source-blue" x1="0" y1="0" x2="1" y2="1">
          <stop stopColor="#104aaa" /><stop offset="0.48" stopColor="#08409e" /><stop offset="1" stopColor="#06398f" />
        </linearGradient>
        <radialGradient id="diary-source-wash" cx="0.12" cy="0.87" r="0.95">
          <stop stopColor="#eaf7f9" /><stop offset="0.37" stopColor="#f8fbfe" /><stop offset="1" stopColor="#fafbfe" />
        </radialGradient>
        <linearGradient id="diary-source-ribbon" x1="0" y1="0" x2="1" y2="0.7">
          <stop stopColor="#d9e9ff" /><stop offset="0.65" stopColor="#e8f2ff" /><stop offset="1" stopColor="#f7faff" />
        </linearGradient>
        <linearGradient id="diary-source-lower-ribbon" x1="0" y1="0.7" x2="1" y2="0.7">
          <stop stopColor="#d4e6ff" /><stop offset="0.55" stopColor="#e7f1ff" /><stop offset="1" stopColor="#f6faff" stopOpacity="0.1" />
        </linearGradient>
        <linearGradient id="diary-source-ink" x1="0" y1="0" x2="0.75" y2="1">
          <stop stopColor="#4586d3" /><stop offset="1" stopColor="#2965b8" />
        </linearGradient>
        <pattern id="diary-source-paper" width="251" height="251" patternUnits="userSpaceOnUse" patternTransform="rotate(-17)">
          <g fill="#ccd5e0">{speckles}</g>
        </pattern>
        <path id="diary-source-paper-shape" d="M590 807C631 639 701 468 830 365C1002 224 1226 119 1441 120C1646 118 1833 194 1949 291V807Z" />
        <clipPath id="diary-source-paper-clip"><use href="#diary-source-paper-shape" /></clipPath>
        <filter id="diary-source-paper-shadow" x="-10%" y="-20%" width="120%" height="140%">
          <feDropShadow dx="-1" dy="-3" stdDeviation="3" floodColor="#132438" floodOpacity="0.16" />
        </filter>
      </defs>
      <path fill="url(#diary-source-blue)" d="M0 0H1949V807H0Z" />
      <g className="diarySourceHeroBlueWords" fill="none" stroke="#a6c7f8" strokeWidth="1" opacity="0.53">
        <text transform="translate(676 194) rotate(-18) scale(0.85 1)" fontSize="105" textLength="755" lengthAdjust="spacingAndGlyphs">CUSTOM DIARIES</text>
        <text transform="translate(758 319) rotate(-21) scale(0.845 1)" fontSize="119" textLength="398" lengthAdjust="spacingAndGlyphs" opacity="0.5">DIARIES</text>
      </g>
      <g className="diarySourceHeroBlueWords" fontSize="90" fill="#adcbf5" opacity="0.95">{curvedHeading}</g>
      <path fill="url(#diary-source-wash)" d="M0 0H528C586 184 685 288 830 365L1070 807H143C85 780 39 748 0 714Z" />
      <path fill="url(#diary-source-ribbon)" d="M432 0H528C586 184 685 288 830 365L767 429C592 335 484 176 432 0Z" />
      <g fill="none" stroke="#7faaff" strokeWidth="1" opacity="0.77">
        <circle cx="508" cy="-24" r="115" /><circle cx="508" cy="-24" r="88" opacity="0.5" />
      </g>
      <use href="#diary-source-paper-shape" fill="#fefefe" filter="url(#diary-source-paper-shadow)" />
      <path d="M532 807C634 693 750 590 911 521C814 628 787 718 829 807Z" fill="url(#diary-source-lower-ribbon)" />
      <g clipPath="url(#diary-source-paper-clip)">
        <path fill="url(#diary-source-paper)" d="M550 100H1949V807H550Z" />
        <g className="diarySourceHeroPaperWords" fill="none" stroke="#6496dc" strokeWidth="1.05">
          <text transform="translate(851 458) rotate(-20) scale(0.77 1)" fontSize="101" textLength="705" lengthAdjust="spacingAndGlyphs">CUSTOM DIARIES</text>
          <text transform="translate(956 517) rotate(-20) scale(0.94 1)" fontSize="105" textLength="429" lengthAdjust="spacingAndGlyphs">CUSTOM</text>
          <text transform="translate(1340 367) rotate(-20) scale(0.76 1)" fontSize="103" textLength="333" lengthAdjust="spacingAndGlyphs" fill="url(#diary-source-ink)" stroke="none">DIARIES</text>
          <text transform="translate(1495 384) rotate(-17) scale(0.98 1)" fontSize="106" textLength="460" lengthAdjust="spacingAndGlyphs" opacity="0.57">CUSTOM</text>
          <text transform="translate(838 711) rotate(-13.2) scale(0.92 1)" fontSize="200" textLength="825" lengthAdjust="spacingAndGlyphs" fill="url(#diary-source-ink)" stroke="none">CUSTOM</text>
          <text transform="translate(1162 824) rotate(-17) scale(0.85 1)" fontSize="206" textLength="787" lengthAdjust="spacingAndGlyphs" fill="url(#diary-source-ink)" stroke="none">DIARIES</text>
          <text transform="translate(783 885) rotate(-20) scale(0.96 1)" fontSize="104" textLength="427" lengthAdjust="spacingAndGlyphs">CUSTOM</text>
          <text transform="translate(875 962) rotate(-20) scale(0.95 1)" fontSize="103" textLength="408" lengthAdjust="spacingAndGlyphs" opacity="0.7">CUSTOM</text>
          <text transform="translate(1581 791) rotate(-17) scale(0.82 1)" fontSize="108" textLength="409" lengthAdjust="spacingAndGlyphs">CUSTOM</text>
        </g>
      </g>
    </svg>
  );
}

export default function DiarySourcingHero() {
  return (
    <section className="diarySourceHero" aria-labelledby="diary-source-hero-title">
      <BannerPattern />
      <div className="diarySourceHeroCopy">
        <p className="diarySourceHeroPill"><BookOpen aria-hidden="true" />Your reference. Our sourcing.</p>
        <h1 id="diary-source-hero-title"><span>If you can<br />show it,</span><em>we can help<br />source it.</em></h1>
        <svg className="diarySourceHeroUnderline" viewBox="0 0 220 25" aria-hidden="true"><path d="M8 17C57 5 129 1 213 6C159 5 74 11 13 23C5 25 1 20 8 17Z" fill="currentColor" /></svg>
        <div className="diarySourceHeroDetail">
          <span className="diarySourceHeroNumber" aria-hidden="true">03</span>
          <span className="diarySourceHeroRule" aria-hidden="true" />
          <div><h2>Custom-built diary</h2><p>Share a reference and we will explore materials,<br className="diarySourceHeroDesktopBreak" /> construction and branding to create the right fit.</p></div>
        </div>
        <a className="diarySourceHeroCta" href="#diary-catalogue">Share Your Reference<span><ArrowRight aria-hidden="true" /></span></a>
      </div>
      <figure className="diarySourceHeroProduct">
        <SiteImage src="/images/diary-reference-notebooks.webp" srcSet="/images/diary-reference-notebooks-768.webp 768w, /images/diary-reference-notebooks.webp 1536w" sizes="(max-width: 900px) 90vw, 46vw" width={1536} height={1024} alt="Supplied branding reference: cream, navy, brown and green notebooks with sample logo placement" loading="eager" fetchPriority="high" draggable="false" />
      </figure>
    </section>
  );
}
