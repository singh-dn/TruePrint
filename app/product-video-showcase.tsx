"use client";

import { useRef, useState } from "react";

const placeholderVideo =
  "https://res.cloudinary.com/dsuwzuaxp/video/upload/q_auto:eco,w_1440/856381-hd_1920_1080_30fps_gsq11b.mp4";

const productVideos = [
  {
    id: "print-craft",
    number: "01",
    title: "Print craft",
    detail: "Texture, colour and finishing",
    poster: "/trueprint-editorial.webp",
    src: placeholderVideo,
    startAt: 0,
  },
  {
    id: "diaries",
    number: "02",
    title: "Diaries",
    detail: "Covers, pages and details",
    poster: "/trueprint-diaries.jpeg",
    src: placeholderVideo,
    startAt: 5,
  },
  {
    id: "joining-kits",
    number: "03",
    title: "Joining kits",
    detail: "Useful products, made cohesive",
    poster: "/trueprint-joining-kits.jpeg",
    src: placeholderVideo,
    startAt: 10,
  },
  {
    id: "packaging",
    number: "04",
    title: "Packaging",
    detail: "Presentation from every angle",
    poster: "/trueprint-packaging.webp",
    src: placeholderVideo,
    startAt: 15,
  },
] as const;

export default function ProductVideoShowcase() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [shouldPlay, setShouldPlay] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const activeVideo = productVideos[activeIndex];

  const selectVideo = (index: number) => {
    setActiveIndex(index);
    setShouldPlay(true);
    setIsPlaying(false);
  };

  const handleLoadedMetadata = () => {
    const video = videoRef.current;
    if (!video) return;

    if (Number.isFinite(video.duration)) {
      video.currentTime = Math.min(activeVideo.startAt, Math.max(0, video.duration - 0.1));
    }

    if (shouldPlay) {
      void video.play().catch(() => setShouldPlay(false));
    }
  };

  const togglePlayback = () => {
    const video = videoRef.current;
    if (!video) return;

    if (video.paused) {
      if (video.ended) video.currentTime = activeVideo.startAt;
      setShouldPlay(true);
      void video.play().catch(() => setShouldPlay(false));
    } else {
      video.pause();
    }
  };

  return (
    <section className="productVideoSection" aria-labelledby="product-video-title">
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
              <div className="productVideoToolbar" aria-hidden="true">
                <span className="productVideoLights"><i /><i /><i /></span>
                <span>TruePrint studio</span>
                <span className="productVideoToolbarStatus">Now viewing&nbsp; {activeVideo.number}</span>
              </div>

              <div className="productVideoViewport">
                <video
                  key={activeVideo.id}
                  ref={videoRef}
                  src={activeVideo.src}
                  poster={activeVideo.poster}
                  preload="metadata"
                  muted
                  playsInline
                  controls
                  autoPlay={shouldPlay}
                  onLoadedMetadata={handleLoadedMetadata}
                  onPlay={() => setIsPlaying(true)}
                  onPause={() => setIsPlaying(false)}
                  onEnded={() => setIsPlaying(false)}
                  aria-label={`${activeVideo.title} product film`}
                />

                {!isPlaying && (
                  <button
                    className="productVideoPlay"
                    type="button"
                    onClick={togglePlayback}
                    aria-label={`Play ${activeVideo.title} product film`}
                  >
                    <svg viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M8.6 6.4 18 12l-9.4 5.6V6.4Z" />
                    </svg>
                  </button>
                )}
              </div>
            </div>

            <div className="productVideoLaptopBase" aria-hidden="true"><span /></div>
          </div>

          <div className="productVideoChoices" aria-label="Choose a product film">
            {productVideos.map((video, index) => (
              <button
                className="productVideoChoice"
                data-active={index === activeIndex ? "true" : "false"}
                type="button"
                key={video.id}
                onClick={() => selectVideo(index)}
                aria-pressed={index === activeIndex}
                aria-label={`Watch ${video.title}`}
              >
                <span className="productVideoChoiceImage">
                  <img src={video.poster} alt="" />
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
