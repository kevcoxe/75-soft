"use client"

import { POINT_PER_MILE } from "@/app/consts"
import useDebounce from "@/utils/debounce"
import { Session } from "@supabase/supabase-js"
import { useEffect, useState } from "react"
import { BiWalk } from "react-icons/bi"
import { supabase } from "@/utils/supabase"

export default function DailyMiles({
  session
}: {
  session: Session
}) {


  const [ isLoading, setLoading ] = useState(true)
  const [ profile, setProfile ] = useState<Profile>()
  const [ milesTracked, setMiles ] = useState<number>()
  const debouncedMiles = useDebounce(milesTracked, 500)


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
        setMiles(data.daily_miles)
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

  // wait for user to stop clicking before submitting
  useEffect(() => {
    if (!session || !profile) return
    if (debouncedMiles !== undefined) {
      const updateMiles = async () => {
        setLoading(true)
        const score_increment = (debouncedMiles - profile.daily_miles) * POINT_PER_MILE
        const mile_increment = debouncedMiles - profile.daily_miles
        const { error } = await supabase
          .rpc('incrementDailyMiles', {
            userid: profile.user_id,
            score_increment,
            mile_count: debouncedMiles
          })

        if (error) {
          console.log(error)
        }
        setLoading(false)
      }
      updateMiles()
    }
  }, [debouncedMiles])

  const decrementMiles = async () => {
    if (milesTracked !== undefined && milesTracked > 0) setMiles(milesTracked - 1)
  }

  const incrementMiles = async () => {
    if (milesTracked !== undefined) setMiles(milesTracked + 1)
  }

  return (
    <div className="w-full card">
      <div className="card-body">
        <div className="flex items-center gap-2">
          <h2 className="text-lg card-title">Miles Walked Today</h2>
          <span className="badge badge-lg indicator-item badge-info">{ milesTracked && milesTracked }</span>
        </div>
        <div className="justify-end card-actions">
          <div className="flex flex-grow join">
            <button disabled={isLoading} onClick={decrementMiles} className="flex-grow text-4xl btn join-item btn-error">
              { isLoading && (
                <span className="loading loading-ring"></span>
              )}
              { !isLoading && (
                <BiWalk className="text-4xl -rotate-180 -scale-y-100" />
              )}
            </button>
            <button disabled={isLoading} onClick={incrementMiles} className="flex-grow text-4xl btn join-item btn-success">
              { isLoading && (
                <span className="loading loading-ring"></span>
              )}
              { !isLoading && (
                <BiWalk className="text-4xl" />
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}