import {GoogleSignin} from '@/components/GoogleSignin'
import {ConfigProvider, Space} from '@mparticle/aquarium'
import {Padding} from '@mparticle/aquarium/dist/style'

export default function App() {
  return <>
    <ConfigProvider>
      <Space direction="vertical" size="large" style={{ padding: Padding }}>
        <p>Sign in to access your Studio</p>
        <GoogleSignin/>
      </Space>
    </ConfigProvider>
  </>
}
