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

  const initialState: SongState = { message: '', errors: {} }

  const updateInvoiceWithId = updateSong.bind(null, song.id) as Parameters<typeof useActionState>[0]
  const [state, formAction] = useActionState(updateInvoiceWithId, initialState)

  return (
    <form action={formAction}>

      <div>

        {/*<div>*/}
        {/*  <label htmlFor="artist">*/}
        {/*    Choose artist*/}
        {/*  </label>*/}
        {/*  <div>*/}
        {/*    <select*/}
        {/*      id="artist"*/}
        {/*      name="artist"*/}
        {/*      defaultValue={song.artist_id}*/}
        {/*    >*/}
        {/*    </select>*/}
        {/*  </div>*/}
        {/*</div>*/}


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
