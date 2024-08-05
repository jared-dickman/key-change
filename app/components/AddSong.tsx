'use client'

import {createSong} from '@/lib/actions'
import {useActionState} from 'react'
import {useFormStatus} from 'react-dom'

const initialState = {
  message: '',
}

function SubmitButton() {
  const { pending } = useFormStatus()

  return (
    <button type="submit" aria-disabled={pending}>
      Add
    </button>
  )
}

export function AddSong() {
  const [state, formAction] = useActionState(createSong, initialState)

  return (
    <form action={formAction}>
      <label htmlFor="todo">Enter Song</label>
      <input type="text" id="todo" name="todo" required/>
      <SubmitButton/>
      <p aria-live="polite" className="sr-only" role="status">
        {state?.message}
      </p>
    </form>
  )
}
