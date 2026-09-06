"use client";

import BrandMark from "./brand-mark";

import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type CSSProperties,
} from "react";

const words = [
  "Production",
  "Creative",
  "Digital",
  "Media",
  "Technology",
  "Design",
  "Strategy",
  "Content",
] as const;

const effects = ["slide", "flip", "scramble", "wipe", "glitch", "blur", "stagger"] as const;
type Effect = (typeof effects)[number];

type WordState = {
  effect: Effect;
  key: number;
  text: string;
};

function AnimatedWord({ effect, text }: Pick<WordState, "effect" | "text">) {
  const [scrambledText, setScrambledText] = useState(text);

  useEffect(() => {
    if (effect !== "scramble") return;

    const pool = "ABCDEFGHIJKLMNOPQRSTUVWXYZ#$%&@*";
    let frame = 0;
    const timer = window.setInterval(() => {
      setScrambledText(
        [...text].map((character, index) => {
          if (character === " ") return " ";
          if (frame > index * 1.6 + 5) return character;
          return pool[Math.floor(Math.random() * pool.length)];
        }).join(""),
      );

      frame += 1;
      if (frame > text.length * 1.6 + 7) {
        window.clearInterval(timer);
        setScrambledText(text);
      }
    }, 32);

    return () => window.clearInterval(timer);
  }, [effect, text]);

  const renderedText = effect === "scramble" ? scrambledText : text;

  return (
    <span
      className={`navWord navWordFx${effect}`}
      data-text={text}
      aria-hidden="true"
    >
      {effect === "stagger"
        ? [...text].map((character, index) => (
            <span
              className="navWordCharacter"
              key={`${character}-${index}`}
              style={{ "--character-index": index } as CSSProperties}
            >
              {character === " " ? "\u00A0" : character}
            </span>
          ))
        : renderedText}
    </span>
  );
}

export default function AnimatedWordmark({ className = "", href = "#top" }: { className?: string; href?: string }) {
  const [current, setCurrent] = useState<WordState>({ effect: "slide", key: 0, text: words[0] });
  const [leaving, setLeaving] = useState<WordState | null>(null);
  const [rotatorWidth, setRotatorWidth] = useState(0);
  const measureRef = useRef<HTMLSpanElement>(null);
  const currentRef = useRef(current);
  const wordIndexRef = useRef(1);
  const effectIndexRef = useRef(1);
  const keyRef = useRef(1);
  const pausedRef = useRef(false);
  const reducedMotionRef = useRef(false);
  const leavingTimerRef = useRef<number | null>(null);

  const swap = useCallback(() => {
    if (reducedMotionRef.current) return;
    const next: WordState = {
      effect: effects[effectIndexRef.current % effects.length],
      key: keyRef.current,
      text: words[wordIndexRef.current % words.length],
    };

    wordIndexRef.current += 1;
    effectIndexRef.current += 1;
    keyRef.current += 1;

    setLeaving(currentRef.current);
    currentRef.current = next;
    setCurrent(next);

    if (leavingTimerRef.current) window.clearTimeout(leavingTimerRef.current);
    leavingTimerRef.current = window.setTimeout(() => setLeaving(null), 420);
  }, []);

  const measureCurrent = useCallback(() => {
    if (!measureRef.current) return;
    measureRef.current.textContent = current.text;
    setRotatorWidth(Math.ceil(measureRef.current.getBoundingClientRect().width) + 2);
  }, [current.text]);

  useLayoutEffect(() => {
    measureCurrent();
  }, [measureCurrent]);

  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updatePreference = () => {
      reducedMotionRef.current = preference.matches;
      if (preference.matches) setLeaving(null);
    };
    updatePreference();
    preference.addEventListener("change", updatePreference);
    let mounted = true;
    void document.fonts.ready.then(() => { if (mounted) measureCurrent(); });
    const timer = window.setInterval(() => {
      if (!pausedRef.current && !document.hidden) swap();
    }, 1500);

    window.addEventListener("resize", measureCurrent);
    return () => {
      mounted = false;
      preference.removeEventListener("change", updatePreference);
      window.clearInterval(timer);
      if (leavingTimerRef.current) window.clearTimeout(leavingTimerRef.current);
      window.removeEventListener("resize", measureCurrent);
    };
  }, [measureCurrent, swap]);

  return (
    <a
      className={`navWordmark ${className}`.trim()}
      href={href}
      aria-label="TruePrint"
      title="Click to skip · hover to pause"
      onClick={swap}
      onMouseEnter={() => { pausedRef.current = true; }}
      onMouseLeave={() => { pausedRef.current = false; }}
      onFocus={() => { pausedRef.current = true; }}
      onBlur={() => { pausedRef.current = false; }}
    >
      <BrandMark />
      <span className="navWordmarkBrand">True<span>Print</span></span>
      <span className="navWordmarkDot">.</span>
      <span className="navWordmarkRotator" style={{ width: rotatorWidth || undefined }}>
        <span aria-hidden="true">&#8203;</span>
        <span className="navWordmarkMask" aria-hidden="true">
        {leaving ? (
          <span className="navWord navWordLeaving" aria-hidden="true" key={`leaving-${leaving.key}`}>
            {leaving.text}
          </span>
        ) : null}
        <AnimatedWord effect={current.effect} text={current.text} key={current.key} />
        </span>
      </span>
      <span className="navWordmarkMeasure" ref={measureRef} aria-hidden="true" />
    </a>
  );
}
