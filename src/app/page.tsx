'use client'

import {AppContent} from '@/app/components/AppContent'
import {AppNavigation} from '@/app/components/AppNavigation'
import {ConfigProvider} from '@mparticle/aquarium'

export default function Home() {
  return <>
    <ConfigProvider>
      <AppNavigation/>
      <AppContent/>
    </ConfigProvider>
  </>
}
