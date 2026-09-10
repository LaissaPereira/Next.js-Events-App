"use client"

import { useState, useTransition } from "react"
import { changeUserRoleAction } from "@/app/admin/actions"


type UserRoleButtonProps ={
    userId: string
    currentRole: "USER" | "ADMIN"
}

export function UserRoleButton({userId, currentRole}: UserRoleButtonProps){
    const [isPending, startTransition] = useTransition()
    const [error, setError] = useState<string | null>(null)

    const nextRole = currentRole === "USER" ? "ADMIN" : "USER"
    const label = currentRole === "USER" ? "Make Admin" : "Remove Admin"

    function handleClick(){
        setError(null)
        if(currentRole === "ADMIN"){
            const confirm = window.confirm("Are you sure you want to remove admin access from this user?")
            if(!confirm){
                return
            }
        }

        startTransition(async () => {
            const result = await changeUserRoleAction(userId, nextRole)
            if(!result.success){
                setError(result.message)
            }
        })
    }


    return(
        <div className="flex flex-col items-end gap-1">
            <button type="button" onClick={handleClick} disabled={isPending} 
            className={ currentRole === "ADMIN" ? "btn btn-sm btn-ghost text-error hover:bg-error/10" :"btn btn-sm btn-outline"}>
                {isPending ? "Updating..." : label}
            </button>
            {error && <p className="text-xs text-error">{error}</p>}
        </div>
    )


}