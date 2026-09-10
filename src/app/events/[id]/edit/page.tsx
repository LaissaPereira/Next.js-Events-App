import { findEvent } from "@/server/services/event.service"
import { notFound, redirect } from "next/navigation"  
import { EventForm } from "@/components/EventForm"
import { getCurrentUser } from "@/server/auth/current-user"

export const instant = false

type EditEventPageProps = {
    params: Promise<{id: string}>
}


export default async function EditEventPage({params}: EditEventPageProps){
    const user = await getCurrentUser();
    if(!user){
        redirect("/login")
    }
    const { id } = await params
    const event = await findEvent(id)

    if(!event){
        notFound()
    }
    
    if(event.organizerId !== user.id && user.role !== "ADMIN"){
        redirect(`/events/${id}`)
    }

    return(
        <main>
            <section className="mx-auto max-w-2xl p-4">
            <div className="card bg-base-100 shadow-md mt-6">
            <div className="card-body">
            <h1 className="text-3xl font-bold">Edit Event</h1>
            <div className="divider"></div>
            
            <EventForm event={{
                id: event.id,
                title: event.title,
                description: event.description,
                date: event.date.toString().split("T")[0],
                location: event.location
            }} />
            </div>
            </div>
            </section>
        </main>
    )
}