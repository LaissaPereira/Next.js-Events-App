import { auth } from "@/auth"
import { getUserById } from "@/server/repositories/user.repository"

export async function getCurrentUser() {
    const session = await auth()
    if (!session?.user?.id){
        return null
    }

    return getUserById(session.user.id)
}