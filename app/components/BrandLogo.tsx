import Image from "next/image";
import Link from "next/link";

const LOGO_SRC = "/brand/athletic-wolf-wordmark.png";

type BrandLogoProps = {
  href?: string;
  className?: string;
  /** Pixel height of the logo */
  height?: number;
  priority?: boolean;
};

export function BrandLogo({
  href = "/",
  className = "",
  height = 40,
  priority = false,
}: BrandLogoProps) {
  const image = (
    <Image
      src={LOGO_SRC}
      alt="Athletic Wolf"
      width={1024}
      height={1024}
      priority={priority}
      unoptimized
      className="block w-auto max-w-none object-contain"
      style={{ height: `${height}px` }}
    />
  );

  const classes = `inline-flex shrink-0 items-center ${className}`.trim();

  if (!href) {
    return <span className={classes}>{image}</span>;
  }

  // Home uses a hard navigation so the intro loader can play on Home clicks.
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
