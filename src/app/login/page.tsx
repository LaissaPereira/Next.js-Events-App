import { LoginForm } from "./LoginForm"

export default function LoginPage() {
    return (
        <main>
            <section className="mx-auto max-w-md">
            <div className="card bg-base-100 shadow-md">
                <div className="card-body">
                <div className="mb-4">
                    <h1 className="text-3xl font-bold">Login</h1>
                    <p className="mt-2 text-base-content/70">Sign in to manage your events</p>
                </div>
                <LoginForm />
                </div>
            </div>
            </section>
        </main>
    )
}