import {Pages} from '@/constants/Pages'
import {Result} from '@mparticle/aquarium'
import Link from 'next/link'

export default function NotFound() {
  return (
    <main>
      <Result status="404"
              title="Could not find the requested song."
              extra={<Link href={`/${Pages.Studio}/${Pages.Repertoire}`}>Go Back</Link>}>
      </Result>
    </main>)
}
