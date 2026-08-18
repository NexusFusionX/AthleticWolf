"use client";

import { useEffect, useRef, useState } from "react";
import {
  ArrowsIn,
  ArrowsOut,
  ClosedCaptioning,
  Pause,
  Play,
  SpeakerHigh,
  SpeakerSlash,
} from "@phosphor-icons/react";
import { Reveal } from "./Reveal";
import { AccentHeading } from "./AccentHeading";

const YOUTUBE_VIDEO_ID = "2DOaUdGEOmM";

const YOUTUBE_STATE = {
  playing: 1,
  paused: 2,
} as const;
const PLAYER_ELEMENT_ID = "coach-video-youtube-player";

type YouTubePlayer = {
  playVideo: () => void;
  pauseVideo: () => void;
  mute: () => void;
  unMute: () => void;
  setVolume: (volume: number) => void;
  isMuted: () => boolean;
  loadModule: (name: string) => void;
  unloadModule: (name: string) => void;
  setOption: (module: string, option: string, value: unknown) => void;
  destroy: () => void;
};

type YouTubePlayerCtor = new (
  elementId: string,
  options: {
    host?: string;
    videoId: string;
    width?: string | number;
    height?: string | number;
    playerVars?: Record<string, string | number>;
    events?: {
      onReady?: (event: { target: YouTubePlayer }) => void;
      onStateChange?: (event: { data: number }) => void;
    };
  }
) => YouTubePlayer;

declare global {
  interface Window {
    YT?: {
      Player: YouTubePlayerCtor;
    };
    onYouTubeIframeAPIReady?: () => void;
  }
}

function loadYouTubeIframeApi() {
  if (typeof window === "undefined") {
    return Promise.resolve();
  }

  if (window.YT?.Player) {
    return Promise.resolve();
  }

  return new Promise<void>((resolve) => {
    const finish = () => resolve();

    if (window.YT?.Player) {
      finish();
      return;
    }

    const previousReady = window.onYouTubeIframeAPIReady;
    window.onYouTubeIframeAPIReady = () => {
      previousReady?.();
      finish();
    };

    if (!document.getElementById("youtube-iframe-api")) {
      const script = document.createElement("script");
      script.id = "youtube-iframe-api";
      script.src = "https://www.youtube.com/iframe_api";
      document.body.appendChild(script);
    }
  });
}

