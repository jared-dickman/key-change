import {SigninButton} from '@/components/SigninButton'
import {Pages} from '@/constants/Pages'
import {ConfigProvider, Space} from '@mparticle/aquarium'
import Link from 'next/link'

export default function App() {
  return <>
    <ConfigProvider>
      <Space direction="vertical">
        <Link href={`/${Pages.Studio}`}>Go to Studio</Link>
        <SigninButton/>
      </Space>
    </ConfigProvider>
  </>
}
