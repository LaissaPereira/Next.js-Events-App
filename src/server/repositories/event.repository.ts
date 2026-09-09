import { db } from "@/prisma/db"
import type { EventWithOrganizer } from "@/types/event"

export async function getEvents(){
    return await db.orm.public.Event.all()
}
export async function getEventsWithOrganizer(){
    // The ORM's generic `include()` typing doesn't resolve the related row shape for namespaced to-one relations, so assert the known shape.
    return db.orm.public.Event.include('organizer').all() as unknown as Promise<EventWithOrganizer[]>
}

export async function getEventById(id: string){
    return await db.orm.public.Event.first({
        id,
    })
}

export async function createEventInDatabase(data: { title: string, description: string, location: string, date: string, organizerId: string }){
    return await db.orm.public.Event.create({
        title: data.title,
        description: data.description,
        location: data.location,
        date: Temporal.Instant.fromEpochMilliseconds(new Date(data.date).getTime()),
        organizerId: data.organizerId,
    })
}

export async function updateEventInDatabase(id: string, data: { title: string, description: string, location: string, date: string }){
    return await db.orm.public.Event
        .where({ id })
        .update({
            title: data.title,
            description: data.description,
            location: data.location,
            date: Temporal.Instant.fromEpochMilliseconds(new Date(data.date).getTime()),
        })
}

export async function deleteEventInDatabase(id: string){
    return await db.orm.public.Event
        .where({ id })
        .delete()
}

