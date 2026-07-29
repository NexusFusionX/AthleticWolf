"use client";

import { useState } from "react";
import { Reveal } from "./Reveal";
import { AccentHeading } from "./AccentHeading";
import { Play } from "@phosphor-icons/react";

const YOUTUBE_VIDEO_ID = "2DOaUdGEOmM";

const COACH_VIDEO = {
  title: "Fat Loss in 10 Mins | Daily Home Routine",
  channel: "Athletic Wolf",
  channelUrl: "https://www.youtube.com/@AthleticWolf",
  watchUrl: `https://www.youtube.com/watch?v=${YOUTUBE_VIDEO_ID}`,
  thumbnails: [
    `https://i.ytimg.com/vi/${YOUTUBE_VIDEO_ID}/sddefault.jpg`,
    `https://i.ytimg.com/vi/${YOUTUBE_VIDEO_ID}/hqdefault.jpg`,
    `https://i.ytimg.com/vi/${YOUTUBE_VIDEO_ID}/mqdefault.jpg`,
  ],
  embedSrc: `https://www.youtube.com/embed/${YOUTUBE_VIDEO_ID}?autoplay=1&rel=0`,
} as const;

function YouTubeMark({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 90 20"
      aria-hidden
      className={className}
      fill="currentColor"
    >
      <path d="M27.2 4.2h-4.5v11.6h4.5c3.1 0 5.3-1.6 5.3-5.8 0-4.2-2.2-5.8-5.3-5.8zm-.3 9.7h-2.2V6.1h2.2c2 0 3.1 1 3.1 3.9 0 2.9-1.1 3.9-3.1 3.9zM41.8 4.2l-3.8 11.6h-2.3L31.9 4.2h2.4l2.1 7.1 2.1-7.1h2.3zM52.6 4.2h2.2v11.6h-2.2V4.2zM63.4 4.2c3.4 0 5.6 2.2 5.6 5.8s-2.2 5.8-5.6 5.8h-4.5V4.2h4.5zm0 9.7c2 0 3.1-1.2 3.1-3.9s-1.1-3.9-3.1-3.9h-2.2v7.8h2.2zM77.8 4.2l3.5 11.6h-2.3l-.7-2.2h-3.9l-.7 2.2h-2.3l3.5-11.6h2.9zm-1.5 7.1l-1.2-3.8-1.2 3.8h2.4zM11.9 2.5C11.3 1 10.1 0 8.5 0H2.2C.6 0-.6 1.1-1.2 2.5 0 0-1.2 4.1-1.2 6.5v7c0 2.4 1.2 4 1.2 4 .6 1.4 1.8 2.5 3.4 2.5h6.3c1.6 0 2.8-1.1 3.4-2.5 0 0 1.2-1.6 1.2-4v-7c0-2.4-1.2-4-1.2-4zM7.3 14.5V5.5L12.5 10 7.3 14.5z" />
    </svg>
  );
}

function YouTubePlayer() {
  const [playing, setPlaying] = useState(false);
  const [thumbnailIndex, setThumbnailIndex] = useState(0);

  const thumbnail = COACH_VIDEO.thumbnails[thumbnailIndex];

  function handleThumbnailError() {
    setThumbnailIndex((current) =>
      current < COACH_VIDEO.thumbnails.length - 1 ? current + 1 : current
    );
  }

  return (
    <div className="coach-video card-premium overflow-hidden rounded-2xl border border-line bg-card">
      <div className="coach-video__media relative aspect-video w-full overflow-hidden bg-black">
        {playing ? (
          <iframe
            src={COACH_VIDEO.embedSrc}
            title={COACH_VIDEO.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            className="absolute inset-0 h-full w-full border-0"
          />
        ) : (
          <button
            type="button"
            onClick={() => setPlaying(true)}
            className="group absolute inset-0 flex w-full items-center justify-center"
            aria-label={`Play ${COACH_VIDEO.title} on YouTube`}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={thumbnail}
              alt={COACH_VIDEO.title}
              onError={handleThumbnailError}
              className="absolute inset-0 h-full w-full object-cover object-center"
            />
            <span className="absolute inset-0 bg-black/20 transition-colors group-hover:bg-black/30" />
            <span className="relative flex h-14 w-14 items-center justify-center rounded-full bg-[#ff0000] text-white shadow-lg transition-transform group-hover:scale-110 sm:h-16 sm:w-16">
              <Play size={28} weight="fill" aria-hidden className="ml-0.5" />
            </span>
          </button>
        )}
      </div>

      <div className="coach-video__meta px-5 py-4 sm:px-6 sm:py-5">
        <h3 className="font-display text-lg sm:text-xl">{COACH_VIDEO.title}</h3>
        <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-2 text-sm">
          <a
            href={COACH_VIDEO.channelUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-white transition-colors hover:text-accent"
          >
            {COACH_VIDEO.channel}
          </a>
          <span className="text-white/25" aria-hidden>
            ·
          </span>
          <a
            href={COACH_VIDEO.watchUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 font-semibold text-[#ff0000] transition-opacity hover:opacity-80"
          >
            <YouTubeMark className="h-4 w-auto" />
            <span>Watch on YouTube</span>
          </a>
        </div>
      </div>
    </div>
  );
}

export function CoachVideos() {
  return (
    <section id="coach-videos" className="px-6 py-20 sm:px-8 sm:py-28">
      <div className="mx-auto max-w-4xl">
        <Reveal className="max-w-xl" variant="left">
          <AccentHeading
            accent="Coach"
            after="Videos"
            className="font-display text-4xl sm:text-5xl"
          />
          <p className="mt-4 text-muted">
            Learn directly from your coach — streamed in high quality on YouTube.
          </p>
        </Reveal>

        <Reveal delay={0.12} variant="right">
          <div className="mt-10 sm:mt-12">
            <YouTubePlayer />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
