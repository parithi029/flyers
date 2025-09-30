// src/components/Slideshow.jsx
import StarryBackground from "./StarryBackground";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";

const slides = [
  { src: "./images/flyer/flyer.jpg", caption: "Hire Top Talent — Lanceboard", description: "Square social flyer composed in Photoshop with clean CTA and soft arcs." },
  { src: "./images/flyer/flyer1.jpg", caption: "Studio Noir — Night in Contrast", description: "Moody poster made in Illustrator with monochrome portraits and accents." },
  { src: "./images/flyer/flyer2.jpg", caption: "Glowstack Web Conference 2025", description: "Tech event flyer blending neon interface chips and QR registration." },
  { src: "./images/flyer/flyer3.jpg", caption: "Innerverse Wellness Workshop", description: "Gentle serif layout with quote card and session details." },
  { src: "./images/flyer/flyer4.jpg", caption: "MarketCraft Pop‑Up Fair", description: "Playful hand‑drawn elements and bright headline for a local fair." },
];

export default function Slideshow() {
  const [index, setIndex] = useState(0);
  const [dir, setDir] = useState(1);
  const [paused, setPaused] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const total = slides.length;
  const safeIndex = total ? ((index % total) + total) % total : 0;
  const slide = total ? slides[safeIndex] : null;

  const timer = useRef();

  const go = (step) => {
    if (!total) return;
    setDir(step);
    setIndex((i) => ((i + step) % total + total) % total);
  };

  useEffect(() => {
    if (!total) return;
    if (paused) return;
    timer.current = setInterval(() => go(1), 4500);
    return () => clearInterval(timer.current);
  }, [paused, index, total]);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useMemo(() => {
    slides.forEach((s) => {
      const img = new Image();
      img.src = s.src;
    });
  }, []);

  if (!slide) {
    return (
      <div className="min-h-dvh bg-[#0b0f1a] text-white grid place-items-center">
        <div className="text-white/70">
          No slides found. Add images to public/images/ and restart.
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="min-h-dvh bg-[#0b0f1a] text-white flex items-start justify-center overscroll-contain overflow-hidden transform-gpu relative">
        <StarryBackground />

        <div className="min-h-dvh bg-[#0b0f1a] text-white flex items-start justify-center overscroll-contain">
          <figure
            className="
              w-[min(90vw,330px)] md:w-[min(70vw,860px)]
              translate-y-2 md:translate-y-0
              rounded-3xl bg-slate-900/60 backdrop-blur border border-white/10
              p-4 md:p-6 shadow-xl
            "
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
          >
            {/* Header */}
            <div className="mb-4 flex items-center justify-center relative">
              <h1 className="tracking-[0.25em] text-lg sm:text-xl md:text-2xl text-white/90 absolute left-1/2 transform -translate-x-1/2">
                FLYERS
              </h1>

              {/* Desktop nav */}
              <nav className="hidden md:flex gap-6 text-xs sm:text-sm md:text-base text-white/60 ml-auto">
                <a
                  href="https://parithi029.github.io/portfolio1/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white cursor-pointer"
                >
                  Back to Portfolio
                </a>
                <a
                  href="https://linkedin.com/in/parithi-bharathidasan-702830276/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white cursor-pointer"
                >
                  Contact
                </a>
              </nav>

              {/* Mobile toggle */}
              <button
                className="md:hidden ml-auto p-1.5 rounded hover:bg-white/10 transition"
                aria-label="Menu"
                onClick={() => setMenuOpen(!menuOpen)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  {menuOpen ? (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  ) : (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  )}
                </svg>
              </button>
            </div>

            {/* Mobile dropdown */}
            {menuOpen && (
              <div className="md:hidden bg-slate-900/80 rounded-b-xl border border-t-0 border-white/10 p-4 flex flex-col gap-3">
                <a
                  href="https://www.instagram.com/pari7hi/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white cursor-pointer"
                  onClick={() => setMenuOpen(false)}
                >
                  Back to Portfolio
                </a>
                <a
                  href="https://www.instagram.com/pari7hi/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white cursor-pointer"
                  onClick={() => setMenuOpen(false)}
                >
                  Contact
                </a>
              </div>
            )}

            {/* Stage */}
            <div className="relative aspect-[3/4] sm:aspect-[4/5] md:aspect-[16/9] min-h-[260px] overflow-hidden rounded-xl">
              {/* Background blurred */}
              <AnimatePresence initial={false} custom={dir} mode="popLayout">
                <motion.img
                  key={`bg-${safeIndex}`}
                  src={slide.src}
                  aria-hidden
                  className="absolute inset-0 h-full w-full object-cover blur-2xl scale-110"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.5 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4 }}
                />
              </AnimatePresence>

              {/* Foreground */}
              <AnimatePresence initial={false} custom={dir} mode="popLayout">
                <motion.img
                  key={`fg-${safeIndex}`}
                  src={slide.src}
                  alt={slide.caption}
                  className="absolute inset-0 m-auto max-h-full max-w-full object-contain"
                  custom={dir}
                  initial={{
                    opacity: 0,
                    x: dir > 0 ? 40 : -40,
                    scale: 1.02,
                  }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  exit={{
                    opacity: 0,
                    x: dir > 0 ? -40 : 40,
                    scale: 0.995,
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 260,
                    damping: 26,
                  }}
                />
              </AnimatePresence>
            </div>

            {/* Controls */}
            <button
              onClick={() => go(-1)}
              aria-label="Previous"
              className="absolute left-3 top-1/2 -translate-y-1/2 text-white/90 hover:text-white text-3xl leading-none cursor-pointer select-none"
            >
              ‹
            </button>
            <button
              onClick={() => go(1)}
              aria-label="Next"
              className="absolute right-3 top-1/2 -translate-y-1/2 text-white/90 hover:text-white text-3xl leading-none cursor-pointer select-none"
            >
              ›
            </button>

            {/* Grouped count + dots + autoplay */}
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1">
              <div className="text-white/80 text-sm tabular-nums">
                {safeIndex + 1} / {total}
              </div>
              <div className="flex items-center gap-3">
                {slides.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => {
                      setDir(i > safeIndex ? 1 : -1);
                      setIndex(i);
                    }}
                    aria-label={`Go to slide ${i + 1}`}
                    className={[
                      "h-2.5 w-2.5 rounded-full transition-all cursor-pointer",
                      i === safeIndex
                        ? "bg-white scale-110"
                        : "bg-white/35 hover:bg-white/70",
                    ].join(" ")}
                  />
                ))}
              </div>
              <div className="text-[10px] md:text-xs text-white/60">
                {paused ? "Paused" : "Autoplay"}
              </div>
            </div>

            <figcaption className="mt-5 text-center">
              <div className="text-base md:text-lg font-medium tracking-wide">
                {slide.caption}
              </div>
              <p className="mt-1 text-xs md:text-sm text-white/70 max-w-prose mx-auto">
                {slide.description}
              </p>
            </figcaption>

            <div className="mt-6 flex items-center justify-between text-white/80 text-xs md:text-sm">
              <button
                onClick={() => go(-1)}
                className="px-2 py-1 md:px-3 md:py-2 hover:text-white cursor-pointer"
              >
                PREV
              </button>
              <button
                onClick={() => go(1)}
                className="px-2 py-1 hover:text-white transition-colors cursor-pointer"
              >
                NEXT
              </button>
            </div>
          </figure>
        </div>
      </div>
    </>
  );
}
