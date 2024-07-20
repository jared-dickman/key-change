import {useKeyStore} from '@/app/stores/KeyStore'
import {Button, Space, Typography} from '@mparticle/aquarium'
import {useCallback, useEffect, useRef, useState} from 'react'

export function Metronome() {
  const { key, degrees } = useKeyStore()

  // if (!key || !degrees.length) {
  // return null
  // }

  const [currentDegree, setCurrentDegree] = useState(degrees[0])
  const audioCtx = useRef(null as unknown as AudioContext)

  useEffect(() => {
    //@ts-ignore
    const AudioContext = window.AudioContext || window.webkitAudioContext
    audioCtx.current = new AudioContext()

    playMP3FromURL(audioCtx.current, 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/858/outfoxing.mp3')
  }, [playMP3FromURL])


  const onMetronomeTick = useCallback(createOnMetronomeTick, [degrees])

  return <>
    <Space>
      <Button onClick={e => { toggleMetronome() }}>Metronome</Button>
      {currentDegree&&<Typography.Text>{currentDegree}</Typography.Text>}
    </Space>
  </>

  function toggleMetronome(): void {
    setCurrentDegree(degrees[0])
    setInterval(onMetronomeTick, 1000)
  }


  async function fetchMP3(url: string): Promise<ArrayBuffer> {
    const response = await fetch(url)
    if (!response.ok) {
      throw new Error(`Error fetching audio file: ${url}`)
    }
    return response.arrayBuffer()
  }

  async function playMP3FromURL(audioContext:AudioContext, url:string): Promise<void> {
    try {
      const arrayBuffer = await fetchMP3(url)
      const audioBuffer = await audioContext.decodeAudioData(arrayBuffer)
      const source = audioContext.createBufferSource()

      source.buffer = audioBuffer
      source.connect(audioContext.destination)

      // source.start(0) // Start from the beginning (optional parameter)

    } catch (error) {
      console.error('Error playing audio:', error)
    }
  }

  function createOnMetronomeTick() :void{
    setCurrentDegree(prevState => {

      const currentDegreeIndex = degrees.findIndex(degree => degree === prevState)

      const nextDegreeIndex = currentDegreeIndex + 1
      const nextDegree = nextDegreeIndex === degrees.length ? degrees[0] : degrees[nextDegreeIndex]

      setCurrentDegree(nextDegree)
      return degrees[1]
    })
  }

}
