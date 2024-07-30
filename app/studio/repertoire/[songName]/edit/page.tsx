import {fetchSongById} from '@/lib/data/songs/query'
import {Metadata} from 'next'
import {notFound} from 'next/navigation'

export const metadata: Metadata = {
  title: 'Edit Song',
}

export default async function Page({ params }: { params: { id: string } }) {
  const id = params.id


  const [songs] = await Promise.all([
                                      fetchSongById(id),
                                      // fetchCustomers(),
                                    ])
  if (!songs) {
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
      FORM!
      {/*<Form invoice={invoice} customers={customers}/>*/}
    </main>)
}
