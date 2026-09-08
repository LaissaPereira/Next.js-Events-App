import bcrypt from "bcryptjs"
import { registerSchema } from "@/lib/validations/auth"
import { createUserInDatabase , getUserByEmail } from "@/server/repositories/user.repository"
import { AppError } from "@/server/errors/app-error"


export async function registerUser(data: unknown){
    const validatedData = registerSchema.parse(data)

    const existingUser = await getUserByEmail(validatedData.email)
    if(existingUser){
        throw new AppError("EMAIL_ALREADY_EXISTS", "User with this email already exists")
    }

    const passwordHash = await bcrypt.hash(validatedData.password, 12)

    return await createUserInDatabase({
        name: validatedData.name,
        email: validatedData.email,
        password: passwordHash
    })
}