"use client";

import { motion } from "framer-motion";

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
};

const word = {
  hidden: { opacity: 0, y: "100%" },
  visible: {
    opacity: 1,
    y: "0%",
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const },
  },
};

export function AnimatedHeroHeading({
  lines,
}: {
  lines: { text: string; accent?: boolean }[][];
}) {
  return (
    <motion.h1
      className="font-display text-5xl leading-[1.05] tracking-wide sm:text-6xl lg:text-7xl"
      initial="hidden"
      animate="visible"
      variants={container}
    >
      {lines.map((line, li) => (
        <span key={li} className="block overflow-hidden pb-1">
          {line.map((word_, wi) => (
            <span
              key={wi}
              className="inline-block overflow-hidden align-bottom"
            >
              <motion.span
                className={`inline-block ${word_.accent ? "text-flame" : ""}`}
                variants={word}
              >
                {word_.text}&nbsp;
              </motion.span>
            </span>
          ))}
        </span>
      ))}
    </motion.h1>
  );
}

export function AnimatedFadeIn({
  children,
  delay = 0,
  className,
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
