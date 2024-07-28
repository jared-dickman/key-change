import Google from '@auth/core/providers/google'
import NextAuth from 'next-auth'
import {authConfig} from './auth.config'

export const { auth, signIn, signOut, handlers: { GET, POST } } = NextAuth(
  {
    ...authConfig,
    providers: [
      Google({
               clientId: process.env.AUTH_GOOGLE_ID,
               clientSecret: process.env.AUTH_GOOGLE_SECRET
             }),
    ],
  })
