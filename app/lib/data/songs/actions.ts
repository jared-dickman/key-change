import {auth} from '@/../auth'
import {Pages} from '@/constants/Pages'
import {RepertoireTable, Song} from '@/lib/definitions'
import {sql} from '@vercel/postgres'
import {revalidatePath} from 'next/cache'
import {redirect} from 'next/navigation'
import {z} from 'zod'

export type SongState = {
  errors?: {
    title?: string[]
    artist?: string[]
    lyrics?: string[]
  };
  message?: string;
};

const SongSchema = z.object({
                              id: z.string(),
                              userId: z.string(),
                              artist: z.string({ invalid_type_error: 'Please enter an artist.' }),
                              title: z.string(),
                              lyrics: z.string(),
                              createdAt: z.number(),
                              updatedAt: z.number(),
                            })

const CreateSong = SongSchema.omit({ id: true, userId: true, updatedAt: true, createdAt: true })
const UpdateSong = SongSchema.omit({ id: true, userId: true, updatedAt: true, createdAt: true })

export async function fetchSongById(id: string) {
  const userId = (await auth())?.user?.id

  try {
    const data = await sql<Song>`
      SELECT
        songs.artist,
        songs.title,
        songs.lyrics,
      FROM Repertoire
      WHERE songs.id = ${id} 
//       and songs.user_id = ${userId};
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

export async function fetchFilteredRepertoire(
  query: string,
  currentPage: number,
) {

  const ITEMS_PER_PAGE = 6
  const offset = (currentPage - 1) * ITEMS_PER_PAGE

  try {
    const songs = await sql<RepertoireTable>`
      SELECT
        repertoire.id,
        repertoire.title,
        repertoire.artist,
        repertoire.lyrics,
        repertoire.updated_at,
        repertoire.created_at
      FROM repertoire
      WHERE
        repertoire.title::text ILIKE ${`%${query}%`} OR
        repertoire.artist::text ILIKE ${`%${query}%`} OR
        repertoire.lyrics ILIKE ${`%${query}%`}
      ORDER BY repertoire.updated_at DESC
      LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
    `

    const x = songs.rows.map(song => ({
      ...song,

      // do data conversions here
      // amount: song.amount / 100, // Convert amount from cents to dollars
    }))


    return songs.rows
  } catch (error) {
    debugger

    console.error('Database Error:', error)
    throw new Error('Failed to fetch repertoire.')
  }
}


export async function createSong(prevState: SongState, formData: FormData) {
  const validatedFields = CreateSong.safeParse({
                                                 artist: formData.get('artist'),
                                                 title: formData.get('title'),
                                                 lyrics: formData.get('lyrics'),
                                               })
  const session = await auth()
  const userId = session?.user?.id

  // If form validation fails, return errors early. Otherwise, continue.
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Create Song.',
    }
  }

  // Prepare data for insertion into the database
  const { artist, title, lyrics } = validatedFields.data
  // const date = new Date().toISOString().split('T')[0]
  debugger

  // Insert data into the database
  try {
    //todo: check for / handle duplicates

    const songId = crypto.randomUUID()
    await sql`INSERT INTO Repertoire (Id,        Artist,    Title,    User_Id,   Created_At,     Updated_At,     Lyrics )  
                              VALUES (${songId}, ${artist}, ${title}, ${userId}, NOW(), NOW(), ${lyrics});`

  } catch (error) {
    debugger

    // If a database error occurs, return a more specific error.
    return {
      message: 'Database Error: Failed to Create Song.',
    }
  }

  // Revalidate the cache for the repertoire page and redirect the user.
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

  const { artist, title, lyrics } = validatedFields.data
  try {
    await sql`
      UPDATE Repertoire
      SET Artist = ${artist}, Title = ${title}, Lyrics = ${lyrics}, Updated_At = NOW()
      WHERE id = ${id}
    `
  } catch (error) {
    return { message: 'Database Error: Failed to Update Song.' }
  }

  revalidatePath(`/${Pages.Studio}/${Pages.Repertoire}`)
  redirect(`/${Pages.Studio}/${Pages.Repertoire}`)
}
