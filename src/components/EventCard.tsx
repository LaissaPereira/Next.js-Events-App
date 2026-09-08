import Link from "next/link"
import type { Event } from "@/types/event"


type EventCardProps = {
    event: Event
}

export function EventCard({ event }: EventCardProps){
    const formattedDate = new Date(event.date).toLocaleDateString('en-GB', { 
        day: '2-digit', 
        month: '2-digit', 
        year: 'numeric' 
    })
    return (
        <article className="card min-h-72 border border-base-300 bg-base-100 shadow-sm transition-shadow hover:shadow-md">
            <div className="card-body">
            <h2 className="card-title">{event.title}</h2>
            <p className="text-base-content/70">{event.description}</p>
            <div className="divider"></div>
            <div className="mt-3 space-y-1 text-sm">
            <p><strong>Location:</strong> 📍 {event.location}</p>
            <p><strong>Date:</strong> 🗓️ {formattedDate}</p>
            </div>
            <div className="card-actions mt-4 justify-end">
            <Link href={`/events/${event.id}`} className="btn btn-primary">View Details</Link>
            </div>
            </div>
        </article>
    )
}