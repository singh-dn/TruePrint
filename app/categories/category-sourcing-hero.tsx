import type { CSSProperties } from "react";
import { ArrowRight, BookOpen } from "lucide-react";
import SiteImage from "../site-image";
import { categoryBannerThemes, type CategoryBannerKey, type CategoryBannerTheme } from "./category-banner-config";
import "./category-sourcing-hero.css";

// The curves, repeating lettering and paper pattern are vector geometry, not a screenshot.
function BannerPattern({ theme }: { theme: CategoryBannerTheme }) {
  const randomAt = (index: number) => {
    const value = Math.sin(index * 12.9898 + 78.233) * 43758.5453;
    return value - Math.floor(value);
  };
  const speckles = Array.from({ length: 350 }, (_, index) => (
    <circle key={index} cx={randomAt(index * 4 + 1) * 251} cy={randomAt(index * 4 + 2) * 251} r={0.7 + randomAt(index * 4 + 3) * 2.3} opacity={0.1 + randomAt(index * 4 + 4) * 0.27} />
  ));
  const headingLetters = Array.from(theme.patternLabel);
  const advances = headingLetters.map((letter) => letter === " " ? 28 : "IM".includes(letter) ? (letter === "I" ? 28 : 80) : 65);
  const totalAdvance = advances.reduce((sum, value) => sum + value, 0);
  const headingScale = 760 / totalAdvance;
  let headingOffset = 0;
  const curvedHeading = headingLetters.map((letter, index) => {
    const angle = -17.5 + headingOffset * headingScale / 1030 * 180 / Math.PI;
    const radians = angle * Math.PI / 180;
    const x = 1470 + 1030 * Math.sin(radians);
    const y = 1135 - 1030 * Math.cos(radians);
    headingOffset += advances[index];
    return <text key={index} transform={`translate(${x.toFixed(2)} ${y.toFixed(2)}) rotate(${angle.toFixed(2)})`}>{letter}</text>;
  });
  return (
    <svg className="categorySourceHeroPattern" viewBox="0 0 1949 807" preserveAspectRatio="none" aria-hidden="true" focusable="false">
      <defs>
        <linearGradient id="category-source-blue" x1="0" y1="0" x2="1" y2="1">
          <stop stopColor="var(--banner-start)" /><stop offset="0.48" stopColor="var(--banner-mid)" /><stop offset="1" stopColor="var(--banner-end)" />
        </linearGradient>
        <radialGradient id="category-source-wash" cx="0.12" cy="0.87" r="0.95">
          <stop stopColor="var(--banner-pale)" /><stop offset="0.37" stopColor="var(--banner-pale)" /><stop offset="1" stopColor="#fafcfd" />
        </radialGradient>
        <linearGradient id="category-source-ribbon" x1="0" y1="0" x2="1" y2="0.7">
          <stop stopColor="var(--banner-light)" /><stop offset="0.65" stopColor="var(--banner-pale)" /><stop offset="1" stopColor="var(--banner-pale)" />
        </linearGradient>
        <linearGradient id="category-source-lower-ribbon" x1="0" y1="0.7" x2="1" y2="0.7">
          <stop stopColor="var(--banner-light)" /><stop offset="0.55" stopColor="var(--banner-pale)" /><stop offset="1" stopColor="var(--banner-pale)" stopOpacity="0.1" />
        </linearGradient>
        <linearGradient id="category-source-ink" x1="0" y1="0" x2="0.75" y2="1">
          <stop stopColor="var(--banner-accent)" /><stop offset="1" stopColor="var(--banner-mid)" />
        </linearGradient>
        <pattern id="category-source-paper" width="251" height="251" patternUnits="userSpaceOnUse" patternTransform="rotate(-17)">
          <g fill="#ccd5e0">{speckles}</g>
        </pattern>
        <path id="category-source-paper-shape" d="M590 807C631 639 701 468 830 365C1002 224 1226 119 1441 120C1646 118 1833 194 1949 291V807Z" />
        <clipPath id="category-source-paper-clip"><use href="#category-source-paper-shape" /></clipPath>
        <filter id="category-source-paper-shadow" x="-10%" y="-20%" width="120%" height="140%">
          <feDropShadow dx="-1" dy="-3" stdDeviation="3" floodColor="#132438" floodOpacity="0.16" />
        </filter>
      </defs>
      <path fill="url(#category-source-blue)" d="M0 0H1949V807H0Z" />
      <g className="categorySourceHeroBlueWords" fill="none" stroke="var(--banner-light)" strokeWidth="1" opacity="0.53">
        <text transform="translate(676 194) rotate(-18) scale(0.85 1)" fontSize={105 * 13 / theme.patternLabel.length}>{theme.patternLabel}</text>
        <text transform="translate(758 319) rotate(-21) scale(0.845 1)" fontSize={Math.min(280, 119 * 7 / theme.patternWord.length)} opacity="0.5">{theme.patternWord}</text>
      </g>
      <g className="categorySourceHeroBlueWords" fontSize={Math.min(105, 90 * headingScale)} fill="var(--banner-heading)" opacity="0.95">{curvedHeading}</g>
      <path fill="url(#category-source-wash)" d="M0 0H528C586 184 685 288 830 365L1070 807H143C85 780 39 748 0 714Z" />
      <path fill="url(#category-source-ribbon)" d="M432 0H528C586 184 685 288 830 365L767 429C592 335 484 176 432 0Z" />
      <g fill="none" stroke="var(--banner-accent)" strokeWidth="1" opacity="0.77">
        <circle cx="508" cy="-24" r="115" /><circle cx="508" cy="-24" r="88" opacity="0.5" />
      </g>
      <use href="#category-source-paper-shape" fill="#fefefe" filter="url(#category-source-paper-shadow)" />
      <path d="M532 807C634 693 750 590 911 521C814 628 787 718 829 807Z" fill="url(#category-source-lower-ribbon)" />
      <g clipPath="url(#category-source-paper-clip)">
        <path fill="url(#category-source-paper)" d="M550 100H1949V807H550Z" />
        <g className="categorySourceHeroPaperWords" fill="none" stroke="var(--banner-accent)" strokeWidth="1.05">
          <text transform="translate(851 458) rotate(-20) scale(0.77 1)" fontSize={101 * 13 / theme.patternLabel.length}>{theme.patternLabel}</text>
          <text transform="translate(956 517) rotate(-20) scale(0.94 1)" fontSize="105">CUSTOM</text>
          <text transform="translate(1340 367) rotate(-20) scale(0.76 1)" fontSize={Math.min(280, 103 * 7 / theme.patternWord.length)} fill="url(#category-source-ink)" stroke="none">{theme.patternWord}</text>
          <text transform="translate(1495 384) rotate(-17) scale(0.98 1)" fontSize="106" opacity="0.57">CUSTOM</text>
          <text transform="translate(838 711) rotate(-13.2) scale(0.92 1)" fontSize="200" fill="url(#category-source-ink)" stroke="none">CUSTOM</text>
          <text transform="translate(1162 824) rotate(-17) scale(0.85 1)" fontSize={Math.min(280, 206 * 7 / theme.patternWord.length)} fill="url(#category-source-ink)" stroke="none">{theme.patternWord}</text>
          <text transform="translate(783 885) rotate(-20) scale(0.96 1)" fontSize="104">CUSTOM</text>
          <text transform="translate(875 962) rotate(-20) scale(0.95 1)" fontSize="103" opacity="0.7">CUSTOM</text>
          <text transform="translate(1581 791) rotate(-17) scale(0.82 1)" fontSize="108">CUSTOM</text>
        </g>
      </g>
    </svg>
  );
}

