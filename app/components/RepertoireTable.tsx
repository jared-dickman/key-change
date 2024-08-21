import {fetchFilteredRepertoire} from '@/lib/actions'

export default async function RepertoireTable({ query, currentPage, }: {
  query: string;
  currentPage: number;
}) {

  const repertoire = await fetchFilteredRepertoire(query, currentPage)

  return (
    <div>

      <table>
        <thead>
        <tr>
          <th scope="col">
            Title
          </th>
          <th scope="col">
            Artist
          </th>
          <th scope="col">
            Lyrics
          </th>
          <th scope="col">
            Created At
          </th>
          <th scope="col">
            Updated At
          </th>
          <th scope="col">
            Edit
          </th>
        </tr>
        </thead>

        <tbody>
        {repertoire?.map(song => (
          <tr key={song.id}>
            <td>
              {song.title}
            </td>
            <td>
              {song.artist}
            </td>
            <td>
              {song.lyrics}
            </td>
            <td>
              {song.createdAt}
            </td>
            <td>
              {song.updatedAt}
            </td>
            <td>
              <div>
                {/*<UpdateSong id={song.id}/>*/}
                {/*<DeleteSong id={song.id}/>*/}
              </div>
            </td>
          </tr>
        ))}
        </tbody>
      </table>
    </div>
  )
}
