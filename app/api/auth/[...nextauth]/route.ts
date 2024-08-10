import {authConfig} from '@/../auth.config'
import NextAuth from 'next-auth'

export default NextAuth(authConfig)

export {GET, POST} from '@/../auth'
