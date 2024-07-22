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
      debugger

      const openai = new OpenAI({
                                  // @ts-ignore
                                  organization: window.organization || process.env.OPEN_AI_ORGANIZATION,
                                  // @ts-ignore
                                  project: window.project || process.env.OPEN_AI_PROJECT,
                                  // @ts-ignore
                                  apiKey: window.apiKey || process.env.OPEN_AI_API_KEY,
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