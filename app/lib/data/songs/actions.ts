import {Pages} from '@/constants/Pages'
import {Song} from '@/lib/definitions'
import {sql} from '@vercel/postgres'
import {revalidatePath} from 'next/cache'
import {redirect} from 'next/navigation'
import {z} from 'zod'

export type SongState = {
  errors?: {
    title?: string[]
    artist?: string[]
  };
  message?: string;
};

const SongSchema = z.object({
                              id: z.string(),
                              artist: z.string({ invalid_type_error: 'Please enter an artist.' }),
                              title: z.string(),
                              date: z.string(),
                            })

const CreateSong = SongSchema.omit({ id: true, date: true })
const UpdateSong = SongSchema.omit({ id: true, date: true })

export async function fetchSongById(id: string) {
  try {
    const data = await sql<Song>`
      SELECT
        songs.id,
        songs.artist,
        songs.title,
      FROM songs
      WHERE songs.id = ${id};
    `

    const song = data.rows.map(song => ({
      ...song,
      // do data conversions here
      // amount: song.amount / 100, // Convert amount from cents to dollars
    }))

    return song[0]
  } catch (error) {
    console.error('Database Error:', error)
    throw new Error('Failed to fetch song.')
  }
}

export async function createSong(prevState: SongState, formData: FormData) {
  const validatedFields = CreateSong.safeParse({
                                                 artist: formData.get('artist'),
                                                 title: formData.get('title'),
                                               })

  // If form validation fails, return errors early. Otherwise, continue.
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Create Song.',
    }
  }

  // Prepare data for insertion into the database
  const { artist, title } = validatedFields.data
  // const date = new Date().toISOString().split('T')[0]

  // Insert data into the database
  try {

    const song = { artist, title } as Song
    await sql`INSERT INTO Songs (Artist, Title) VALUES (${artist}, ${title});`

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
                                                 artist: formData.get('artist'),
                                                 title: formData.get('title'),
                                               })

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Update Song.',
    }
  }

  const { artist, title } = validatedFields.data

  try {
    await sql`
      UPDATE songs
      SET artist = ${artist}, title = ${title}
      WHERE id = ${id}
    `
  } catch (error) {
    return { message: 'Database Error: Failed to Update Song.' }
  }

  revalidatePath(`/${Pages.Studio}/${Pages.Repertoire}`)
  redirect(`/${Pages.Studio}/${Pages.Repertoire}`)
}
