import Image from "next/image";

export function HeroImage() {
  return (
    <div className="relative aspect-[4/5] w-full overflow-hidden rounded-t-2xl border border-white/10 bg-ink-soft">
      <Image
        src="/media/hero/coach-hero.jpg"
        alt="Athletic Wolf coach"
        fill
        priority
        className="object-cover object-top"
        sizes="(min-width: 1024px) 32rem, (min-width: 640px) 28rem, 100vw"
      />
    </div>
  );
}
