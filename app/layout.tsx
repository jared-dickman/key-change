import {AntdRegistry} from '@ant-design/nextjs-registry'
import type {Metadata} from 'next'
import {Inter} from 'next/font/google'
import '@/styles/globals.css'
import {ReactNode} from 'react'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Key Change',
  description: 'The key to your musical change',
}

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AntdRegistry>{children}</AntdRegistry>
      </body>
    </html>)
}
