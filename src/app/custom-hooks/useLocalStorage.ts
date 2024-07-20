import {useState} from 'react'
import {LocalStorageKeys} from '@/app/constants/LocalStorageKeys'

export function useLocalStorage<T>(key: keyof typeof LocalStorageKeys, defaultValue: T) {
  const [value, setValue] = useState<T>(localStorage.getItem(key) as T || defaultValue)
  return [value, setValue] as const
}
