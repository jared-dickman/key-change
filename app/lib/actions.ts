'use server'

import {signIn} from '@/../auth'
import {Pages} from '@/constants/Pages'
import {AuthError} from 'next-auth'

export async function authenticatePassword(prevState: string | undefined, formData: FormData) {
  try {
    await signIn('credentials', formData)

  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return 'Invalid credentials.'
        default:
          return 'Something went wrong.'
      }
    }
    throw error
  }
}

export async function authenticateGoogle() {
  try {
    await signIn('google', { callbackUrl: `http://localhost:3000/${Pages.Studio}` })
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        default:
          return 'Something went wrong.'
      }
    }
    throw error
  }
}
