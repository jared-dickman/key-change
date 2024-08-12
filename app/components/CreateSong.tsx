'use client'

import {Pages} from '@/constants/Pages'
import {createSong} from '@/lib/actions'
import {SongState} from '@/lib/data/songs/actions'
import {Button} from '@mparticle/aquarium'
import Link from 'next/link'
import {useFormState} from 'react-dom'

export default function CreateSong() {
  const [state, formAction] = useFormState<SongState, FormData>(createSong, { message: '', errors: {} })

  return (
    <form action={formAction}>

      <div>
        <div>
          <div>
            <label htmlFor="artist">
              Choose an Artist
            </label>
            <div>
              <div>
                <input
                  id="artist"
                  name="artist"
                  type="text"
                  placeholder="Enter artist"
                  required
                />
              </div>
            </div>
          </div>
          {state?.errors?.artist?.map((error: string) => (<p key={error}>{error}</p>))}
        </div>

        <div>
          <label htmlFor="title">
            Choose a title
          </label>
          <div>
            <div>
              <input
                id="title"
                name="title"
                type="text"
                placeholder="Enter title"
                required
              />
            </div>
          </div>
          {state?.errors?.title?.map((error: string) => (<p key={error}>{error}</p>))}
        </div>
      </div>
      <div>
        <Link href={`/${Pages.Studio}/${Pages.Repertoire}`}>Cancel</Link>
        <Button htmlType="submit">Create Song</Button>
      </div>
    </form>)
}
