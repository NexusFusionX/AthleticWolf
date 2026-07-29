"use client";

import Image from "next/image";
import { useState } from "react";
import { X } from "@phosphor-icons/react";
import { AiFaqChat } from "./AiFaqChat";

export function FloatingFaqWidget() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {open && (
        <div className="fixed bottom-[calc(max(1.25rem,env(safe-area-inset-bottom))+4.5rem)] right-[max(1rem,env(safe-area-inset-right))] z-50 w-[calc(100vw-2rem)] max-w-sm sm:right-[max(1.25rem,env(safe-area-inset-right))]">
          <AiFaqChat />
        </div>
      )}

      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="fixed bottom-[max(1.25rem,env(safe-area-inset-bottom))] right-[max(1.25rem,env(safe-area-inset-right))] z-50 flex h-14 items-center justify-center overflow-hidden rounded-xl border border-white/15 bg-black px-2.5 shadow-[0_10px_28px_rgba(0,0,0,0.55),0_0_20px_rgba(255,107,53,0.25)] transition-transform duration-300 hover:scale-105 sm:h-16 sm:px-3"
        aria-label={open ? "Close AI assistant" : "Open AI assistant"}
      >
        {open ? (
          <span className="flex h-full w-full items-center justify-center bg-accent text-white">
            <X size={28} weight="bold" />
          </span>
        ) : (
          <Image
            src="/brand/athletic-wolf-wordmark.png"
            alt="Athletic Wolf"
            width={120}
            height={40}
            className="h-8 w-auto object-contain sm:h-9"
            priority
          />
        )}
      </button>
    </>
  );
}
