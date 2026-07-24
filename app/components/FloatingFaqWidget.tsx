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
        <div className="fixed bottom-24 right-4 z-50 w-[calc(100vw-2rem)] max-w-sm sm:right-6 sm:bottom-28">
          <AiFaqChat />
        </div>
      )}

      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="fixed bottom-5 right-5 z-50 flex h-16 w-16 items-center justify-center overflow-hidden rounded-full border border-white/15 bg-black shadow-[0_10px_28px_rgba(0,0,0,0.55),0_0_20px_rgba(255,107,53,0.25)] transition-transform duration-300 hover:scale-105 sm:bottom-6 sm:right-6 sm:h-[4.5rem] sm:w-[4.5rem]"
        aria-label={open ? "Close AI assistant" : "Open AI assistant"}
      >
        {open ? (
          <span className="flex h-full w-full items-center justify-center bg-accent text-white">
            <X size={28} weight="bold" />
          </span>
        ) : (
          <Image
            src="/brand/athletic-wolf-logo.png"
            alt="Athletic Wolf"
            width={72}
            height={72}
            className="h-full w-full object-cover scale-110"
            priority
          />
        )}
      </button>
    </>
  );
}
