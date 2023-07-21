"use client"

import { POINT_PER_MILE } from "@/app/consts"
import { UseSupabaseContext } from "@/app/contexts/SupabaseContext"
import useDebounce from "@/utils/debounce"
import { useEffect, useState } from "react"
import { BiWalk } from "react-icons/bi"

export default function DailyMiles({
  profile
}: {
  profile: Profile
}) {

  const supabaseContext = UseSupabaseContext()

  const [ isLoading, setIsLoading ] = useState(true)
  const [ milesTracked, setMiles ] = useState<number>(profile.daily_miles)
  const debouncedMiles = useDebounce(milesTracked, 500)

  useEffect(() => {
    setIsLoading(true)
    setMiles(profile.daily_miles)
    setIsLoading(false)
  }, [profile.daily_miles])

  // wait for user to stop clicking before submitting
  useEffect(() => {
    if (!supabaseContext) return
    if (debouncedMiles !== undefined) {
      const updateMiles = async () => {
        setIsLoading(true)
        const score_increment = (debouncedMiles - profile.daily_miles) * POINT_PER_MILE
        const mile_increment = debouncedMiles - profile.daily_miles
        const { error } = await supabaseContext
          .rpc('incrementDailyMiles', {
            userid: profile.user_id,
            score_increment,
            mile_count: debouncedMiles
          })

        if (error) {
          console.log(error)
        }
        setIsLoading(false)
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
    <div className="w-full px-4 shadow-xl card bg-base-100">
      <div className="card-body">
        <h2 className="card-title">Miles Walked Today: { milesTracked !== undefined ? milesTracked : "loading..." }</h2>
        <div className="justify-end card-actions">
          <div className="flex flex-grow join">
            <button onClick={decrementMiles} className="flex-grow text-4xl btn join-item btn-error">
              { isLoading && (
                <span className="loading loading-ring"></span>
              )}
              { !isLoading && (
                <BiWalk className="text-4xl -rotate-180 -scale-y-100" />
              )}
            </button>
            <button onClick={incrementMiles} className="flex-grow text-4xl btn join-item btn-success">
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

  return (
    <>
      <div className="flex flex-col p-4 m-2 border rounded-lg border-slate-800">
        <h1 className="mb-2 text-2xl font-bold">Miles Walked Today: { milesTracked !== undefined ? milesTracked : "loading..." }</h1>

        <div className="grid grid-cols-2">
          <button disabled={isLoading} onClick={decrementMiles} className="col-span-1 py-1 text-2xl font-bold text-center bg-red-600 rounded-l-lg">-</button>
          <button disabled={isLoading} onClick={incrementMiles} className="col-span-1 py-1 text-2xl font-bold text-center bg-green-600 rounded-r-lg">+</button>
        </div>
      </div>
    </>
  )
}