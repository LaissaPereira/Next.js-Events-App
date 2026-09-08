"use server"
import { signIn } from  "@/auth"
import { AuthError } from "next-auth"
import { loginSchema } from "@/lib/validations/auth"

export type LoginActionResult = 
| {
      success: true
    }
  | {
      success: false
      message: string
    }


export async function loginAction(data: unknown): Promise<LoginActionResult> {
    const result = loginSchema.safeParse(data) 
    if(!result.success){
        return {
            success: false,
            message: "Invalid login data"
        }
    }
    try {
        await signIn("credentials", {
            email: result.data.email,
            password: result.data.password,
            redirectTo: "/events"
        })
        return {
            success: true
        }
    } catch (error) {
        if(error instanceof AuthError){
            return {
                success: false,
                message: "Invalid email or password"
            }
        }
        throw error
    }
    return { 
        success: true
    }
}