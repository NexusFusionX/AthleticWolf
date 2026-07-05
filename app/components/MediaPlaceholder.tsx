export function MediaPlaceholder({
  label,
  aspect = "aspect-[4/5]",
}: {
  label: string;
  aspect?: string;
}) {
  return (
    <div
      className={`flex ${aspect} flex-col items-center justify-center gap-2 rounded-2xl border border-dashed border-line bg-white p-6 text-center`}
    >
      <span className="text-xs font-semibold uppercase tracking-[0.15em] text-muted">
        Media placeholder
      </span>
      <span className="text-sm text-muted">{label}</span>
    </div>
  );
}
