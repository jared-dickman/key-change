'use client'

import {authenticateGoogle} from '@/lib/actions'
import {Button} from '@mparticle/aquarium'

export function GoogleSignin() {
  return <>
    <Button onClick={() => authenticateGoogle()}>Sign in with Google</Button>
  </>
}
