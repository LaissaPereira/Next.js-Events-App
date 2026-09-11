import { cacheTag } from "next/cache"
import { eventSchema } from "@/lib/validations/event"
import { createEventInDatabase, deleteEventInDatabase, getEventById, getEvents, getEventsCount, getEventsWithOrganizer, PAGE_SIZE, updateEventInDatabase } from "@/server/repositories/event.repository"
import { getCurrentUser } from "@/server/auth/current-user"
import { AppError } from "../errors/app-error"

export { PAGE_SIZE }

type ListEventsOptions = {
    search?: string
    page: number
}

export async function listEvents({search, page}: ListEventsOptions){
    "use cache"
    cacheTag("events")
    return await getEvents({search, page})
}

export async function countEvents({search}: { search?: string }){
    "use cache"
    cacheTag("events")
    return await getEventsCount({search})
}

export async function listEventsWithOrganizer(){
    "use cache"
    cacheTag("events")
    return await getEventsWithOrganizer()
}


export async function requireEvent(id: string){
    const event = await getEventById(id)
    if(!event){
        throw new AppError("NOT_FOUND", "Event not found")
    }
    return event
}
async function requiredCurrentUser(){
    const user = await getCurrentUser()
    if (!user) {
        throw new AppError("UNAUTHENTICATED", "You must be logged in")
    }
    return user
}
async function requireEventManager(eventId: string){
    const event = await requireEvent(eventId)
    const user = await requiredCurrentUser()
    const isOwner = event.organizerId === user.id
    const isAdmin = user.role === "ADMIN"

    if(!isOwner && !isAdmin){
        throw new AppError("FORBIDDEN", "You do not have permission to perform this action.")
    }
    
    return { user, event }
}
export async function findEvent(id: string){
    "use cache"
    cacheTag(`events-${id}`)
    return await getEventById(id)
}

export async function createEvent(data: unknown){
    const user = await requiredCurrentUser()

    const validatedData = eventSchema.parse(data)

    return await createEventInDatabase({
        title: validatedData.title,
        description: validatedData.description,
        location: validatedData.location,
        date: new Date(validatedData.date).toISOString(),
        organizerId: user.id
    })
}

export async function updateEvent(id: string, data: unknown){

    await requireEventManager(id)
    const validatedData = eventSchema.parse(data)

    return await updateEventInDatabase(id, {
        title: validatedData.title,
        description: validatedData.description,
        location: validatedData.location,
        date: new Date(validatedData.date).toISOString()
    })
}

export async function deleteEvent(id: string){

    await requireEventManager(id)

    return await deleteEventInDatabase(id)
}