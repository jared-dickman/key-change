import {Pages} from '@/constants/Pages'
import {Song} from '@/lib/definitions'
import {sql} from '@vercel/postgres'
import {revalidatePath} from 'next/cache'
import {redirect} from 'next/navigation'
import {z} from 'zod'

export type SongState = {
  errors?: {
    lyrics?: string;
    artist?: string;
    bpm?: number;
  };
  message?: string | null;
};

const SongSchema = z.object({
                              id: z.string(),
                              artistId: z.string({ invalid_type_error: 'Please select an artist.' }),
                              bpm: z.coerce.number()
                                .gt(0, { message: 'Please enter an bpm greater than 0.' }),
                              lyrics: z.string(),
                              date: z.string(),
                            })

const CreateSong = SongSchema.omit({ id: true, date: true })
const UpdateSong = SongSchema.omit({ id: true, date: true })

export async function fetchSongById(id: string) {
  try {
    const data = await sql<Song>`
      SELECT
        songs.id,
        songs.artist_id,
        songs.name,
        songs.lyrics,
        songs.bpm,
//         songs.lyrics
      FROM songs
      WHERE songs.id = ${id};
    `

    const song = data.rows.map(song => ({
      ...song,
      // do data conversions here
      // bpm: song.bpm / 100, // Convert bpm from cents to dollars
    }))

    return song[0]
  } catch (error) {
    console.error('Database Error:', error)
    throw new Error('Failed to fetch song.')
  }
}

export async function createSong(prevState: SongState, formData: FormData) {

  const validatedFields = CreateSong.safeParse({
                                                 artistId: formData.get('artistId'),
                                                 bpm: formData.get('bpm'),
                                                 lyrics: formData.get('lyrics'),
                                               })

  // If form validation fails, return errors early. Otherwise, continue.
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Create Song.',
    }
  }

  // Prepare data for insertion into the database
  const { artistId, bpm, lyrics } = validatedFields.data
  // const amountInCents = bpm * 100
  const date = new Date().toISOString().split('T')[0]

  // Insert data into the database
  try {
    await sql`
      INSERT INTO invoices (artist_id, bpm, lyrics, date)
      VALUES (${artistId}, ${bpm}, ${lyrics}, ${date})
    `
  } catch (error) {
    // If a database error occurs, return a more specific error.
    return {
      message: 'Database Error: Failed to Create Song.',
    }
  }

  // Revalidate the cache for the invoices page and redirect the user.
  revalidatePath(`/${Pages.Studio}/${Pages.Repertoire}`)
  redirect(`/${Pages.Studio}/${Pages.Repertoire}`)
}


export async function updateSong(
  id: string,
  prevState: SongState,
  formData: FormData,
) {
  const validatedFields = UpdateSong.safeParse({
                                                 artistId: formData.get('artistId'),
                                                 bpm: formData.get('bpm'),
                                                 lyrics: formData.get('lyrics'),
                                               })

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Update Song.',
    }
  }

  const { artistId, bpm, lyrics } = validatedFields.data
  // const amountInCents = bpm * 100

  try {
    await sql`
      UPDATE songs
      SET artist_id = ${artistId}, bpm = ${bpm}, lyrics = ${lyrics}
      WHERE id = ${id}
    `
  } catch (error) {
    return { message: 'Database Error: Failed to Update Song.' }
  }

  revalidatePath(`/${Pages.Studio}/${Pages.Repertoire}`)
  redirect(`/${Pages.Studio}/${Pages.Repertoire}`)
}
