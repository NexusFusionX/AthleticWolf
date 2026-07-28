export function PageSkeleton({ lines = 4 }: { lines?: number }) {
  return (
    <div className="animate-pulse space-y-4" aria-hidden>
      <div className="h-8 w-2/3 rounded-lg bg-white/10" />
      {Array.from({ length: lines }).map((_, i) => (
        <div
          key={i}
          className="h-4 rounded bg-white/10"
          style={{ width: `${88 - i * 12}%` }}
        />
      ))}
      <div className="mt-6 h-12 w-full rounded-xl bg-white/10" />
    </div>
  );
}

export function CheckoutSkeleton() {
  return (
    <div className="mx-auto flex min-h-screen max-w-2xl items-center justify-center p-6">
      <div className="w-full overflow-hidden rounded-2xl border border-line bg-card p-8">
        <div className="animate-pulse space-y-6">
          <div className="h-8 w-48 rounded-lg bg-white/10" />
          <div className="rounded-xl border border-line bg-surface p-6 space-y-4">
            <div className="h-6 w-32 rounded bg-white/10" />
            <div className="h-10 w-24 rounded bg-white/10" />
            <div className="h-4 w-full rounded bg-white/10" />
            <div className="h-4 w-5/6 rounded bg-white/10" />
          </div>
          <div className="h-32 rounded-xl bg-white/10" />
          <div className="h-12 rounded-xl bg-white/10" />
        </div>
        <p className="mt-6 text-center text-sm text-muted">Loading checkout…</p>
      </div>
    </div>
  );
}

export function DashboardSkeleton() {
  return (
    <div className="min-h-screen bg-paper px-6 py-12">
      <div className="mx-auto max-w-2xl animate-pulse space-y-6">
        <div className="flex items-center justify-between">
          <div className="h-8 w-36 rounded-lg bg-black/10" />
          <div className="h-10 w-24 rounded-xl bg-black/10" />
        </div>
        <div className="rounded-2xl border border-line bg-card p-8 space-y-6">
          <div className="h-10 w-56 rounded-lg bg-black/10" />
          <div className="h-4 w-40 rounded bg-black/10" />
          <div className="rounded-xl border border-line bg-surface p-6 space-y-3">
            <div className="h-4 w-28 rounded bg-black/10" />
            <div className="h-8 w-36 rounded bg-black/10" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="h-24 rounded-xl bg-black/10" />
            <div className="h-24 rounded-xl bg-black/10" />
          </div>
        </div>
      </div>
    </div>
  );
}
