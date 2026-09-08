import { db } from "@/prisma/db"


export async function getUserByEmail(email: string){
    return await db.orm.public.User.first({ email })
}

export async function getUserById(id: string){
    return await db.orm.public.User.first({ id })
}

export async function createUserInDatabase(data:{
    name: string
    email: string
    password: string
}){
    return await db.orm.public.User.create({
        name: data.name,
        email: data.email,
        passwordHash: data.password
    })
}