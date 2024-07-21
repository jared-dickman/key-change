import {LocalStorageKeys} from '@/app/constants/LocalStorageKeys'
import {musicTeacherPrompt} from '@/app/constants/MusicTeacherPrompt'
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
                                  // @ts-ignore
                                  organization: window.organization,
                                  // @ts-ignore
                                  project: window.project,
                                  // @ts-ignore
                                  apiKey: window.apiKey,
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

  return <Markdown>{suggestedSession.current}</Markdown>
}
