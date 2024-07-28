import Google from '@auth/core/providers/google'
import {sql} from '@vercel/postgres'
import NextAuth from 'next-auth'
import Credentials from 'next-auth/providers/credentials'
import {z} from 'zod'
import {authConfig} from './auth.config'

type User = {
  id: string;
  name: string;
  email: string;
  password: string;
};

async function getUser(email: string): Promise<User | undefined> {
  try {
    const user = await sql<User>`SELECT * FROM users WHERE email=${email}`
    return user.rows[0]
  } catch (error) {
    console.error('Failed to fetch user:', error)
    throw new Error('Failed to fetch user.')
  }
}

export const { auth, signIn, signOut, handlers: { GET, POST } } = NextAuth(
  {
    ...authConfig,
    providers: [
      Google({
               clientId: process.env.AUTH_GOOGLE_ID,
               clientSecret: process.env.AUTH_GOOGLE_SECRET
             }),
      Credentials(
        {
          async authorize(credentials) {
            const parsedCredentials = z
              .object({ email: z.string().email(), password: z.string().min(6) })
              .safeParse(credentials)

            if (parsedCredentials.success) {
              const { email, password } = parsedCredentials.data
              const user = await getUser(email)
              if (!user) return null

              const bcrypt = require('bcrypt')
              const passwordsMatch = await bcrypt.compare(password, user.password)

              if (passwordsMatch) return user
            }

            console.log('Invalid credentials')
            return null
          },
        }),
    ],
  })