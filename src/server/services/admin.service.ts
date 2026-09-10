import { getAllUsers } from "@/server/repositories/user.repository"
import { listEventsWithOrganizer } from "@/server/services/event.service"
import { AppError } from "@/server/errors/app-error"
import { getUserById,updateUserRole } from "@/server/repositories/user.repository"
import { requireAdminUser } from "@/server/auth/authorization"

export async function getAdminDashboardData(){
    const [users, events] = await Promise.all([
        getAllUsers(),
        listEventsWithOrganizer(),
    ])

    const usersWithEventCount = users.map((user) => {
        const eventCount = events.filter(
            (event) => event.organizerId === user.id
        ).length
        return {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
            eventCount: eventCount
        }
    })
    return {
        users: usersWithEventCount,
        events: events,
        status: {
            totalUsers: users.length,
            totalEvents: events.length,
            totalAdmins: users.filter((user) => user.role === "ADMIN").length
        }
    }

}

export async function changeUserRole( targetUserId: string, role: "USER" | "ADMIN"){
    const currentAdmin = await requireAdminUser()
    const targetUser = await getUserById(targetUserId)

    if (!targetUser){
        throw new AppError("NOT_FOUND", "User not found")
    }

    if(currentAdmin.id === targetUser.id){
        throw new AppError("FORBIDDEN", "You cannot change your own role")
    }

    return await updateUserRole(targetUser.id, role)
}