export default function CategorySourcingHero({ category }: { category: CategoryBannerKey }) {
  const theme = categoryBannerThemes[category];
  const style = Object.fromEntries(Object.entries(theme.colours).map(([key, value]) => [`--banner-${key}`, value])) as CSSProperties;
  return (
    <section className={`categorySourceHero categorySourceHero--${category}`} style={style} aria-labelledby="category-source-hero-title">
      <BannerPattern theme={theme} />
      <div className="categorySourceHeroCopy">
        <p className="categorySourceHeroPill"><BookOpen aria-hidden="true" />{theme.pill}</p>
        <h1 id="category-source-hero-title"><span>{theme.title[0]}<br />{theme.title[1]}</span><em>{theme.emphasis[0]}<br />{theme.emphasis[1]}</em></h1>
        <svg className="categorySourceHeroUnderline" viewBox="0 0 220 25" aria-hidden="true"><path d="M8 17C57 5 129 1 213 6C159 5 74 11 13 23C5 25 1 20 8 17Z" fill="currentColor" /></svg>
        <div className="categorySourceHeroDetail">
          <span className="categorySourceHeroNumber" aria-hidden="true">01</span>
          <span className="categorySourceHeroRule" aria-hidden="true" />
          <div><h2>{theme.detailTitle}</h2><p>{theme.description}</p></div>
        </div>
        <a className="categorySourceHeroCta" href="#diary-catalogue">{theme.cta}<span><ArrowRight aria-hidden="true" /></span></a>
      </div>
      <figure className="categorySourceHeroProduct">
        <SiteImage src={`/images/category-banners/${category}.webp`} srcSet={`/images/category-banners/${category}-768.webp 768w, /images/category-banners/${category}.webp 1536w`} sizes="(max-width: 900px) 90vw, 46vw" width={1536} height={1024} alt={theme.imageAlt} loading="eager" fetchPriority="high" draggable="false" />
      </figure>
    </section>
  );
}
