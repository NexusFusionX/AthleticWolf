"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Reveal } from "./Reveal";
import { AccentHeading } from "./AccentHeading";
import { CaretLeft, CaretRight, Play } from "@phosphor-icons/react";

const videos = [
  {
    id: 1,
    title: "Push-Up Form Breakdown",
    desc: "Master proper push-up technique for maximum chest and tricep engagement.",
    src: "/media/coach/pushup.mp4",
  },
  {
    id: 2,
    title: "Tricep Extension Guide",
    desc: "Build stronger, more defined triceps with correct extension form.",
    src: "/media/coach/tricep.mp4",
  },
  {
    id: 3,
    title: "Biceps Training Guide",
    desc: "Learn the key movements for effective bicep growth and strength.",
    src: "/media/coach/bicep.mp4",
  },
];

function VideoCard({ video }: { video: (typeof videos)[number] }) {
  const [playing, setPlaying] = useState(false);
  const [shouldLoad, setShouldLoad] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldLoad(true);
          observer.disconnect();
        }
      },
      { rootMargin: "200px 0px", threshold: 0.01 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  function handlePlay() {
    if (!shouldLoad) setShouldLoad(true);
    setPlaying(true);
    requestAnimationFrame(() => {
      void videoRef.current?.play();
    });
  }

  return (
    <div
      ref={cardRef}
      className="video-carousel__slide card-premium group relative h-full overflow-hidden rounded-2xl border border-line bg-card transition-all hover:-translate-y-1.5"
    >
      <div className="relative aspect-[9/16] w-full overflow-hidden bg-ink">
        <video
          ref={videoRef}
          src={shouldLoad ? video.src : undefined}
          controls={playing}
          playsInline
          preload={shouldLoad ? "metadata" : "none"}
          onLoadedMetadata={(e) => {
            if (!playing) e.currentTarget.currentTime = 0.1;
          }}
          className="h-full w-full object-cover"
        />

        {!playing && (
          <button
            type="button"
            onClick={handlePlay}
            className="absolute inset-0 flex items-center justify-center bg-black/20 transition-colors hover:bg-black/30"
            aria-label={`Play ${video.title}`}
          >
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-accent/90 text-white shadow-lg transition-transform group-hover:scale-110">
              <Play size={32} weight="fill" />
            </div>
          </button>
        )}
      </div>
      <div className="p-6">
        <h3 className="font-display text-lg">{video.title}</h3>
        <p className="mt-2 text-sm text-muted">{video.desc}</p>
      </div>
    </div>
  );
}

export function CoachVideos() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [activePage, setActivePage] = useState(0);
  const [perView, setPerView] = useState(2);

  useEffect(() => {
    function updatePerView() {
      setPerView(window.innerWidth >= 1024 ? 4 : 2);
    }
    updatePerView();
    window.addEventListener("resize", updatePerView);
    return () => window.removeEventListener("resize", updatePerView);
  }, []);

  const pageCount = Math.max(1, Math.ceil(videos.length / perView));

  const syncActivePage = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;
    const slide = track.querySelector<HTMLElement>(".video-carousel__slide");
    if (!slide) return;
    const gap = 16;
    const slideStep = slide.offsetWidth + gap;
    const page = Math.round(track.scrollLeft / (slideStep * perView));
    setActivePage(Math.min(Math.max(page, 0), pageCount - 1));
  }, [pageCount, perView]);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    track.addEventListener("scroll", syncActivePage, { passive: true });
    return () => track.removeEventListener("scroll", syncActivePage);
  }, [syncActivePage]);

  useEffect(() => {
    setActivePage(0);
    if (trackRef.current) trackRef.current.scrollLeft = 0;
  }, [perView]);

  function scrollToPage(page: number) {
    const track = trackRef.current;
    if (!track) return;
    const slide = track.querySelector<HTMLElement>(".video-carousel__slide");
    if (!slide) return;
    const gap = 16;
    const slideStep = slide.offsetWidth + gap;
    track.scrollTo({
      left: page * slideStep * perView,
      behavior: "smooth",
    });
    setActivePage(page);
  }

  function prev() {
    scrollToPage(activePage === 0 ? pageCount - 1 : activePage - 1);
  }

  function next() {
    scrollToPage(activePage === pageCount - 1 ? 0 : activePage + 1);
  }

  return (
    <section className="px-6 py-20 sm:px-8 sm:py-28">
      <div className="mx-auto max-w-7xl">
        <Reveal className="max-w-xl">
          <AccentHeading
            accent="Coach"
            after="Videos"
            className="font-display text-4xl sm:text-5xl"
          />
          <p className="mt-4 text-muted">
            Learn directly from our certified coaches with actionable insights.
          </p>
        </Reveal>

        <div className="video-carousel mt-14">
          <div
            ref={trackRef}
            className="video-carousel__track flex gap-4 overflow-x-auto scroll-smooth pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {videos.map((video) => (
              <VideoCard key={video.id} video={video} />
            ))}
          </div>

          {pageCount > 1 && (
            <div className="mt-6 flex items-center justify-center gap-4">
              <button
                type="button"
                onClick={prev}
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-line text-white transition-colors hover:border-accent/40 hover:text-accent"
                aria-label="Previous videos"
              >
                <CaretLeft size={16} weight="bold" />
              </button>

              <div className="flex items-center gap-2">
                {Array.from({ length: pageCount }).map((_, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => scrollToPage(i)}
                    className={`h-2 rounded-full transition-all ${
                      i === activePage ? "w-6 bg-accent" : "w-2 bg-white/25"
                    }`}
                    aria-label={`Go to video page ${i + 1}`}
                  />
                ))}
              </div>

              <button
                type="button"
                onClick={next}
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-line text-white transition-colors hover:border-accent/40 hover:text-accent"
                aria-label="Next videos"
              >
                <CaretRight size={16} weight="bold" />
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
