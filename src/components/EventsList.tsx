"use client"
import type { Event } from "@/types/event"
import { EventCard } from "./EventCard"
import Link from "next/link"
import DeleteEventButton from "./DeleteEventButton"

type CurrentUser = {
  id: string
  role: "ADMIN" | "USER"
}

type EventsListProps = {
    events: Event[]
    currentUser: CurrentUser | null
}

export function EventsList({ events, currentUser }: EventsListProps) {
    if (events.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-zinc-300 p-10 text-center">
        <h2 className="text-lg font-semibold">
          No events yet
        </h2>

        <p className="mt-2 text-sm text-zinc-500">
          There are no events to show yet.
        </p>
      </div>
    )
  }
     
  return (
    
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {events.map((event) => {
          const canManage = currentUser !== null && (currentUser.id === event.organizerId || currentUser.role === "ADMIN")
          return (
            <div key={event.id} className="flex flex-col gap-2">
              <EventCard
            key={event.id}
            event={event}
            actions={
              canManage ? (
                <>
                  <Link
                    href={`/events/${event.id}/edit`}
                    className="btn btn-ghost btn-sm"
                  >
                    Edit
                  </Link>

                  <DeleteEventButton
                    eventId={event.id}
                  />
                </>
              ) : null
            }
              />
            </div>
          )
        })}
      </div>
  )
}
