"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { PaperPlaneRight } from "@phosphor-icons/react";

type ChatMessage = {
  role: "user" | "model";
  text: string;
};

const SUGGESTED_QUESTIONS = [
  "What's included in the Platinum package?",
  "How does the assessment process work?",
  "Do I need a gym membership?",
  "How long until I get my custom plan?",
];

export function AiFaqChat() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, loading]);

  async function sendMessage(text: string) {
    const trimmed = text.trim();
    if (!trimmed || loading) return;

    setError("");
    const nextMessages: ChatMessage[] = [...messages, { role: "user", text: trimmed }];
    setMessages(nextMessages);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/faq-chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: trimmed,
          history: messages,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data?.error || "Something went wrong. Please try again.");
        setLoading(false);
        return;
      }

      setMessages([...nextMessages, { role: "model", text: data.reply }]);
    } catch {
      setError("Couldn't reach the AI assistant. Please check your connection and try again.");
    } finally {
      setLoading(false);
    }
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    sendMessage(input);
  }

  return (
    <div className="shadow-premium mx-auto flex w-full max-w-2xl flex-col overflow-hidden rounded-2xl border border-line bg-card">
      <div className="flex items-center gap-2.5 border-b border-line bg-ink px-6 py-4 text-white">
        <div className="relative h-11 w-11 overflow-hidden rounded-full border border-white/15 bg-black">
          <Image
            src="/brand/athletic-wolf-logo.png"
            alt="Athletic Wolf"
            fill
            className="object-cover scale-110"
            sizes="44px"
          />
        </div>
        <div>
          <p className="font-display text-sm">Ask Athletic Wolf AI</p>
          <p className="text-xs text-white/50">Ask anything about our coaching, packages, or process</p>
        </div>
      </div>

      <div ref={scrollRef} className="flex max-h-[420px] min-h-[240px] flex-col gap-3 overflow-y-auto px-6 py-5">
        {messages.length === 0 && (
          <div className="flex flex-col gap-2">
            <p className="text-sm text-muted">Try asking:</p>
            <div className="flex flex-wrap gap-2">
              {SUGGESTED_QUESTIONS.map((q) => (
                <button
                  key={q}
                  type="button"
                  onClick={() => sendMessage(q)}
                  className="rounded-full border border-line bg-surface px-3.5 py-2 text-xs text-foreground transition-colors hover:border-accent/60 hover:text-accent"
                >
                  {q}
                </button>
              ))}
            </div>
          </div>
        )}

        {messages.map((m, i) => (
          <div
            key={i}
            className={`max-w-[85%] rounded-xl px-4 py-2.5 text-sm leading-relaxed ${
              m.role === "user"
                ? "self-end bg-accent text-white"
                : "self-start border border-line bg-surface"
            }`}
          >
            {m.text}
          </div>
        ))}

        {loading && (
          <div className="self-start rounded-xl border border-line bg-surface px-4 py-2.5 text-sm text-muted">
            Thinking...
          </div>
        )}

        {error && (
          <div className="self-start rounded-xl border border-error/30 bg-error/10 px-4 py-2.5 text-sm text-error">
            {error}
          </div>
        )}
      </div>

      <form onSubmit={handleSubmit} className="flex items-center gap-2 border-t border-line p-4">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask a question..."
          disabled={loading}
          className="flex-1 rounded-xl border border-line bg-surface px-4 py-2.5 text-sm outline-none transition-colors focus:border-accent disabled:opacity-60"
        />
        <button
          type="submit"
          disabled={loading || !input.trim()}
          className="btn btn-accent flex h-11 w-11 shrink-0 items-center justify-center text-white disabled:opacity-50"
          aria-label="Send message"
        >
          <PaperPlaneRight size={18} weight="fill" />
        </button>
      </form>
    </div>
  );
}
