"use server"
import { createEvent, updateEvent, deleteEvent } from "@/server/services/event.service"
import { updateTag } from "next/cache"
import { redirect } from "next/navigation"
import { AppError } from "@/server/errors/app-error"


export async function createEventAction(data: unknown){  
   await createEvent(data)
   updateTag("events")
   redirect("/events")    
}

export async function updateEventAction(id: string, data: unknown){
    await updateEvent(id, data)
    updateTag("events")
    updateTag(`events-${id}`)
    redirect(`/events/${id}`)
}

type DeleteEventResult =
  | {
      success: true
    }
  | {
      success: false
      message: string
    }

export async function deleteEventAction(id: string): Promise<DeleteEventResult> {
  try {
    await deleteEvent(id)
    updateTag("events")
    updateTag(`events-${id}`)
    
    return {
      success: true,
    }
  } catch (error) {
    if (error instanceof AppError) {
      return {
        success: false,
        message: error.message,
      }
    }

    console.error(error)

    return {
      success: false,
      message: "Could not delete the event.",
    }
  }
}