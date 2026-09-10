export default function LoadingAdmin() {
  return (
    <main className="mx-auto max-w-6xl px-6 py-12">
      <section className="mb-10">
        <section className="mb-12 grid gap-4 sm:grid-cols-3">
          {Array.from({ length: 3 }).map((_, index) => (
            <div key={index} className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
              <div className="h-4 w-24 animate-pulse rounded bg-zinc-200" />
              <div className="mt-4 h-8 w-16 animate-pulse rounded bg-zinc-200" />
            </div>
          ))}
        </section>

        <div className="h-4 w-32 animate-pulse rounded bg-zinc-200" />
        <div className="mt-4 h-10 w-64 animate-pulse rounded bg-zinc-200" />
        <div className="mt-4 h-5 w-48 animate-pulse rounded bg-zinc-100" />
      </section>

      <section>
        <div className="mb-6 h-7 w-40 animate-pulse rounded bg-zinc-200" />

        <div className="overflow-hidden rounded-2xl border border-zinc-200 bg-white">
          {Array.from({ length: 3 }).map((_, index) => (
            <div key={index} className="border-b border-zinc-100 p-5 last:border-b-0">
              <div className="h-5 w-1/3 animate-pulse rounded bg-zinc-200" />
              <div className="mt-2 h-4 w-1/2 animate-pulse rounded bg-zinc-100" />
            </div>
          ))}
        </div>
      </section>
    </main>
  )
}
