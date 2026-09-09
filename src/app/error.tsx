"use client"

export default function GlobalError({ error, reset }: { error: Error, reset: () => void }) {

    return (
    <main className="flex min-h-[70vh] items-center justify-center px-6">
      <div className="max-w-md text-center">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-red-50 text-2xl">
          ⚠️
        </div>

        <h1 className="mt-6 text-2xl font-bold tracking-tight">
          Something went wrong
        </h1>

        <p className="mt-3 text-zinc-600">
          {error.message || "An unexpected error occurred. Please try again."}
        </p>

        <button
          onClick={reset}
          className="mt-6 rounded-xl bg-zinc-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-zinc-800"
        >
          Try again
        </button>
      </div>
    </main>
    )
}
