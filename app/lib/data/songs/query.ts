import {Song} from '@/lib/definitions'
import {sql} from '@vercel/postgres'

export async function fetchSongById(id: string) {
  try {
    const data = await sql<Song>`
      SELECT
        songs.id,
        songs.artist_id,
        songs.name,
        songs.lyrics,
        songs.bpm,
//         songs.status
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
