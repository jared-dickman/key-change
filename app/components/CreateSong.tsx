'use client'

import {Pages} from '@/constants/Pages'
import {createSong, SongState} from '@/lib/data/songs/query'
import {Button} from '@mparticle/aquarium'
import Link from 'next/link'
import {useFormState} from 'react-dom'

export default function CreateSong() {

  const initialState: SongState | any = { message: null, errors: {} }
  const [state, formAction] = useFormState(createSong, initialState)


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
        </div>

        <div>
          <label htmlFor="bpm">
            Choose an bpm
          </label>
          <div>
            <div>
              <input
                id="bpm"
                name="bpm"
                type="number"
                step="1"
                placeholder="Enter bpm"
                required
              />
            </div>
          </div>
        </div>


        <div>
          <label htmlFor="lyrics">
            Choose an lyrics
          </label>
          <div>
            <div>
              <input
                id="lyrics"
                name="lyrics"
                type="text"
                placeholder="Enter lyrics"
                required
              />
            </div>
          </div>
        </div>
      </div>
      <div>
        <Link href={`/${Pages.Studio}/${Pages.Repertoire}`}>Cancel</Link>
        <Button htmlType="submit">Create Song</Button>
      </div>
    </form>)
}
