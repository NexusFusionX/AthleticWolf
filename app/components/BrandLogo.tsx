import Link from "next/link";

const LOGO_SRC = "/brand/athletic-wolf-wordmark.png";

type BrandLogoProps = {
  href?: string;
  className?: string;
  imgClassName?: string;
  /** Pixel height of the logo. Omit when using imgClassName or header CSS. */
  height?: number;
};

export function BrandLogo({
  href = "/",
  className = "",
  imgClassName = "",
  height,
}: BrandLogoProps) {
  const image = (
    // Plain img so height changes always apply locally (no Next image sizing/cache quirks).
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={LOGO_SRC}
      alt="Athletic Wolf"
      className={`brand-logo block w-auto max-w-none object-contain ${imgClassName}`.trim()}
      style={height != null ? { height: `${height}px` } : undefined}
    />
  );

  const classes = `inline-flex shrink-0 items-center ${className}`.trim();

  if (!href) {
    return <span className={classes}>{image}</span>;
  }

  if (href === "/") {
    return (
      <a href="/" className={classes} aria-label="Athletic Wolf home">
        {image}
      </a>
    );
  }

  return (
    <Link href={href} className={classes} aria-label="Athletic Wolf home">
      {image}
    </Link>
  );
}
