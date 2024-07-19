import {InstrumentOptions} from '@/app/constants/InstrumentOptions'
import {PracticeDifficulties} from '@/app/constants/PracticeDifficulties'
import {PracticeTypes} from '@/app/constants/PracticeTypes'
import {StankFaces} from '@/app/constants/StankFaces'
import {
  Button,
  Cascader,
  Checkbox,
  DatePicker,
  Flex,
  Form,
  Input,
  InputNumber,
  Rate,
  Slider,
  Space,
  Typography
} from '@mparticle/aquarium'
import {CheckboxValueType} from 'antd/lib/checkbox/Group'
import {Dayjs} from 'dayjs'
import {useState} from 'react'

const minBpm = 40 as const
const maxBpm = 160 as const

export default function NewPracticeSession() {
  const [bpm, setBpm] = useState<number>()
  const [difficulty, setDifficulty] = useState<number>()
  const [length, setLength] = useState<number>()
  const [instrument, setInstrument] = useState<string>('')
  const [date, setDate] = useState<Dayjs>()
  const [practiceType, setPracticeType] = useState<CheckboxValueType[]>()
  const [stank, setStank] = useState<number>()


  return (<>
    <Form
      labelCol={{ span: 4 }}
      wrapperCol={{ span: 14 }}
      layout="horizontal">

      {renderInstrument()}

      {renderPracticeDate()}

      {renderBpm()}

      {renderType()}

      {renderDifficulty()}

      {renderLength()}

      {renderPracticeDescription()}

      {renderStankFace()}


      <Form.Item label="Submit">
        <Button onClick={change => saveSession()}>Save</Button>
      </Form.Item>
    </Form>
  </>)


  function renderInstrument() {
    return <>
      <Form.Item label="Instrument">
        <Cascader options={InstrumentOptions}
                  changeOnSelect
                  expandTrigger="hover"
                  onChange={(value: string[]) => {
                    setInstrument((ps) => value[value.length - 1][0])
                  }}
                  value={instrument}/>
      </Form.Item>
    </>
  }

  function renderPracticeDate() {
    return <>
      <Form.Item label="Practice Date">
        <DatePicker onChange={value => setDate(value)} value={date}/>
      </Form.Item>
    </>
  }

  function renderBpm() {
    return <>
      <Form.Item label="BPM">
        <Flex vertical style={{ width: '100%' }}>
          <InputNumber min={minBpm} max={maxBpm} value={bpm} onChange={(value) => {setBpm(value as number)}}/>
          <Slider min={minBpm} max={maxBpm} value={bpm} onChange={value => {setBpm(value)}}/>
        </Flex>
      </Form.Item>
    </>
  }

  function renderType() {
    return <>
      <Form.Item label="Type">
        <Checkbox.Group options={PracticeTypes.map(t => ({ label: t, value: t }))}
                        onChange={(value) => setPracticeType(value)}/>
      </Form.Item>
    </>
  }

  function renderDifficulty() {
    return <>
      <Form.Item label="Difficulty">
        <Flex gap="middle">
          <Rate tooltips={PracticeDifficulties as string[]} onChange={setDifficulty} value={difficulty}/>
          {difficulty ? <span>{PracticeDifficulties[difficulty - 1]}</span> : null}
        </Flex>
      </Form.Item>
    </>
  }

  function renderLength() {
    return <>
      <Form.Item label="Length">
        <Space>
          <InputNumber min={0} onChange={value => setLength(value as number)} value={length}/>
          <Typography.Text>minutes</Typography.Text>
        </Space>
      </Form.Item>
    </>
  }

  function renderPracticeDescription() {
    return <>
      <Form.Item label="Practice Description">
        <Input.TextArea rows={3}/>
      </Form.Item>
    </>
  }

  function renderStankFace() {
    return <>
      <Form.Item label="Stank Face">
        <Rate defaultValue={2} character={({ index = 0 }) => StankFaces[index + 1]} onChange={setStank}/>
      </Form.Item>
    </>
  }


  function saveSession() {
    debugger
    bpm
    difficulty
    length
    date
    instrument
    practiceType
    stank
  }
}
