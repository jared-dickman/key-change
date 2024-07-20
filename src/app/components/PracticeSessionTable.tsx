import {LocalStorageKeys} from '@/app/constants/LocalStorageKeys'
import {PracticeSession} from '@/app/constants/PracticeSession'
import {ITableProps, Table} from '@mparticle/aquarium'

export function PracticeSessionTable() {
  const sessionsStored = localStorage.getItem(LocalStorageKeys.sessions)
  let sessions: PracticeSession[] = []
  try {
    if (sessionsStored) {
      sessions = JSON.parse(sessionsStored)
    }
  } catch (error) {}

  const columns: ITableProps['columns'] = [
    {
      title: 'Instrument Name',
      dataIndex: 'instrumentName',
      key: 'instrumentName',
    },
    {
      title: 'Instrument Category',
      dataIndex: 'instrumentCategory',
      key: 'instrumentCategory',
    },
    {
      title: 'Bpm',
      dataIndex: 'bpm',
      key: 'bpm',
    },
    {
      title: 'Difficulty',
      dataIndex: 'difficulty',
      key: 'difficulty',
    },
    {
      title: 'Length',
      dataIndex: 'length',
      key: 'length',
    },
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
    },
    {
      title: 'Practice Type',
      dataIndex: 'practiceType',
      key: 'practiceType',
    },
    {
      title: 'Stank',
      dataIndex: 'stank',
      key: 'stank',
    },
  ]

  return <Table dataSource={sessions} columns={columns}/>
}
