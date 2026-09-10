"use server"
import { revalidatePath } from "next/cache"
import { changeUserRole } from "@/server/services/admin.service"
import { AppError } from "@/server/errors/app-error"

type ChangeRoleResult = 
    | { success: true }
    | { success: false, message: string }

export async function changeUserRoleAction( userId: string, role: "USER" | "ADMIN"): Promise<ChangeRoleResult> {
    try {
        await changeUserRole(userId, role)
        revalidatePath("/admin")

        return { success: true }

    } catch(error){
        if (error instanceof AppError) {
            return { success: false, message: error.message}
        }
        console.error(error)

        return {
            success: false,
            message: "Could not update user role"
        }

    }
}


