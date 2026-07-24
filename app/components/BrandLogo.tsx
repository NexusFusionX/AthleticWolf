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

  return (
    <Link href={href} className={classes} style={{ height }} aria-label="Athletic Wolf home">
      {image}
    </Link>
  );
}
