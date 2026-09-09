import { redirect } from "next/navigation"
import { EventForm } from "@/components/EventForm"
import { getCurrentUser } from "@/server/auth/current-user"

export const instant = false

export default async function CreateEventPage(){
    const user = await getCurrentUser()

    if (!user) {
        redirect("/login")
    }

    return(
        <main>
            <section className="mx-auto max-w-2xl p-4">
                <div className="card bg-base-100 shadow-md">
                    <div className="card-body">
                        <div className="mb-4">
                            <h1 className="text-3xl font-bold">Create Event</h1>
                            <p className="mt-2 text-base-content/70">Fill out the form below to create a new event.</p>
                        </div>
                        <EventForm />
                    </div>
                </div>
            </section>
        </main>
    )
}