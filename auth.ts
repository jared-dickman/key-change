import {Pages} from '@/constants/Pages'
import {checkUserExists, createUser} from '@/lib/actions'
import NextAuth, {type NextAuthConfig} from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'

export const authConfig = {
  // Use the pages option to specify the route for custom sign-in, sign-out, and error pages.
  // This is not required, but by adding signIn: '/login' into our pages option, the user will be redirected to our custom login page
  // Rather than the NextAuth.js default page.
  // pages: { signIn: '/login', },
  callbacks: {
    async authorized({ auth, request: { nextUrl } }) {
      const user = auth?.user
      const isLoggedIn = !!user
      const isOnStudio = nextUrl.pathname.startsWith(`/${Pages.Studio}`)

      if (isLoggedIn) {
        try {
          const userExists = await checkUserExists(user)
          if (!userExists) await createUser(user)

        } catch (e) {
          console.error(e)
        }
      }

      if (isOnStudio) {
        return isLoggedIn // Redirect unauthenticated users to login page
      } else if (isLoggedIn) {
        return Response.redirect(new URL(`/${Pages.Studio}`, nextUrl))
      }
      return true
    },

    // async session({ session, user }) {
    //   debugger
    //   const foundUser = await getUserById(user)
    //   const userId = foundUser.id as string
    //   session.user.id = userId
    //   return session
    // }
  },

  secret: process.env.AUTH_SECRET,
  providers: [
    GoogleProvider({
                     clientId: process.env.AUTH_GOOGLE_ID,
                     clientSecret: process.env.AUTH_GOOGLE_SECRET,
                   }),
  ],
} satisfies NextAuthConfig

export const { auth, handlers, signIn, signOut } = NextAuth({ ...authConfig })
