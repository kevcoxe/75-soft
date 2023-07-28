"use client"

import { useEffect, useState } from "react"
import ProgressTracker from "@/app/components/client/ProgressTracker"
import { motion } from "framer-motion"
import { Session } from "@supabase/supabase-js"
import { supabase } from "@/utils/supabase"

export default function Stats({
  session,
}: {
  session: Session
}) {

  const [ isLoading, setLoading ] = useState(true)
  const [ profile, setProfile ] = useState<Profile>()


  const getProfile = async () => {
    try {
      if (!session?.user) throw new Error("No user on the session!")

      let { data, error, status } = await supabase
        .from('profiles')
        .select()
        .match({
          user_id: session.user.id
        })
        .single()

      if (error && status !== 406) {
        throw error
      }

      if (data) {
        setProfile(data)
      }
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message)
      }
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    setLoading(true)
    getProfile()

    const profileChannel = supabase
      .channel('daily miles profile changes')
      .on('postgres_changes', {
        event: '*',
        schema: 'public',
        table: 'profiles'
      }, () => {
        getProfile()
      }).subscribe()

    return () => {
      supabase.removeChannel(profileChannel)
    }
  }, [session])

  useEffect(() => {
    setProfile(profile)
  }, [profile])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: .3 }}
    >
      <ProgressTracker session={session}/>
      { profile && (
        <div className="w-full shadow stats stats-vertical">
          <div className="stat place-items-center">
            <div className="stat-title">Points</div>
            <div className="stat-value">{ profile.score }</div>
          </div>

          <div className="stat place-items-center">
            <div className="stat-title">Days Completed</div>
            <div className="stat-value">{ profile.days_sucessful }</div>
          </div>

          <div className="stat place-items-center">
            <div className="stat-title">Total Miles Walked</div>
            <div className="stat-value">{ profile.miles_walked }</div>
          </div>
        </div>
      )}
    </motion.div>
  )
}