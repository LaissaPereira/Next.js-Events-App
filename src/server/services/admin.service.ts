import { getAllUsers } from "@/server/repositories/user.repository"
import { listEventsWithOrganizer } from "@/server/services/event.service"

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