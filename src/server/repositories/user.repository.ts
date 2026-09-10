import { db } from "@/prisma/db"


export async function getUserByEmail(email: string){
    return await db.orm.public.User.first({ email })
}

export async function getUserById(id: string){
    return await db.orm.public.User.first({ id })
}

export async function getAllUsers(){
    return await db.orm.public.User.all()
}
export async function updateUserRole(userId: string, role: "USER" | "ADMIN"){
    return await db.orm.public.User
    .where({id:userId})
    .update({ role})
}

export async function createUserInDatabase(data:{
    name: string
    email: string
    passwordHash: string
}){
    return await db.orm.public.User.create({
        name: data.name,
        email: data.email,
        passwordHash: data.passwordHash
    })
}