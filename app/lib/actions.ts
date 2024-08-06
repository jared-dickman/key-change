'use server'

import {signIn} from '@/../auth'
import {Pages} from '@/constants/Pages'
import {AuthError} from 'next-auth'

export {createSong, updateSong, fetchSongById} from '@/lib/data/songs/actions'

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
