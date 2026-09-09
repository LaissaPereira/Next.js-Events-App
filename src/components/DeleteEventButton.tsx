"use client"
import { useState, useTransition } from "react" 
import { deleteEventAction } from "@/app/events/actions"

type DeleteEventButtonProps = {
    eventId: string
}

export default function DeleteEventButton({ eventId }: DeleteEventButtonProps){
    const [ error, setError ] = useState<string | null>(null)
    const [isPending, startTransition] = useTransition()


    async function handleDelete(){
        const confirmed = window.confirm("Are you sure you want to delete this event?")
        if (!confirmed) {
            return
        }
        setError(null)
        
        startTransition(async () => {
            const result = await deleteEventAction(eventId)
            if (!result.success) {
                setError(result.message)
            }
        })
        
    }
    return (
        <div>
      <button
        type="button"
        onClick={handleDelete}
        disabled={isPending}
        className="btn btn-ghost btn-sm text-error hover:bg-error/10"
      >
        {isPending
          ? "Deleting..."
          : "Delete"}
      </button>

      {error && (
        <p className="mt-2 text-sm text-red-600">
          {error}
        </p>
      )}
    </div>
    )
}