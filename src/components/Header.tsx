import Link from "next/link"
import { getCurrentUser } from "@/server/auth/current-user"
import { logoutAction } from "@/app/logout/actions"



export async function Header() {
    const user = await getCurrentUser();

    return (
        <header className="navbar sticky top-0 z-10 border-b border-base-300 bg-base-100 px-4 shadow-sm">
            <div className="mx-auto flex w-full max-w-6xl">
                <div className="flex-1">
                    <Link href="/" className="text-xl font-bold text-primary">Events Scheduler App</Link>
                </div>
                <nav className="flex gap-2">
                    <Link href="/events" className="btn btn-ghost">Events</Link>
                    <Link href="/events/create" className="btn btn-primary">Create event</Link>
                    {user ? (
                        <form action={logoutAction}>
                            <button type="submit" className="btn btn-ghost">Logout</button>
                        </form>
                    ) : (
                        <>
                            <Link href="/login" className="btn btn-ghost">Login</Link>
                            <Link href="/register" className="btn btn-ghost">Register</Link>
                        </>
                    )}
                </nav>
            </div>
        </header>
    );
}