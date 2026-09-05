"use client";

import { useCallback, useEffect, useRef, useState } from "react";

const clamp = (value: number, min = 0, max = 1) => Math.min(max, Math.max(min, value));

const smoothstep = (start: number, end: number, value: number) => {
  const progress = clamp((value - start) / (end - start));
  return progress * progress * (3 - 2 * progress);
};

const REVEAL_VIDEO_SRC =
  "https://res.cloudinary.com/dsuwzuaxp/video/upload/q_auto:eco,w_1440/856381-hd_1920_1080_30fps_gsq11b.mp4";

const PlayIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path d="m8 5 11 7-11 7V5Z" fill="currentColor" stroke="none" />
  </svg>
);

const PauseIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path d="M8 5v14M16 5v14" />
  </svg>
);

const VolumeIcon = ({ muted }: { muted: boolean }) => (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path d="M5 10v4h4l5 4V6l-5 4H5Z" />
    {muted ? <path d="m18 9 4 6m0-6-4 6" /> : <path d="M17 9.5c1.7 1.4 1.7 3.6 0 5m2.5-7.5c3.3 2.8 3.3 7.2 0 10" />}
  </svg>
);

export default function PrintReveal() {
  const sectionRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const maskRef = useRef<SVGSVGElement>(null);
  const maskTextRef = useRef<SVGTextElement>(null);
  const labelRef = useRef<HTMLParagraphElement>(null);
  const detailsRef = useRef<HTMLDivElement>(null);
  const controlsRef = useRef<HTMLDivElement>(null);
  const manuallyPausedRef = useRef(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [viewBox, setViewBox] = useState({ width: 1200, height: 675, fontSize: 188 });

  const togglePlay = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;

    if (video.paused) {
      manuallyPausedRef.current = false;
      video.play().then(() => setIsPlaying(true)).catch(() => setIsPlaying(false));
    } else {
      manuallyPausedRef.current = true;
      video.pause();
      setIsPlaying(false);
    }
  }, []);

  const toggleMute = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = !video.muted;
    setIsMuted(video.muted);
  }, []);

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;

    const updateViewBox = () => {
      const width = Math.max(stage.clientWidth, 1);
      const height = Math.max(stage.clientHeight, 1);
      const baseWidth = 1200;
      const baseHeight = Math.round(baseWidth / (width / height));
      const portrait = width / height < 0.75;

      setViewBox({
        width: baseWidth,
        height: baseHeight,
        fontSize: portrait ? 158 : 188,
      });
    };

    updateViewBox();
    const observer = typeof ResizeObserver !== "undefined" ? new ResizeObserver(updateViewBox) : null;
    observer?.observe(stage);
    window.addEventListener("resize", updateViewBox);

    return () => {
      observer?.disconnect();
      window.removeEventListener("resize", updateViewBox);
    };
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    const stage = stageRef.current;
    const mask = maskRef.current;
    const maskText = maskTextRef.current;
    const label = labelRef.current;
    const details = detailsRef.current;
    const controls = controlsRef.current;
    if (!section || !stage || !mask || !maskText || !label || !details || !controls) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let frame = 0;

    const applyProgress = (progress: number) => {
      const width = stage.clientWidth;
      const zoomTarget = width < 640 ? 22 : 18;
      const easedZoom = progress * progress * (2.2 - 1.2 * progress);
      const maskScale = 1 + easedZoom * zoomTarget;
      const maskOpacity = 1 - smoothstep(0.78, 0.92, progress);
      const labelExit = smoothstep(0.04, 0.24, progress);
      const detailReveal = smoothstep(0.73, 0.9, progress);
      const maskBounds = mask.viewBox.baseVal;
      const maskCenterX = maskBounds.x + maskBounds.width / 2;
      const maskCenterY = maskBounds.y + maskBounds.height / 2;

      maskText.setAttribute(
        "transform",
        `translate(${maskCenterX} ${maskCenterY}) scale(${maskScale.toFixed(3)}) translate(${-maskCenterX} ${-maskCenterY})`,
      );
      mask.style.opacity = maskOpacity.toFixed(3);
      mask.style.visibility = maskOpacity <= 0.001 ? "hidden" : "visible";
      label.style.opacity = (1 - labelExit).toFixed(3);
      label.style.transform = `translate3d(0, ${(-74 * labelExit).toFixed(2)}px, 0)`;
      details.style.opacity = detailReveal.toFixed(3);
      details.style.transform = `translate3d(0, ${(18 * (1 - detailReveal)).toFixed(2)}px, 0)`;
      controls.style.opacity = detailReveal.toFixed(3);
      controls.style.transform = `translate3d(0, ${(18 * (1 - detailReveal)).toFixed(2)}px, 0)`;
      stage.dataset.revealed = detailReveal > 0.92 ? "true" : "false";
    };

    const render = () => {
      frame = 0;
      const rect = section.getBoundingClientRect();
      const distance = Math.max(section.offsetHeight - window.innerHeight, 1);
      applyProgress(reducedMotion ? 1 : clamp(-rect.top / distance));
    };

    const scheduleRender = () => {
      if (!frame) frame = window.requestAnimationFrame(render);
    };

    render();
    window.addEventListener("scroll", scheduleRender, { passive: true });
    window.addEventListener("resize", scheduleRender);

    return () => {
      window.removeEventListener("scroll", scheduleRender);
      window.removeEventListener("resize", scheduleRender);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    const video = videoRef.current;
    if (!section || !video) return;

    const loadVideo = () => {
      if (!video.src) {
        video.src = REVEAL_VIDEO_SRC;
        video.load();
      }
    };

    if (typeof IntersectionObserver === "undefined") {
      loadVideo();
      video.play().catch(() => setIsPlaying(false));
      return;
    }

    let inRange = false;

    const syncPlayback = () => {
      const shouldPlay = inRange && !document.hidden && !manuallyPausedRef.current;
      if (shouldPlay) {
        video.play().catch(() => setIsPlaying(false));
      } else {
        video.pause();
      }
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        inRange = entry.isIntersecting;
        if (inRange) loadVideo();
        syncPlayback();
      },
      { rootMargin: "160px 0px", threshold: 0.01 },
    );

    observer.observe(section);
    document.addEventListener("visibilitychange", syncPlayback);

    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", syncPlayback);
    };
  }, []);

  return (
    <section className="printRevealSection" ref={sectionRef} aria-labelledby="print-reveal-title">
      <div className="printRevealStage" ref={stageRef}>
        <h2 className="srOnly" id="print-reveal-title">TruePrint in motion</h2>

        <video
          ref={videoRef}
          className="printRevealVideo"
          muted={isMuted}
          loop
          playsInline
          preload="metadata"
          poster="/trueprint-packaging.webp"
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
          aria-label="TruePrint visual film"
        />

        <p className="printRevealLabel" ref={labelRef} aria-hidden="true" />

        <svg
          ref={maskRef}
          className="printRevealMask"
          viewBox={`0 0 ${viewBox.width} ${viewBox.height}`}
          preserveAspectRatio="xMidYMid slice"
          aria-hidden="true"
        >
          <defs>
            <mask id="trueprint-video-mask" maskUnits="userSpaceOnUse" x="0" y="0" width={viewBox.width} height={viewBox.height}>
              <rect width={viewBox.width} height={viewBox.height} fill="white" />
              <text
                ref={maskTextRef}
                x={viewBox.width / 2}
                y={viewBox.height / 2}
                textAnchor="middle"
                dominantBaseline="central"
                fill="black"
                fontWeight="850"
                fontSize={viewBox.fontSize}
                letterSpacing="-0.065em"
                fontFamily="Avenir Next, Avenir, Segoe UI, Helvetica, Arial, sans-serif"
              >
                TRUEPRINT
              </text>
            </mask>
          </defs>
          <rect
            width={viewBox.width}
            height={viewBox.height}
            fill="#ffffff"
            mask="url(#trueprint-video-mask)"
          />
        </svg>

        <div className="printRevealDetails" ref={detailsRef}>
          <p><span>04</span> Precision in motion</p>
          <small>Scroll through the word. See the idea become tangible.</small>
        </div>

        <div className="printRevealControls" ref={controlsRef} aria-label="Video controls">
          <button type="button" onClick={togglePlay} aria-label={isPlaying ? "Pause video" : "Play video"}>
            {isPlaying ? <PauseIcon /> : <PlayIcon />}
          </button>
          <button type="button" onClick={toggleMute} aria-label={isMuted ? "Unmute video" : "Mute video"}>
            <VolumeIcon muted={isMuted} />
          </button>
        </div>
      </div>
    </section>
  );
}
