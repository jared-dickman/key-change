import NextAuth from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'

const authOptions = {
  providers: [
    GoogleProvider({
                     clientId: process.env.AUTH_GOOGLE_ID,
                     clientSecret: process.env.AUTH_GOOGLE_SECRET,
                   }),
  ],
}

const handler = NextAuth(authOptions)

export {GET, POST} from '@/../auth'
// export {handler as GET, handler as POST}
