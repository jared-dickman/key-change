import {CircleOfFifthsSelection} from 'react-circle-of-fifths'
import {create} from 'zustand'

export const useKeyStore = create(set => {
  return ({
    key: undefined as CircleOfFifthsSelection,
    setKey: (key: CircleOfFifthsSelection) => set({ key }),

    degrees: [] as string[],
    setDegrees: (degrees: string[]) => set({ degrees }),
  })

})
