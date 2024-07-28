import {GoogleSignin} from '@/components/GoogleSignin'
import {ConfigProvider, Space, Typography} from '@mparticle/aquarium'

export default function App() {
  return <>
    <ConfigProvider>
      <Space direction="vertical">
        <Space direction="vertical">
          <Typography.Title>Signin to access your Studio</Typography.Title>
          <GoogleSignin/>
        </Space>
      </Space>
    </ConfigProvider>
  </>
}
