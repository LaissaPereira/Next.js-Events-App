import { Suspense } from "react"
import { RecommendedEvents } from "@/components/RecommendedEvents"
import { RecommendedEventsSkeleton } from "@/components/RecommendedEventsSkeleton"
import { listEvents } from "@/server/services/event.service"
import { sortDateEvents } from "@/utils/sortDateEvents"
import { EventsList } from "@/components/EventsList"
import { getCurrentUser } from "@/server/auth/current-user"

export const instant = false

export default async function EventsPage(){

   const events = await listEvents()
   const user = await getCurrentUser()
   const transformedEvents = events.map(event => ({
      ...event,
      date: event.date.toString()
   }))
   const sortedEvents = sortDateEvents(transformedEvents)

    return (
        <main>
            <section className="mx-auto max-w-2xl p-4 text-center">
                <h1 className="text-3xl font-bold mt-4">Events</h1>
                <p className="mt-2 text-base-content/70">Browse the list of upcoming events below.</p>
            </section>
            {sortedEvents.length === 0 ? (
                <div className="mx-auto mt-8 max-w-md rounded-box bg-base-100 p-8 text-center shadow-sm">
                    <p className="text-base-content/70">No events yet. Create your first one!</p>
                </div>
            ) : (
                 <EventsList events={sortedEvents} currentUser={user ? {id: user.id, role: user.role} : null} />       
            )}
            <section className="mt-16">
        <div className="mb-6">
          <p className="text-sm font-medium uppercase tracking-widest text-zinc-500">
            Discover
          </p>

          <h2 className="mt-2 text-2xl font-bold tracking-tight">
            Recommended Events
          </h2>
        </div>
           
            <Suspense fallback={<RecommendedEventsSkeleton />}>
                <RecommendedEvents />
            </Suspense>
             </section>
        </main>
    )
}