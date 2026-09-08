import { RegisterForm } from "./RegisterForm"


export default function RegisterPage() {
    return (
        <main>
            <section className="mx-auto max-w-md">
            <div className="card bg-base-100 shadow-md">
                <div className="card-body">
                <div className="mb-4">
                    <h1 className="text-3xl font-bold">Create Account</h1>
                    <p className="mt-2 text-base-content/70">Sign up to create and manage events</p>
                </div>
                <RegisterForm />
                </div>
            </div>
            </section>
        </main>
    )
}