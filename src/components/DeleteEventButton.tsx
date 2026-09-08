'use client'
import { deleteEventAction } from "@/app/events/actions"

type DeleteEventButtonProps = {
    id: string
}

export default function DeleteEventButton({ id }: DeleteEventButtonProps){

    async function handleDelete(){
        await deleteEventAction(id)
    }
    return (
        <button onClick={handleDelete} className="btn btn-error btn-outline">Delete</button>
    )
}