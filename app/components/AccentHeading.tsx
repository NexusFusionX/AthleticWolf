type AccentHeadingProps = {
  as?: "h1" | "h2" | "h3";
  before?: string;
  accent: string;
  after?: string;
  className?: string;
};

export function AccentHeading({
  as: Tag = "h2",
  before,
  accent,
  after,
  className,
}: AccentHeadingProps) {
  return (
    <Tag className={className}>
      {before ? `${before} ` : null}
      <span className="text-accent">{accent}</span>
      {after ? ` ${after}` : null}
    </Tag>
  );
}
