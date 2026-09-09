import Link from "next/link"


export default function EventNotFound(){
    return(
         <main className="flex min-h-[70vh] items-center justify-center px-6">
      <div className="max-w-md text-center">
        <p className="text-6xl">
          🗺️
        </p>

        <p className="mt-6 text-sm font-semibold uppercase tracking-widest text-zinc-500">
          404
        </p>

        <h1 className="mt-2 text-3xl font-bold tracking-tight">
          Event not found
        </h1>

        <p className="mt-4 text-zinc-600">
          This event may have been
          deleted or the link may be
          incorrect.
        </p>

        <Link
          href="/events"
          className="mt-7 inline-flex rounded-xl bg-zinc-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-zinc-800"
        >
          Back to Events
        </Link>
      </div>
    </main>
    )
}