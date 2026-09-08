"use server"
import { registerUser } from "@/server/services/user.service"
import { redirect } from "next/navigation"
import { ZodError } from "zod"
import { AppError } from "@/server/errors/app-error"


type RegisterActionResult = 
| {
      success: true
    }
  | {
      success: false
      message: string
    }

export async function registerAction(data: unknown): Promise<RegisterActionResult>{
    try {
        await registerUser(data)
    }catch(error){
        if(error instanceof AppError){
            return {
                success: false,
                message: error.message
            }
        }
        if(error instanceof ZodError){
            return {
                success: false,
                message: "Invalid registration data",
            }
        }
        return {
            success: false,
            message: "An unexpected error occurred"
        }
    }
    redirect("/login")
}