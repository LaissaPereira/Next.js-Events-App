import Link from "next/link"
import { redirect } from "next/navigation"
import { listEventsWithOrganizer } from "@/server/services/event.services"
import { getCurrentUser } from "@/server/auth/current-user"

export const instant = false

export default async function AdminPage(){

    const user = await getCurrentUser()
    if (!user) {
        redirect("/login")
    }
    if (user.role !== "ADMIN") {
        redirect("/events")
    }

    const events = await listEventsWithOrganizer()

    return (
    <main className="mx-auto max-w-6xl px-6 py-12">
      <section className="mb-10">
        <p className="text-sm font-medium uppercase tracking-widest text-zinc-500">
          Administration
        </p>

        <h1 className="mt-2 text-4xl font-bold tracking-tight">
          Admin Dashboard
        </h1>

        <p className="mt-3 text-zinc-600">
          Logged in as {user.name ?? user.email}
        </p>
      </section>

      <section>
        <div className="mb-6 flex items-end justify-between">
          <div>
            <h2 className="text-2xl font-bold">
              Manage Events
            </h2>

            <p className="mt-1 text-sm text-zinc-500">
              {events.length} event{events.length === 1 ? "" : "s"}
            </p>
          </div>
        </div>

        <div className="overflow-hidden rounded-2xl border border-zinc-200 bg-white">
          {events.map((event) => (
            <div
              key={event.id}
              className="flex flex-col gap-4 border-b border-zinc-100 p-5 last:border-b-0 sm:flex-row sm:items-center sm:justify-between"
            >
              <div>
                <h3 className="font-semibold">
                  {event.title}
                </h3>

                <p className="mt-1 text-sm text-zinc-500">
                  {event.location}
                </p>

                <p>
        Organizer:{" "}
            <span className="font-medium text-zinc-700">
            {event.organizer.name ?? "No name"}
            </span>
            </p>

            <p>{event.organizer.email}</p>

            <span className="mt-2 inline-flex rounded-full bg-zinc-100 px-2.5 py-1 text-xs font-medium text-zinc-700">
                {event.organizer.role}
            </span>
              </div>

              <div className="flex gap-2">
                <Link
                  href={`/events/${event.id}`}
                  className="rounded-lg border border-zinc-200 px-3 py-2 text-sm font-medium hover:bg-zinc-50"
                >
                  View
                </Link>

                <Link
                  href={`/events/${event.id}/edit`}
                  className="rounded-lg bg-zinc-900 px-3 py-2 text-sm font-medium text-white hover:bg-zinc-700"
                >
                  Edit
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  )
}