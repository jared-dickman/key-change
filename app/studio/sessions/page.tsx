import {PracticeSessionTable} from '@/components/PracticeSessionTable'
import SavePracticeSession from '@/components/SavePracticeSession'
import {Collapse, Skeleton} from '@mparticle/aquarium'
import {Metadata} from 'next'
import {Suspense} from 'react'

export const metadata: Metadata = {
  title: 'Practice Sessions',
}

export default async function Page() {
  return (
    <main>
      <h1>Practice Sessions</h1>

      <div>
        <Suspense fallback={<Skeleton/>}>
          <SavePracticeSession/>
          <Collapse defaultActiveKey={['1']}
                    items={[{
                      key: 'save-practice-session',
                      label: 'Save Practice Session',
                      children: <SavePracticeSession/>,
                    }]}/>
        </Suspense>
      </div>

      <div>
        <Suspense fallback={<Skeleton/>}>
          <PracticeSessionTable/>
        </Suspense>
      </div>
    </main>)
}
