// import CreateSong from '@/components/CreateSong'
import {AddSong} from '@/components/AddSong'
import {Metadata} from 'next'

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
    <main>
      <div>
        <h1>Repertoire</h1>
      </div>

      <AddSong/>
      {/*<ul>*/}
      {/*  {todos.map((todo) => (*/}
      {/*    <li key={todo.id}>*/}
      {/*      {todo.text}*/}
      {/*      <DeleteForm id={todo.id} todo={todo.text} />*/}
      {/*    </li>*/}
      {/*  ))}*/}
      {/*</ul>*/}

      {/*<MessageCreateForm />*/}
      {/*<MessageList />*/}
      {/*<div>*/}
      {/*  /!*<Search placeholder="Search invoices..."/>*!/*/}
      {/*  <CreateSong/>*/}
      {/*</div>*/}
      {/*<Suspense key={query + currentPage} fallback={<Skeleton/>}>*/}
      {/*  /!*<Table query={query} currentPage={currentPage}/>*!/*/}
      {/*  SONGS!*/}
      {/*</Suspense>*/}
      {/*<div>*/}
      {/*  ...PAGES...*/}
      {/*  /!*<Pagination totalPages={totalPages}/>*!/*/}
      {/*</div>*/}
    </main>)

  // async function createInvoice(formData: FormData) {
  //   'use server'
  //
  //   const rawFormData = {
  //     customerId: formData.get('customerId'),
  //     amount: formData.get('amount'),
  //     status: formData.get('status'),
  //   }
  //
  //   // mutate data
  //   // revalidate cache
  // }

}
