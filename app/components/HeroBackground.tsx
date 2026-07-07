import Image from "next/image";

export function HeroBackground() {
  return (
    <div className="absolute inset-0" aria-hidden>
      <Image
        src="/media/hero/coach-hero-portrait.jpg"
        alt=""
        fill
        priority
        className="object-cover object-[center_8%] sm:object-[50%_2%]"
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-ink/15" />
      <div className="pointer-events-none absolute inset-0 shadow-[inset_0_-60px_100px_rgba(0,0,0,0.35)]" />
    </div>
  );
}
