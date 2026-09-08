import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import bcrypt from "bcryptjs"

import { loginSchema } from "@/lib/validations/auth"
import { getUserByEmail } from "@/server/repositories/user.repository"


export const { auth, handlers, signIn, signOut } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const result =
          loginSchema.safeParse(credentials)

        if (!result.success) {
          return null
        }

        const { email, password } =
          result.data

        const user =
          await getUserByEmail(email)

        if (!user) {
          return null
        }

        const passwordMatches =
          await bcrypt.compare(
            password,
            user.passwordHash
          )

        if (!passwordMatches) {
          return null
        }

        return {
          id: user.id,
          email: user.email,
          name: user.name,
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
      }
      return token
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string
      }
      return session
    },
  },
})