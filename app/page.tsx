'use client'

import {AppContent} from '@/components/AppContent'
import {AppNavigation} from '@/components/AppNavigation'
import {ConfigProvider} from '@mparticle/aquarium'

export default function Home() {
  return <>
    <ConfigProvider>
      <AppNavigation/>
      <AppContent/>
    </ConfigProvider>
  </>
}
