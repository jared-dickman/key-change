'use client'

import {Pages} from '@/constants/Pages'
import {Button} from '@mparticle/aquarium'
import {signIn} from 'next-auth/react'

export function SigninButton() {
  return <Button onClick={() => signIn('google', { callbackUrl: `http://localhost:3000/${Pages.Studio}` })}>Sign in with Google</Button>
}
