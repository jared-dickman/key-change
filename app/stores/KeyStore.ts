import {CircleOfFifthsSelection} from 'react-circle-of-fifths'
import {create} from 'zustand'

type KeyStore = {
  key: CircleOfFifthsSelection
  setKey: (key: CircleOfFifthsSelection) => void
  degrees: string[]
  setDegrees: (degrees: string[]) => void
}

export const useKeyStore = create<KeyStore>(set => ({
      key: undefined as unknown as CircleOfFifthsSelection,
      setKey: (key: CircleOfFifthsSelection) => set({ key }),

      degrees: [],
      setDegrees: (degrees: string[]) => set({ degrees }),
    })
)
