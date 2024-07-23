import {AppNavigation} from '@/components/AppNavigation'
import styles from '@/studio/studio.module.css'
import {ConfigProvider} from '@mparticle/aquarium'
import type {Metadata} from 'next'
import {ReactNode} from 'react'

export const metadata: Metadata = {
  title: 'Key Change',
  description: 'The key to your musical change',
}

export default function Layout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <main>
      <ConfigProvider>
        <AppNavigation/>
        <div className={styles.main}>{children}</div>
      </ConfigProvider>
    </main>)
}
