'use client'
import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { loginSchema, type LoginInput } from "@/lib/validations/auth"
import { loginAction } from "./actions"


export function LoginForm(){
    const [serverError, setServerError] = useState<string | null>(null)
    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<LoginInput>({
        resolver: zodResolver(loginSchema)
    })

    async function onSubmit(data: LoginInput) {
        setServerError(null)
        const result = await loginAction(data)
        if(!result.success){
            setServerError(result.message)
        }
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="form-control flex flex-col gap-2">
                <label htmlFor="email" className="label">Email</label>
                <input id="email" className="input input-bordered mt-1 block w-full" type="email" {...register("email")} />
                {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
            </div>
            <div className="form-control flex flex-col gap-2">
                <label htmlFor="password" className="label">Password</label>
                <input id="password" className="input input-bordered mt-1 block w-full" type="password" {...register("password")} />
                {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
            </div>
            {serverError && <div className="text-red-500">{serverError}</div>}
            <button type="submit" className="btn btn-primary w-full" disabled={isSubmitting}>{isSubmitting ? "Logging in..." : "Login"}</button>
        </form>
    )
}