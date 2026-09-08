import { db } from "@/prisma/db"

export async function getEvents(){
    return await db.orm.public.Event.all()
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