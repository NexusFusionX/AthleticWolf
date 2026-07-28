export type RevealVariant =
  | "up"
  | "down"
  | "left"
  | "right"
  | "fade"
  | "scale"
  | "rise"
  | "zoom"
  | "pop"
  | "tilt-left"
  | "tilt-right"
  | "blur-up"
  | "drop"
  | "slide-right"
  | "skew-up"
  | "flip-up";

export function revealAt(variants: RevealVariant[], index: number): RevealVariant {
  return variants[index % variants.length];
}
