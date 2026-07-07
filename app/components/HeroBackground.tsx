import Image from "next/image";

export function HeroBackground() {
  return (
    <div className="absolute inset-0" aria-hidden>
      <Image
        src="/media/hero/coach-hero.jpg"
        alt=""
        fill
        priority
        className="object-cover object-[center_30%]"
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-ink/15" />
      <div className="absolute inset-0 bg-gradient-to-t from-ink from-0% via-transparent via-35% to-transparent" />
      <div className="pointer-events-none absolute inset-0 shadow-[inset_0_-40px_80px_rgba(0,0,0,0.35)]" />
    </div>
  );
}
