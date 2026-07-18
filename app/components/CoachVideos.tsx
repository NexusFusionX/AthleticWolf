"use client";

import { useRef, useState } from "react";
import { Reveal } from "./Reveal";
import { Play } from "@phosphor-icons/react";

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
  const videoRef = useRef<HTMLVideoElement>(null);

  function handlePlay() {
    setPlaying(true);
    videoRef.current?.play();
  }

  return (
    <div className="card-premium group relative overflow-hidden rounded-2xl border border-line bg-card transition-all hover:-translate-y-1.5">
      <div className="relative aspect-[9/16] w-full overflow-hidden bg-ink">
        <video
          ref={videoRef}
          src={video.src}
          controls={playing}
          playsInline
          preload="metadata"
          onLoadedMetadata={(e) => {
            e.currentTarget.currentTime = 0.1;
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
  return (
    <section className="px-6 py-20 sm:px-8 sm:py-28">
      <div className="mx-auto max-w-6xl">
        <Reveal className="max-w-xl">
          <h2 className="font-display text-4xl sm:text-5xl">
            Coach Videos
          </h2>
          <p className="mt-4 text-muted">
            Learn directly from our certified coaches with actionable insights.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {videos.map((video, i) => (
            <Reveal key={video.id} delay={i * 0.08}>
              <VideoCard video={video} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
