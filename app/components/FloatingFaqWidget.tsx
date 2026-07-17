"use client";

import { useState } from "react";
import { ChatCircleDots, X } from "@phosphor-icons/react";
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
        className="btn btn-accent fixed bottom-5 right-5 z-50 flex h-14 w-14 items-center justify-center rounded-full text-white shadow-lg sm:bottom-6 sm:right-6"
        aria-label={open ? "Close AI assistant" : "Open AI assistant"}
      >
        {open ? <X size={26} weight="bold" /> : <ChatCircleDots size={26} weight="fill" />}
      </button>
    </>
  );
}
