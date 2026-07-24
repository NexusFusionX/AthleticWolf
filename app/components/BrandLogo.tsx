import Image from "next/image";
import Link from "next/link";

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
  const width = Math.round(height * 2.6);

  const image = (
    <Image
      src="/brand/athletic-wolf-logo.png"
      alt="Athletic Wolf"
      width={width}
      height={height}
      priority={priority}
      className="h-full w-auto object-contain"
    />
  );

  const classes = `inline-flex items-center ${className}`.trim();

  if (!href) {
    return (
      <span className={classes} style={{ height }}>
        {image}
      </span>
    );
  }

  // Home uses a hard navigation so the intro loader can play on Home clicks.
  // Other destinations stay as client Links (no loader).
  if (href === "/") {
    return (
      <a href="/" className={classes} style={{ height }} aria-label="Athletic Wolf home">
        {image}
      </a>
    );
  }

  return (
    <Link href={href} className={classes} style={{ height }} aria-label="Athletic Wolf home">
      {image}
    </Link>
  );
}
