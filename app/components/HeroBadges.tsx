import { HeroTrustBadgeItem, HERO_TRUST_BADGES } from "./HeroTrustBadges";

export function HeroBadges() {
  const mobileBadges = HERO_TRUST_BADGES.slice(0, 3);

  return (
    <section className="border-y border-line px-6 py-5 sm:px-8 sm:py-6">
      <div className="mx-auto max-w-6xl">
        <div className="grid grid-cols-3 gap-3 sm:hidden">
          {mobileBadges.map((badge) => (
            <HeroTrustBadgeItem key={badge.heading} badge={badge} compact />
          ))}
        </div>

        <div className="hidden grid-cols-5 gap-6 sm:grid">
          {HERO_TRUST_BADGES.map((badge) => (
            <HeroTrustBadgeItem key={badge.heading} badge={badge} />
          ))}
        </div>
      </div>
    </section>
  );
}
