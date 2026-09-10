import Link from "next/link"
import { redirect } from "next/navigation"
import { getAdminDashboardData } from "@/server/services/admin.service"
import { getCurrentUser } from "@/server/auth/current-user"
import { UserRoleButton } from "@/components/UserRoleButton"

export const instant = false

export default async function AdminPage() {

  const user = await getCurrentUser()
  if (!user) {
    redirect("/login")
  }
  if (user.role !== "ADMIN") {
    redirect("/events")
  }

  const { events, users, status } = await getAdminDashboardData()

  return (
    <main className="mx-auto max-w-6xl px-6 py-12">
      <section className="mb-10">

        <section className="mb-12 grid gap-4 sm:grid-cols-3">
          <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
            <p className="text-sm text-zinc-500">
              Total Users
            </p>

            <p className="mt-2 text-3xl font-bold">
              {status.totalUsers}
            </p>
          </div>

          <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
            <p className="text-sm text-zinc-500">
              Total Events
            </p>

            <p className="mt-2 text-3xl font-bold">
              {status.totalEvents}
            </p>
          </div>

          <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
            <p className="text-sm text-zinc-500">
              Admins
            </p>

            <p className="mt-2 text-3xl font-bold">
              {status.totalAdmins}
            </p>
          </div>
        </section>

        <p className="text-sm font-medium uppercase tracking-widest text-zinc-500">
          Administration
        </p>

        <h1 className="mt-2 text-4xl font-bold tracking-tight">
          Admin Dashboard
        </h1>

        <p className="mt-3 text-zinc-600">
          Logged in as {user.name ?? user.email}
        </p>
      </section>

      <section>
        <div className="mb-6 flex items-end justify-between">
          <div>
            <h2 className="text-2xl font-bold">
              Manage Events
            </h2>

            <p className="mt-1 text-sm text-zinc-500">
              {events.length} event{events.length === 1 ? "" : "s"}
            </p>
          </div>
        </div>

        {events.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-zinc-300 p-10 text-center">
            <p className="text-sm text-zinc-500">No events yet.</p>
          </div>
        ) : (
          <div className="overflow-hidden rounded-2xl border border-zinc-200 bg-white">
            {events.map((event) => (
              <div
                key={event.id}
                className="flex flex-col gap-4 border-b border-zinc-100 p-5 last:border-b-0 sm:flex-row sm:items-center sm:justify-between"
              >
                <div>
                  <h3 className="font-semibold">
                    {event.title}
                  </h3>

                  <p className="mt-1 text-sm text-zinc-500">
                    {event.location}
                  </p>

                  <p>
                    Organizer:{" "}
                    <span className="font-medium text-zinc-700">
                      {event.organizer.name ?? "No name"}
                    </span>
                  </p>

                  <p>{event.organizer.email}</p>

                  <span className="mt-2 inline-flex rounded-full bg-zinc-100 px-2.5 py-1 text-xs font-medium text-zinc-700">
                    {event.organizer.role}
                  </span>
                </div>

                <div className="flex gap-2">
                  <Link
                    href={`/events/${event.id}`}
                    className="btn btn-ghost btn-sm"
                  >
                    View
                  </Link>

                  <Link
                    href={`/events/${event.id}/edit`}
                    className="btn btn-primary btn-sm"
                  >
                    Edit
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
      <section className="mt-12">
        <div className="mb-6">
          <h2 className="text-2xl font-bold">
            Users
          </h2>

          <p className="mt-1 text-sm text-zinc-500">
            Manage registered users and their roles.
          </p>
        </div>

        {users.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-zinc-300 p-10 text-center">
            <p className="text-sm text-zinc-500">No users yet.</p>
          </div>
        ) : (
          <div className="overflow-hidden rounded-2xl border border-zinc-200 bg-white">
            {users.map((registeredUser) => {
              const isCurrentUserAdmin = registeredUser.id === user.id
              return (
                <div
                  key={registeredUser.id}
                  className="flex flex-col gap-4 border-b border-zinc-100 p-5 last:border-b-0 sm:flex-row sm:items-center sm:justify-between"
                >
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold">
                        {registeredUser.name ?? "No name"}
                      </h3>

                      <span
                        className={
                          registeredUser.role === "ADMIN"
                            ? "rounded-full bg-zinc-900 px-2.5 py-1 text-xs font-medium text-white"
                            : "rounded-full bg-zinc-100 px-2.5 py-1 text-xs font-medium text-zinc-700"
                        }
                      >
                        {registeredUser.role}
                      </span>
                    </div>

                    <p className="mt-1 text-sm text-zinc-500">
                      {registeredUser.email}
                    </p>

                    <p className="mt-2 text-sm text-zinc-500">
                      {registeredUser.eventCount}{" "}
                      event
                      {registeredUser.eventCount === 1 ? "" : "s"}{" "}
                      created
                    </p>
                  </div>

                  {isCurrentUserAdmin && (
                    <div>
                      <span className="text-xs text-zinc-400">
                        You
                      </span>
                    </div>
                  )}

                  {!isCurrentUserAdmin && (
                    <UserRoleButton
                      userId={registeredUser.id}
                      currentRole={registeredUser.role}
                    />
                  )}
                </div>
              )
            })}
          </div>
        )}
      </section>

    </main>
  )
}