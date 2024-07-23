'use client'

import {Pages} from '@/constants/Pages'
import {ConfigProvider} from '@mparticle/aquarium'
import Link from 'next/link'

export default function App() {
  return <>
    <ConfigProvider>
      <Link href={`/${Pages.Studio}`}>Login to Studio</Link>
    </ConfigProvider>
  </>
}
