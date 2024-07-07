import {Typography} from '@mparticle/aquarium'
import styles from '.././app-content.module.css'

export const AppContent = () => {
  return <>
    <div className={styles.main}>

      <Typography.Title level={3}>
        Hello Key Change World!
      </Typography.Title>

    </div>
  </>
}
