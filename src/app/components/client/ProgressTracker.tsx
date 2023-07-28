"use client"

import { Session } from "@supabase/supabase-js"
import { useEffect, useState } from "react"
import { supabase } from "@/utils/supabase"
import { getCurrentDateStr } from "@/utils/dateUtils"

export default function ProgressTracker({
  session,
}: {
  session: Session,
}) {

  const [ startDate, setStartDate ] = useState<string>()
  const [ currentDate, setCurrentDate ] = useState<string>()
  const [ endDate, setEndDate ] = useState<string>()
  const [ isLoading, setLoading ] = useState(true)

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
        let {
          startDate,
          currentDate,
          endDate,
        } = getCurrentDateStr(data)
    
        setCurrentDate(currentDate)
        setStartDate(startDate)
        setEndDate(endDate)
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

  return (
    <>
      <div className="col-span-6 px-1 py-2 my-2 rounded-xl">
        <div className="grid items-center content-center grid-cols-12">
          <div className="flex flex-col items-center justify-center col-span-4">
            <span className="text-lg font-bold">Start Date</span>
            <span>{ startDate }</span>
          </div>

          <div className="flex flex-col items-center content-center col-span-4">
            <span className="text-lg font-bold">Today</span>
            <span>{ currentDate }</span>
          </div>

          <div className="flex flex-col items-center content-center col-span-4">
            <span className="text-lg font-bold">End Date</span>
            <span>{ endDate }</span>
          </div>
        </div>
      </div>
    </>
  )
}