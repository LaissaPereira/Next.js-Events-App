

export function RecommendedEventsSkeleton() {
    return (
         <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({
        length: 3,
      }).map((_, index) => (
        <div
          key={index}
          className="animate-pulse rounded-2xl border border-zinc-200 bg-white p-5"
        >
          <div className="h-6 w-24 rounded-full bg-zinc-200" />

          <div className="mt-5 h-6 w-3/4 rounded bg-zinc-200" />

          <div className="mt-3 h-4 w-1/2 rounded bg-zinc-200" />

          <div className="mt-6 h-4 w-2/3 rounded bg-zinc-100" />
        </div>
      ))}
    </div>
    )
}