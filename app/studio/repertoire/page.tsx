import CreateSong from '@/components/CreateSong'
import RepertoireTable from '@/components/RepertoireTable'
import {Search} from '@/components/Search'
import {Skeleton} from '@mparticle/aquarium'
import {Metadata} from 'next'
import {Suspense} from 'react'

export const metadata: Metadata = {
  title: 'Repertoire',
}

export default async function Page({ searchParams }: {
  searchParams?: { query?: string; page?: string; };
}) {

  const query = searchParams?.query || ''
  const currentPage = Number(searchParams?.page) || 1

  return (
    <div>
      <h1>Repertoire</h1>

      <CreateSong/>

      <Search placeholder="Search for a title, artist, or lyric"/>

      <Suspense key={query + currentPage} fallback={<Skeleton/>}>
        <RepertoireTable query={query} currentPage={currentPage}/>
      </Suspense>

    </div>)
}
