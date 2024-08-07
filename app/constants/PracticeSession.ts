import {CheckboxValueType} from 'antd/lib/checkbox/Group'

export interface PracticeSession {
  difficulty: number;
  date: number;
  instrumentCategory: string;
  description: string;
  instrumentName: string;
  stank: number;
  length: number;
  practiceType: CheckboxValueType[];
  bpm: number
}
