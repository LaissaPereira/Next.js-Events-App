"use server"
import { createEvent, updateEvent, deleteEvent } from "@/server/services/event.services"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"


export async function createEventAction(data: unknown){
   
   await createEvent(data)
   revalidatePath("/events")
   redirect("/events")    
}

export async function updateEventAction(id: string, data: unknown){
    await updateEvent(id, data)
    revalidatePath("/events")
    revalidatePath(`/events/${id}`)
    redirect(`/events/${id}`)
}

export async function deleteEventAction(id: string){
    await deleteEvent(id)
    revalidatePath("/events")
    redirect("/events")
}