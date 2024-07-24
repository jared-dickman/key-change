import {LocalStorageKeys} from '@/constants/LocalStorageKeys'
import {musicTeacherPrompt} from '@/constants/MusicTeacherPrompt'
import {Result, Skeleton} from '@mparticle/aquarium'
import OpenAI from 'openai'
import {useEffect, useRef, useState} from 'react'
import Markdown from 'react-markdown'

interface IGeneratePracticeSessionProps {
  refreshSuggestion: boolean
}

export function GeneratePracticeSession(props: IGeneratePracticeSessionProps) {
  const [isLoading, setIsLoading] = useState(true)
  const [isError, setIsError] = useState(false)

  const suggestedSession = useRef<string>()

  useEffect(() => { generateSuggestion() }, [props.refreshSuggestion])

  async function generateSuggestion(): Promise<void> {
    try {
      setIsError(false)
      setIsLoading(true)

      const openai = new OpenAI({
                                  organization: process.env.NEXT_PUBLIC_OPEN_AI_ORGANIZATION,
                                  project: process.env.NEXT_PUBLIC_OPEN_AI_PROJECT,
                                  apiKey: process.env.NEXT_PUBLIC_OPEN_AI_API_KEY,
                                  dangerouslyAllowBrowser: true,
                                })

      const userPrompt = localStorage.getItem(LocalStorageKeys.sessions) ?? ''
      const chatCompletion = await openai.chat.completions.create({
                                                                    messages: [
                                                                      { role: 'system', content: musicTeacherPrompt },
                                                                      { role: 'user', content: userPrompt },
                                                                    ],
                                                                    model: 'gpt-4o-mini',
                                                                  })

      suggestedSession.current = chatCompletion.choices[0].message.content as string

    } catch (e) {
      setIsError(true)
    } finally {
      setIsLoading(false)
    }
  }

  if (isLoading) return <Skeleton/>
  if (isError) return <Result status="error"/>

  return <Markdown components={{
    code(props) {
      const { node, ...rest } = props
      return <i style={{ textWrap: 'pretty' }} {...rest} />
    }
  }}>{suggestedSession.current}</Markdown>
}
