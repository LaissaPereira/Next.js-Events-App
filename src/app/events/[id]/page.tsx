import { findEvent } from "@/server/services/event.services"
import { notFound } from "next/navigation"
import Link from "next/link"
import DeleteEventButton from "@/components/DeleteEventButton"
import { getCurrentUser } from "@/server/auth/current-user"


type EventDetailsPageProps = {
    params: Promise<{id: string}>
}


export default async function EventDetailsPage({ params }: EventDetailsPageProps){
    const { id } = await params
    const event = await findEvent(id)
    
    if(!event){
        notFound()
    }

    const user = await getCurrentUser();
    const canManageEvent = user?.id === event.organizerId;

    const formattedDate = new Date(event.date.toString()).toLocaleDateString('en-GB', { 
        day: '2-digit', 
        month: '2-digit', 
        year: 'numeric' 
    })

    return(
        <main>
            <section className="mx-auto max-w-2xl p-4">
            <h1 className="text-3xl font-bold">Event Details</h1>
            <div className="divider"></div>
            <div className="card bg-base-100 shadow-md mt-6">
            <div className="card-body">
            <h1 className="text-3xl font-bold">{event.title}</h1>
            <p className="mt-4">{event.description}</p>
            <div className="mt-6 space-y-2">
            <p> <strong>Date:</strong> 📅 {" "} {formattedDate}</p>
            <p><strong>Location:</strong>📍{" "} {event.location}</p>
            </div>
            <div className="card-actions mt-6 justify-between">
            <Link href="/events" className="btn btn-outline">Back to Events</Link>
            <div className="flex gap-3"> 
            {canManageEvent && (
                <>
                    <Link href={`/events/${event.id}/edit`} className="btn btn-secondary">Edit Event</Link>
                    <DeleteEventButton id={id} />
                </>
            )}
            </div>
            </div>
            </div>
            </div>
            </section>
        </main>
    )
}