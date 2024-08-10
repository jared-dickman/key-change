import NextAuth from 'next-auth'
import {authConfig} from './auth.config'

export const { signIn, signOut, handlers: { GET, POST } } = NextAuth({ ...authConfig })
