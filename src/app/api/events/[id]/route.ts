import { findEvent, updateEvent, deleteEvent } from "@/server/services/event.service"
import { getCurrentUser } from "@/server/auth/current-user"
import { handleApiError } from "@/server/http/handle-api-error"
import { AppError } from "@/server/errors/app-error"

type RouteContext = {
    params: Promise<{id: string}>
}

export async function GET(request: Request, {params}: RouteContext){
    const { id } = await params

    try {
        const event = await findEvent(id)
        if(!event){
            throw new AppError("NOT_FOUND", "Event not found")
        }
        return Response.json(event)
    } catch (error) {
        return handleApiError(error)
    }

}

export async function PATCH( request: Request, {params}: RouteContext){
    const user = await getCurrentUser();
    if(!user){
        return Response.json({ message: "Unauthenticated" }, { status: 401 })
    }

    const { id } = await params
    const body = await request.json()
    
    try {
        const updated = await updateEvent(id, body)
        if(!updated){
            throw new AppError("NOT_FOUND", "Event not found")
        }

        return Response.json(updated)
    } catch (error) {
        return handleApiError(error)
    }
}

export async function DELETE(request: Request, {params}: RouteContext){
    const user = await getCurrentUser();
    if(!user){
        return Response.json({ message: "Unauthenticated" }, { status: 401 })
    }

    const { id } = await params

    try {
        const deleted = await deleteEvent(id)

    if(!deleted){
        throw new AppError("NOT_FOUND", "Event not found")
    }

        return Response.json(null, { status: 204 })
    } catch (error) {
        return handleApiError(error)
    }
}
