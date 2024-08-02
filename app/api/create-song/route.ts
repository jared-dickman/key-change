import {Song} from '@/lib/definitions'
import {sql} from '@vercel/postgres'
import {NextResponse} from 'next/server'

export async function GET({ artist, title }: Song) {
  if (!artist || !title) throw new Error('Artist and title are required')

  try {
    await sql`INSERT INTO Songs (Artist, Title) VALUES (${artist}, ${title});`
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 })
  }

  return NextResponse.json({ status: 200 })
}
