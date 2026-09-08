'use client'
import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { registerSchema, type RegisterInput } from "@/lib/validations/auth"
import { registerAction } from "./actions"

export function RegisterForm(){
    const [serverError, setServerError] = useState<string | null>(null)
    const { register, handleSubmit, formState: { errors, isSubmitting }} = useForm<RegisterInput>({
        resolver: zodResolver(registerSchema)
    })

    
    async function onSubmit(data: RegisterInput) {
        setServerError(null)
        const result = await registerAction(data)
        if(!result.success){
            setServerError(result.message)
        }
    }


    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="form-control flex flex-col gap-2">
                <label htmlFor="name" className="label">Name</label>
                <input className="input input-bordered mt-1 block w-full" id="name" {...register("name")} />
                {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
            </div>
            <div className="form-control flex flex-col gap-2">
                <label htmlFor="email" className="label">Email</label>
                <input className="input input-bordered mt-1 block w-full" id="email" {...register("email")} />
                {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
            </div>
            <div className="form-control flex flex-col gap-2">
                <label htmlFor="password" className="label">Password</label>
                <input className="input input-bordered mt-1 block w-full" id="password" type="password" {...register("password")} />
                {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
            </div>
            {serverError && <div className="text-red-500">{serverError}</div>}
            <div className="space-y-4 flex justify-end">
                <button type="submit" className="btn btn-primary" disabled={isSubmitting}>{isSubmitting ? "Creating account..." : "Create account"}</button>
            </div>
        </form>
    )
}

