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
                                     // fetchCustomers(),
                                   ])
  if (!song) {
    notFound()
  }

  return (
    <main>
      Breadcrumbs*
      {/*<Breadcrumbs*/}
      {/*  breadcrumbs={[*/}
      {/*    { label: 'Invoices', href: '/dashboard/invoices' },*/}
      {/*    {*/}
      {/*      label: 'Edit Invoice',*/}
      {/*      href: `/dashboard/invoices/${id}/edit`,*/}
      {/*      active: true,*/}
      {/*    },*/}
      {/*  ]}*/}
      {/*/>*/}

      Song Data!
      {song.id}
      {song.name}
      {song.artist}
      {song.title}
    </main>)
}
