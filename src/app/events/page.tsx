import { listEvents } from "@/server/services/event.services"
import { EventCard } from "@/components/EventCard"
import { sortDateEvents } from "@/utils/sortDateEvents"


export default async function EventsPage(){
   const events = await listEvents()
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
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mt-8">
                    {sortedEvents.map((event) => (
                        <EventCard key={event.id} event={event} />
                    ))}
                </div>
            )}
        </main>
    )
}