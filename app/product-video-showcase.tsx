"use client";

import SiteImage from "./site-image";


import { useEffect, useRef, useState } from "react";

// Replace each entry’s src independently with its final product video URL.

const productVideos = [
  {
    id: "print-craft",
    number: "01",
    title: "Print craft",
    detail: "Texture, colour and finishing",
    poster: "/trueprint-editorial.webp",
    src: "/videos/print-craft-hd.mp4",
  },
  {
    id: "diaries",
    number: "02",
    title: "Diaries",
    detail: "Covers, pages and details",
    poster: "/trueprint-diaries.jpeg",
    src: "/videos/diaries-hd.mp4",
  },
  {
    id: "joining-kits",
    number: "03",
    title: "Joining kits",
    detail: "Useful products, made cohesive",
    poster: "/trueprint-joining-kits.jpeg",
    src: "/videos/joining-kits-hd.mp4",
  },
  {
    id: "packaging",
    number: "04",
    title: "Packaging",
    detail: "Presentation from every angle",
    poster: "/trueprint-packaging.webp",
    src: "/videos/packaging-hd.mp4",
  },
] as const;

export default function ProductVideoShowcase() {
  const sectionRef = useRef<HTMLElement>(null);
  const [loadVideo, setLoadVideo] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const activeVideo = productVideos[activeIndex];

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    if (typeof IntersectionObserver === "undefined") {
      setLoadVideo(true);
      return;
    }
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setLoadVideo(true);
        observer.disconnect();
      }
    }, { rootMargin: "400px 0px" });
    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="productVideoSection" aria-labelledby="product-video-title">
      <span className="productVideoGhost" aria-hidden="true">FILMS</span>

      <header className="productVideoHeader">
        <p><span /> TruePrint in motion <span /></p>
        <h2 id="product-video-title">See the details.<br /><em>Watch them come alive.</em></h2>
        <p>
          Explore our products in motion and take a closer look at the materials, finishes and details that make each one stand out.
        </p>
      </header>

      <div className="productVideoExperience">
        <div className="productVideoLayout">
          <div className="productVideoPlayer">
            <div className="productVideoScreen">
              <div className="productVideoViewport">
                <video
                  key={activeVideo.id}
                  src={loadVideo ? activeVideo.src : undefined}
                  poster={activeVideo.poster}
                  preload="metadata"
                  muted
                  playsInline
                  controls
                  autoPlay
                  loop
                  aria-label={`${activeVideo.title} product film`}
                />

              </div>
            </div>


          </div>

          <div className="productVideoChoices" aria-label="Choose a product film">
            {productVideos.map((video, index) => (
              <button
                className="productVideoChoice"
                data-active={index === activeIndex ? "true" : "false"}
                type="button"
                key={video.id}
                onClick={() => setActiveIndex(index)}
                aria-pressed={index === activeIndex}
                aria-label={`Watch ${video.title}`}
              >
                <span className="productVideoChoiceImage">
                  <SiteImage src={video.poster} alt="" sizes="(max-width: 680px) 45vw, 240px" />
                  <i aria-hidden="true">
                    <svg viewBox="0 0 24 24"><path d="M8.6 6.4 18 12l-9.4 5.6V6.4Z" /></svg>
                  </i>
                  <span className="productVideoChoiceCopy">
                    <strong>{video.title}</strong>
                    <small>{video.detail}</small>
                  </span>
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
