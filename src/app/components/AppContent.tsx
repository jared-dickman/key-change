import {Metronome} from '@/app/components/Metronome'
import NewPracticeSession from '@/app/components/NewPracticeSession'
import {useKeyStore} from '@/app/stores/KeyStore'
import {Card, Collapse, Space, Typography} from '@mparticle/aquarium'
import {getCamelotRoute, getHarmonicKeys, getKey} from 'camelot-wheel'
import {CircleOfFifths} from 'react-circle-of-fifths'
import {Scale} from 'tonal'
import styles from '.././app-content.module.css'


export function AppContent() {
  const { key, setKey, setDegrees } = useKeyStore()

  return <>
    <div className={styles.main}>

      <Space direction="vertical" size="large" style={{ width: '100%' }}>

        <Collapse defaultActiveKey={['1']}
                  items={[{
                    key: 'new-practice-session',
                    label: 'New Practice Session',
                    children: <NewPracticeSession/>,
                  }]}/>

        <Card title="Tonal">
          <Space>
            {[1, 3, 5, 7].map(Scale.degrees(key?.tonic + ' ' + key?.tonality))}
          </Space>
        </Card>


        <Card title="Camelot Wheel">
          {key &&
           <Space direction="vertical" size="large">

             <span>
               <Typography.Title level={4}>Key:</Typography.Title>
               {renderObject(getKey({ name: key?.tonicDisplay }))}
             </span>

             <span>
               <Typography.Title level={4}>Harmonic Keys:</Typography.Title>
               {renderObjectArray(getHarmonicKeys({ name: key?.tonicDisplay }))}
             </span>

             <span>
               <Typography.Title level={4}>Route to C:</Typography.Title>
               {renderObjectArray(getCamelotRoute({ name: key?.tonicDisplay }, { name: 'C' }))}
             </span>
           </Space>}

        </Card>



        <Card title="Metronome">
          <Metronome/>
        </Card>

        <Card title="Circle of Fifths" style={{ maxHeight: '555px', maxWidth: '555px' }}>
          <Space>
            Tonic: {key?.tonic}
            Tonality: {key?.tonality}
            TonicDisplay: {key?.tonicDisplay}
          </Space>
          <CircleOfFifths handleKeySelection={handleKeySelection}/>
        </Card>

      </Space>
    </div>
  </>

  function handleKeySelection(key): void {
    setKey(key)
    const degrees = [1, 3, 5, 7].map(Scale.degrees(key?.tonic + ' ' + key?.tonality))
    setDegrees(degrees)
  }
}

function renderObjectArray(arr: Record<string, any>[]) {
  return <>
    {arr.map(renderObject)}
  </>
}

function renderObject(obj: Record<string, any>) {
  return (
    <Space direction="vertical" size="small">
      {Object.entries(obj).map(([key, value]) => <span>{key}: {value}</span>)}
    </Space>)
}
