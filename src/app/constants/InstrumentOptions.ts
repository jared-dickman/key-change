import {ICascaderProps} from '@mparticle/aquarium'

export const InstrumentOptions: ICascaderProps['options'] = [
  {
    label: 'Strings',
    value: 'strings',
    children: [
      {
        label: 'Guitar (6 String)',
        value: 'guitar6'
      },
      {
        label: 'Guitar (7 String)',
        value: 'guitar7'
      },
      {
        label: 'Guitar (Acoustic)',
        value: 'guitarAcoustic'
      },
      {
        label: 'Bass (4 String)',
        value: 'bass4'
      },
      {
        label: 'Bass (5 String)',
        value: 'bass5'
      },
      {
        label: 'Ukulele (4 String)',
        value: 'uke4'
      },
      {
        label: 'Ukulele (5 String)',
        value: 'uke'
      }
    ]
  },
  {
    label: 'Others',
    value: 'others',
    children: [
      {
        label: 'Drums',
        value: 'drums'
      },
      {
        label: 'Piano',
        value: 'piano'
      },
      {
        label: 'Trumpet',
        value: 'trumpet'
      },
      {
        label: 'Flute',
        value: 'flute'
      },
    ]
  }
]
