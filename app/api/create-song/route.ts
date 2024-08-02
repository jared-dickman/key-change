import {sql} from '@vercel/postgres'
import {NextResponse} from 'next/server'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const artist = searchParams.get('artist')
  const title = searchParams.get('title')
  if (!artist || !title) throw new Error('Artist and title are required')

  try {
    await sql`INSERT INTO Songs (Artist, Title) VALUES (${artist}, ${title});`
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 })
  }

  return NextResponse.json({ status: 200 })
}
