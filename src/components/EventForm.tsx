'use client'
import Link from "next/link"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

import { createEventAction, updateEventAction } from "@/app/events/actions"
import { eventSchema, type EventInput } from "@/lib/validations/event"


type EventFormProps = {
    event?: EventInput & { id: string }
}

export function EventForm({ event }: EventFormProps){
   const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm<EventInput>({
       resolver: zodResolver(eventSchema),
       defaultValues: event ? {
           title: event.title,
           description: event.description,
           location: event.location,
           date: event.date
       } : undefined
   })

    async function onSubmit(data: EventInput){   
       if(event){
        await updateEventAction(event.id, data)
       } else {
        await createEventAction(data)
       }
       reset()
    }

    return(
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="form-control flex flex-col gap-2">
                <label htmlFor="title" className="label">Title</label>
                <input id="title" className="input input-bordered" {...register("title")} />
                {errors.title && <span className="text-red-500">{errors.title.message}</span>}
            </div>
            <div className="form-control flex flex-col gap-2">
                
                <label htmlFor="description" className="label">Description</label>
                <input id="description" className="input input-bordered" {...register("description")} />
                {errors.description && <span className="text-red-500">{errors.description.message}</span>}
            </div>
            <div className="form-control flex flex-col gap-2">
                <label htmlFor="location" className="label">Location</label>
                <input id="location" className="input input-bordered" {...register("location")} />
                {errors.location && <span className="text-red-500">{errors.location.message}</span>}
            </div>
            <div className="form-control flex flex-col gap-2">
                <label htmlFor="date" className="label">Date</label>
                <input id="date" type="date" className="input input-bordered" {...register("date")} />
                {errors.date && <span className="text-red-500">{errors.date.message}</span>}
            </div>
            <div className="space-y-4 flex justify-end">
            <div className="flex gap-3">
                <Link href="/events" className="btn btn-outline">Cancel</Link>
                <button type="submit" className="btn btn-primary" disabled={isSubmitting}>{isSubmitting ? "Submitting..." : event ? "Update Event" : "Create Event"}</button>
            </div>
            </div>
        </form>
    )
}