import {Pages} from '@/constants/Pages'
import type {NextAuthConfig} from 'next-auth'

export const authConfig = {
  // Use the pages option to specify the route for custom sign-in, sign-out, and error pages.
  // This is not required, but by adding signIn: '/login' into our pages option, the user will be redirected to our custom login page
  // Rather than the NextAuth.js default page.
  // pages: { signIn: '/login', },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user
      const isOnStudio = nextUrl.pathname.startsWith(`/${Pages.Studio}`)
      if (isOnStudio) {
        return isLoggedIn // Redirect unauthenticated users to login page
      } else if (isLoggedIn) {
        return Response.redirect(new URL(`/${Pages.Studio}`, nextUrl))
      }
      return true
    },
  },
  providers: [],
} satisfies NextAuthConfig
