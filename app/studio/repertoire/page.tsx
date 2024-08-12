import CreateSong from '@/components/CreateSong'
import {Skeleton} from '@mparticle/aquarium'
import {Metadata} from 'next'
import {Suspense} from 'react'

export const metadata: Metadata = {
  title: 'Repertoire',
}

export default async function Page({ searchParams, }: {
  searchParams?: { query?: string; page?: string; };
}) {

  const query = searchParams?.query || ''
  const currentPage = Number(searchParams?.page) || 1

  const totalPages = undefined // await fetchRepertoirePages(query)

  return (
    <div>
      <div>
        <h1>Repertoire</h1>
      </div>

      <CreateSong/>

      <div> Search input goes here</div>

      <Suspense key={query + currentPage} fallback={<Skeleton/>}>
        {/*<Table query={query} currentPage={currentPage}/>*/}
        All Songs table goes here!
      </Suspense>

    </div>)
}
