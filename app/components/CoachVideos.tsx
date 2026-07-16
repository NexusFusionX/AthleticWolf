"use client";

import { Reveal } from "./Reveal";
import { Play } from "@phosphor-icons/react";

const videos = [
  {
    id: 1,
    title: "Getting Started with Your Program",
    thumbnail: "/media/coach/video-1.jpg",
  },
  {
    id: 2,
    title: "Nutrition 101 for Coaches",
    thumbnail: "/media/coach/video-2.jpg",
  },
  {
    id: 3,
    title: "Building Your Ideal Physique",
    thumbnail: "/media/coach/video-3.jpg",
  },
];

export function CoachVideos() {
  return (
    <section className="wheel-section px-6 py-20 sm:px-8 sm:py-28">
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
              <div className="card-premium group relative overflow-hidden rounded-2xl border border-line bg-card transition-all hover:-translate-y-1.5">
                {/* Placeholder video thumbnail */}
                <div className="aspect-video w-full bg-gradient-to-br from-accent/20 to-card flex items-center justify-center">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-accent/20 text-accent transition-transform group-hover:scale-110">
                    <Play size={32} weight="fill" />
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="font-display text-lg">{video.title}</h3>
                  <p className="mt-2 text-sm text-muted">
                    Expert coaching insights delivered by our certified trainers.
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
