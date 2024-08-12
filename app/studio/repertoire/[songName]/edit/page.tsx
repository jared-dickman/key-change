import {fetchSongById} from '@/lib/actions'
import {Metadata} from 'next'
import {notFound} from 'next/navigation'

export const metadata: Metadata = {
  title: 'Edit Song',
}

export default async function Page({ params }: { params: { id: string } }) {
  const id = params.id


  const [songs] = await Promise.all([
                                      fetchSongById(id),
                                    ])
  if (!songs) {
    notFound()
  }

  return (
    <main>
      <div>Breadcrumbs*</div>
      <div>Edit Form goes here!</div>
    </main>)
}
