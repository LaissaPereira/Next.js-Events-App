import { AppError } from "@/server/errors/app-error"
import { getCurrentUser } from "./current-user"

export async function requireCurrentUser() {
    const user = await getCurrentUser()

    if (!user){
        throw new AppError("UNAUTHENTICATED", "User must be authenticated to perform this action.")
    }
    return user
}

export async function requireAdminUser(){
    const user = await requireCurrentUser()

    if (user.role !== "ADMIN") {
        throw new AppError("FORBIDDEN", "User must be an admin to perform this action.")
    }
    return user
}