function ScrollYouTubePlayer() {
  const containerRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const playerRef = useRef<YouTubePlayer | null>(null);
  const [shouldLoad, setShouldLoad] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const [manuallyPaused, setManuallyPaused] = useState(false);
  const [captionsOn, setCaptionsOn] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    const node = containerRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        const visible =
          entry.isIntersecting && entry.intersectionRatio >= 0.45;
        setIsActive(visible);
        if (visible) setShouldLoad(true);
      },
      { threshold: [0, 0.45, 0.65] }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!shouldLoad) return;

    let cancelled = false;

    loadYouTubeIframeApi().then(() => {
      if (cancelled || playerRef.current || !window.YT?.Player) return;
      if (!document.getElementById(PLAYER_ELEMENT_ID)) return;

      const player = new window.YT.Player(PLAYER_ELEMENT_ID, {
        host: "https://www.youtube-nocookie.com",
        videoId: YOUTUBE_VIDEO_ID,
        width: "100%",
        height: "100%",
        playerVars: {
          enablejsapi: 1,
          modestbranding: 1,
          rel: 0,
          controls: 0,
          iv_load_policy: 3,
          playsinline: 1,
          fs: 0,
          disablekb: 1,
          loop: 1,
          playlist: YOUTUBE_VIDEO_ID,
          mute: 1,
          cc_load_policy: 0,
          origin: window.location.origin,
        },
        events: {
          onReady: ({ target }) => {
            playerRef.current = target;
            setIsReady(true);
            setIsMuted(target.isMuted());
          },
          onStateChange: ({ data }) => {
            setIsPlaying(data === YOUTUBE_STATE.playing);
          },
        },
      });

      playerRef.current = player;
    });

    return () => {
      cancelled = true;
      playerRef.current?.destroy();
      playerRef.current = null;
      setIsReady(false);
    };
  }, [shouldLoad]);

  useEffect(() => {
    const player = playerRef.current;
    if (!isReady || !player) return;

    if (!isActive) {
      player.pauseVideo();
      return;
    }

    if (!manuallyPaused) {
      player.playVideo();
    }
  }, [isActive, isReady, manuallyPaused]);

  function togglePlayPause() {
    const player = playerRef.current;
    if (!player) return;

    if (isPlaying) {
      player.pauseVideo();
      setManuallyPaused(true);
      return;
    }

    player.playVideo();
    setManuallyPaused(false);
  }

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;

    function handleFullscreenChange() {
      setIsFullscreen(document.fullscreenElement === stage);
    }

    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () =>
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
  }, []);

  function toggleMute() {
    const player = playerRef.current;
    if (!player) return;

    if (player.isMuted()) {
      player.unMute();
      player.setVolume(100);
      setIsMuted(false);
      return;
    }

    player.mute();
    setIsMuted(true);
  }

  function toggleCaptions() {
    const player = playerRef.current;
    if (!player) return;

    if (captionsOn) {
      player.setOption("captions", "track", {});
      player.unloadModule("captions");
      setCaptionsOn(false);
      return;
    }

    player.loadModule("captions");
    player.setOption("captions", "track", { languageCode: "en" });
    setCaptionsOn(true);
  }

  async function toggleFullscreen() {
    const stage = stageRef.current;
    if (!stage) return;

    if (document.fullscreenElement === stage) {
      await document.exitFullscreen();
      return;
    }

    await stage.requestFullscreen();
  }

  return (
    <div
      ref={containerRef}
      className="coach-video card-premium overflow-hidden rounded-2xl border border-line bg-card"
    >
      <div ref={stageRef} className="coach-video__stage bg-black">
        <div className="coach-video__media relative aspect-video w-full overflow-hidden bg-black">
          {shouldLoad ? (
            <div id={PLAYER_ELEMENT_ID} className="coach-video__player" />
          ) : (
            <div className="absolute inset-0 bg-black" aria-hidden />
          )}
        </div>

        <div className="coach-video__toolbar">
          <button
            type="button"
            className="coach-video__toolbar-btn"
            onClick={togglePlayPause}
            disabled={!isReady}
            aria-label={isPlaying ? "Pause video" : "Play video"}
            aria-pressed={isPlaying}
          >
            {isPlaying ? (
              <Pause size={18} weight="fill" aria-hidden />
            ) : (
              <Play size={18} weight="fill" aria-hidden />
            )}
            <span>{isPlaying ? "Pause" : "Play"}</span>
          </button>

          <button
            type="button"
            className="coach-video__toolbar-btn"
            onClick={toggleMute}
            disabled={!isReady}
            aria-label={isMuted ? "Unmute video" : "Mute video"}
            aria-pressed={isMuted}
          >
            {isMuted ? (
              <SpeakerSlash size={18} weight="bold" aria-hidden />
            ) : (
              <SpeakerHigh size={18} weight="bold" aria-hidden />
            )}
            <span>{isMuted ? "Unmute" : "Mute"}</span>
          </button>

          <button
            type="button"
            className="coach-video__toolbar-btn"
            onClick={toggleCaptions}
            disabled={!isReady}
            aria-label={captionsOn ? "Turn captions off" : "Turn captions on"}
            aria-pressed={captionsOn}
          >
            <ClosedCaptioning size={18} weight="bold" aria-hidden />
            <span>{captionsOn ? "Captions on" : "Captions off"}</span>
          </button>

          <button
            type="button"
            className="coach-video__toolbar-btn"
            onClick={toggleFullscreen}
            disabled={!isReady}
            aria-label={isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
            aria-pressed={isFullscreen}
          >
            {isFullscreen ? (
              <ArrowsIn size={18} weight="bold" aria-hidden />
            ) : (
              <ArrowsOut size={18} weight="bold" aria-hidden />
            )}
            <span>{isFullscreen ? "Exit full screen" : "Full screen"}</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export function CoachVideos() {
  return (
    <section id="coach-videos" className="page-section px-4 sm:px-6 lg:px-7">
      <div className="mx-auto max-w-7xl">
        <Reveal className="max-w-xl" variant="left">
          <AccentHeading
            before="See Your Coach"
            accent="In Action"
            className="font-display text-4xl sm:text-5xl"
          />
          <p className="mt-4 text-muted">
            Real training from your coach — it plays when you scroll here and
            pauses when you scroll away. Use the buttons below to play, pause,
            unmute, captions, or full screen.
          </p>
        </Reveal>

        <Reveal delay={0.12} variant="right">
          <div className="mt-8 sm:mt-10">
            <ScrollYouTubePlayer />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
