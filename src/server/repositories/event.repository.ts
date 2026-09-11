import { db } from "@/prisma/db"
import { or } from "@prisma/orm-postgres/orm-client"
import type { EventWithOrganizer } from "@/types/event"

export const PAGE_SIZE = 6

type GetEventsOptions = { 
    search?: string
    page: number
}

function applySearchFilter(search: string | undefined) {
    let query = db.orm.public.Event

    if(search?.trim()){
        const term = `%${search.trim()}%`
        query = query.where((event)=>
            or(
                event.title.ilike(term),
                event.description.ilike(term),
                event.location.ilike(term)
            ))
    }
    return query
}

export async function getEvents({search, page}: GetEventsOptions){
    const skip = (page - 1) * PAGE_SIZE

    const events = await applySearchFilter(search)
    .orderBy((event) => event.date.asc())
    .offset(skip)
    .limit(PAGE_SIZE)
    .all()
    
    return events.map(serializeEvent)
    
}

export async function getEventsCount({search}: { search?: string }){
    const { total } = await applySearchFilter(search)
        .aggregate((agg) => ({ total: agg.count() }))
    return total
}
export async function getEventsWithOrganizer(){
    return db.orm.public.Event.include('organizer').all() as unknown as Promise<EventWithOrganizer[]>
}

export async function getEventById(id: string){
    const event = await db.orm.public.Event.first({
        id,
    })
    return event ? serializeEvent(event) : null
}

// Event.date/createdAt/updatedAt come back as Temporal.Instant, which isn't a plain
// object and breaks serialization at "use cache" boundaries and Client Component props.
function serializeEvent<T extends { date: { toString(): string }, createdAt: { toString(): string }, updatedAt: { toString(): string } }>(event: T){
    return {
        ...event,
        date: event.date.toString(),
        createdAt: event.createdAt.toString(),
        updatedAt: event.updatedAt.toString(),
    }
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

