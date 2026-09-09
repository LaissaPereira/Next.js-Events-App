export function EventCardSkeleton() {
  return (
    <div className="animate-pulse rounded-2xl border border-zinc-200 bg-white p-5">
      <div className="h-4 w-24 rounded bg-zinc-200" />

      <div className="mt-4 h-7 w-3/4 rounded bg-zinc-200" />

      <div className="mt-5 space-y-2">
        <div className="h-4 rounded bg-zinc-100" />
        <div className="h-4 rounded bg-zinc-100" />
        <div className="h-4 w-2/3 rounded bg-zinc-100" />
      </div>

      <div className="mt-6 h-4 w-32 rounded bg-zinc-200" />

      <div className="mt-6 border-t border-zinc-100 pt-4">
        <div className="h-5 w-24 rounded bg-zinc-200" />
      </div>
    </div>
  )
}