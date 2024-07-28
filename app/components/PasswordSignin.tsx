'use client'

import {authenticatePassword} from '@/lib/actions'
import {Button, Typography} from '@mparticle/aquarium'
import {useFormState} from 'react-dom'

export function PasswordSignin() {
  const [errorMessage, formAction, isPending] = useFormState(authenticatePassword, undefined)

  return <>
    <form action={formAction}>
      <div>
        <h1>Please log in to continue.</h1>
        <div>
          <div>
            <label htmlFor="email">Email</label>
            <div>
              <input
                id="email"
                type="email"
                name="email"
                placeholder="Enter your email address"
                required/>
            </div>
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <div>
              <input
                id="password"
                type="password"
                name="password"
                placeholder="Enter password"
                required
                minLength={6}
              />
            </div>
          </div>
        </div>
        <Button htmlType="submit" aria-disabled={isPending}>Log in</Button>
        <div>
          {errorMessage &&
           <Typography.Paragraph>{errorMessage}</Typography.Paragraph>}
        </div>
      </div>
    </form>
  </>
}
