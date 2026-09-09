import { EventCardSkeleton } from "@/components/EventCardSkeleton"

export default function LoadingEvents(){
    return (
         <main className="mx-auto min-h-screen max-w-6xl px-6 py-12">
      <section className="mb-10">
        <div className="h-4 w-24 animate-pulse rounded bg-zinc-200" />

        <div className="mt-4 h-10 w-48 animate-pulse rounded bg-zinc-200" />

        <div className="mt-4 h-5 w-96 max-w-full animate-pulse rounded bg-zinc-100" />
      </section>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({
          length: 6,
        }).map((_, index) => (
          <EventCardSkeleton
            key={index}
          />
        ))}
      </div>
    </main>
    )
}