import { listEvents, createEvent } from "@/server/services/event.service"
import { getCurrentUser } from "@/server/auth/current-user"
import { handleApiError } from "@/server/http/handle-api-error"


export async function GET(){
    try{
        const events = await listEvents()
        return Response.json(events)
    } catch (error) {
        return handleApiError(error)
    }
}

export async function POST(request: Request){
    const user = await getCurrentUser();
    if(!user){
        return Response.json({ message: "You must be logged in to perform this action", error: "UNAUTHENTICATED" }, { status: 401 })
    }
   const body = await request.json()

   try {
       const event = await createEvent(body)
       return Response.json(event, {
         status: 201
       })
   } catch (error) {
       return handleApiError(error)
   }

}


