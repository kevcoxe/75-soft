"use client"

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { useState, useEffect } from "react"

export default function UserStats () {
  const supabaseContext = createClientComponentClient<Database>()
  const [ username, setUsername ] = useState<string>()
  const [ score, setScore ] = useState<number>()
  const [ daysSuccessful, setDays ] = useState<number>()

  const getData = async () => {
    const {
      data: { session }
    } = await supabaseContext.auth.getSession()
    if (!session) return

    const { data: profile } = await supabaseContext.from('profiles').select().match({ user_id: session?.user.id }).single()
    if (!profile) return

    setUsername(profile.username)
    setScore(profile.score)
    setDays(profile.days_sucessful)
  }

  useEffect(() => {
    const channel = supabaseContext
      .channel('profile changes')
      .on('postgres_changes', {
        event: '*',
        schema: 'public',
        table: 'profiles'
      }, () => {
        getData()
      }).subscribe()

    return () => {
      supabaseContext.removeChannel(channel)
    }
  }, [supabaseContext])

  useEffect(() => {
    getData()
  }, [])

  return (
    <div className="flex flex-col mx-4 my-2">
      <span>username: { username !== undefined ? username : "loading" }</span>
      <span>score: { score !== undefined ? score : "loading" }</span>
      <span>days: { daysSuccessful !== undefined ? daysSuccessful : "loading" }</span>
    </div>
  )
}