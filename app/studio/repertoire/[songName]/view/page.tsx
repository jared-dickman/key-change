import {fetchSongById} from '@/lib/actions'
import {Metadata} from 'next'
import {notFound} from 'next/navigation'

export const metadata: Metadata = {
  title: 'View Song',
}

export default async function Page({ params }: { params: { id: string } }) {
  const id = params.id


  const [song] = await Promise.all([
                                     fetchSongById(id),
                                   ])
  if (!song) {
    notFound()
  }

  return (
    <main>
      <div> Breadcrumbs*</div>
      <div> Song Data!</div>
      <div> id -{song.id}</div>
      <div> artist - {song.artist}</div>
      <div> title -{song.title}</div>
    </main>)
}
