'use client'

import {Pages} from '@/constants/Pages'
import {SongState, updateSong} from '@/lib/data/songs/query'
import type {Song} from '@/lib/definitions'
import {Button} from '@mparticle/aquarium'
import Link from 'next/link'
import {useActionState} from 'react'

interface SongProps {
  song: Song
}


export default function Song({ song }: SongProps) {

  const initialState: SongState = { message: null, errors: {} }

  const updateInvoiceWithId = updateSong.bind(null, song.id) as Parameters<typeof useActionState>[0]
  const [state, formAction] = useActionState(updateInvoiceWithId, initialState)

  return (
    <form action={formAction}>

      <div>

        <div>
          <label htmlFor="artist">
            Choose artist
          </label>
          <div>
            <select
              id="artist"
              name="artist"
              defaultValue={song.artist_id}
            >
            </select>
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
                defaultValue={song.bpm}
                placeholder="Enter Beats per Minute"
              />
            </div>
          </div>
        </div>

        {/* Invoice Status */}
        {/*<fieldset>*/}
        {/*  <legend>*/}
        {/*    Set the song status*/}
        {/*  </legend>*/}
        {/*  <div>*/}
        {/*    <div>*/}
        {/*      <div>*/}
        {/*        <input*/}
        {/*          id="pending"*/}
        {/*          name="status"*/}
        {/*          type="radio"*/}
        {/*          value="pending"*/}
        {/*          defaultChecked={song.status === 'pending'}*/}

        {/*        />*/}
        {/*        <label*/}
        {/*          htmlFor="pending"*/}

        {/*        >*/}
        {/*          Pending <ClockIcon/>*/}
        {/*        </label>*/}
        {/*      </div>*/}
        {/*      <div>*/}
        {/*        <input*/}
        {/*          id="paid"*/}
        {/*          name="status"*/}
        {/*          type="radio"*/}
        {/*          value="paid"*/}
        {/*          defaultChecked={song.status === 'paid'}*/}

        {/*        />*/}
        {/*        <label*/}
        {/*          htmlFor="paid"*/}

        {/*        >*/}
        {/*          Paid <CheckIcon/>*/}
        {/*        </label>*/}
        {/*      </div>*/}
        {/*    </div>*/}
        {/*  </div>*/}
        {/*</fieldset>*/}
      </div>
      <div>
        <Link
          href={`/${Pages.Studio}/${Pages.Repertoire}`}>
          Cancel
        </Link>
        <Button htmlType="submit">Edit Song</Button>
      </div>
    </form>)
}
