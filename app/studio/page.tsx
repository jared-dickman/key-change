'use client'

import {GeneratePracticeSession} from '@/components/GeneratePracticeSession'
import {Metronome} from '@/components/Metronome'
import {PracticeSessionTable} from '@/components/PracticeSessionTable'
import SavePracticeSession from '@/components/SavePracticeSession'
import {useKeyStore} from '@/stores/KeyStore'
import {Alert, Collapse, Space, Typography} from '@mparticle/aquarium'
// @ts-ignore
import {getCamelotRoute, getHarmonicKeys, getKey} from 'camelot-wheel'
import {useState} from 'react'
import {CircleOfFifths} from 'react-circle-of-fifths'
import {CircleOfFifthsSelection} from 'react-circle-of-fifths/lib/CircleOfFifthsSelection'
import {Scale} from 'tonal'

export default function Studio() {
  const { key, setKey, setDegrees } = useKeyStore()

  const [isGenerateOpen, setIsGenerateOpen] = useState<boolean>(false)
  return <>
    <Space direction="vertical" size="large" style={{ width: '100%' }}>

      {renderGeneratePracticeSession()}
      {renderSavePracticeSession()}
      {renderViewPracticeSessions()}
      {renderTonal()}
      {renderCamelotWheel()}
      {renderMetronome()}
      {renderCircleOfFifths()}

    </Space>
  </>

  function renderGeneratePracticeSession() {
    return <>
      <Collapse defaultActiveKey={['1']}
                onChange={() => setIsGenerateOpen(!isGenerateOpen)}
                items={[{
                  key: 'generate-practice-session',
                  label: 'Generate Practice Session',
                  children: <GeneratePracticeSession
                    refreshSuggestion={isGenerateOpen} // generate a new practice session suggestion on every toggle
                  />,
                }]}/>
    </>
  }

  function renderSavePracticeSession() {
    return <>
      <Collapse defaultActiveKey={['1']}
                items={[{
                  key: 'new-practice-session',
                  label: 'New Practice Session',
                  children: <SavePracticeSession/>,
                }]}/>
    </>
  }

  function renderViewPracticeSessions() {
    return <>
      <Collapse defaultActiveKey={['1']}
                items={[{
                  key: 'new-practice-session',
                  label: 'View Practice Sessions',
                  children: <PracticeSessionTable/>,
                }]}/>
    </>
  }

  function renderTonal() {
    return <>
      <Collapse defaultActiveKey={['1']}
                items={[{
                  key: 'tonal',
                  label: 'Tonal',
                  children: <>
                    {key ?
                     <Space>{[1, 3, 5, 7].map(Scale.degrees(key?.tonic + ' ' + key?.tonality))}</Space> :
                     <NoKeyAlert/>}</>,
                }]}/>
    </>
  }

  function renderCamelotWheel() {
    return <>
      <Collapse defaultActiveKey={['1']}
                items={[{
                  key: 'camelot-wheel',
                  label: 'Camelot Wheel',
                  children: <>

                    {key ?
                     <Space direction="vertical" size="large">
                       <span>
                         <Typography.Title level={4}>Key:</Typography.Title>
                         {renderObject(getKey({ name: key?.tonic }))}
                       </span>

                       <span>
                         <Typography.Title level={4}>Harmonic Keys:</Typography.Title>
                         {renderObjectArray(getHarmonicKeys({ name: key?.tonic }))}
                       </span>

                       <span>
                         <Typography.Title level={4}>Route to Db:</Typography.Title>
                         {renderObjectArray(getCamelotRoute({ name: key?.tonic }, { name: 'Db' }))}
                       </span>
                     </Space> :
                     <NoKeyAlert/>}</>,
                }]}/>
    </>
  }

  function renderMetronome() {
    return <>
      <Collapse defaultActiveKey={['1']}
                items={[{
                  key: 'metronome',
                  label: 'Metronome',
                  children: <Metronome/>,
                }]}/>
    </>
  }

  function renderCircleOfFifths() {
    return <>
      <Collapse defaultActiveKey={['1']}
                items={[{
                  key: 'circle',
                  label: 'Circle Of Fifths',
                  children: <>
                    <Space>
                      Tonic: {key?.tonic}
                      Tonality: {key?.tonality}
                      TonicDisplay: {key?.tonicDisplay}
                    </Space>
                    <CircleOfFifths handleKeySelection={handleKeySelection}/>
                  </>,
                }]}/>
    </>
  }

  function handleKeySelection(key: CircleOfFifthsSelection): void {
    setKey(key)
    const degrees = [1, 3, 5, 7].map(Scale.degrees(key?.tonic + ' ' + key?.tonality))
    setDegrees(degrees)
  }
}

const NoKeyAlert = () => <Alert type="warning" message="First select a key from the Circle of Fifths"/>

function renderObjectArray(arr: Record<string, any>[]) {
  return <>
    {arr.map(renderObject)}
  </>
}

function renderObject(obj: Record<string, any>) {
  return (
    <Space direction="vertical" size="small">
      {Object.entries(obj).map(([key, value]) => <span key={key + value}>{key}: {value}</span>)}
    </Space>)
}
