"use client"

import { POINT_PER_MILE } from "@/app/consts"
import { UseSupabaseContext } from "@/app/contexts/SupabaseContext"
import useDebounce from "@/utils/debounce"
import { useEffect, useState } from "react"

export default function Miles({
  profile
}: {
  profile: Profile
}) {

  const supabaseContext = UseSupabaseContext()

  const [ milesTracked, setMiles ] = useState<number>(profile.miles_walked)
  const debouncedMiles = useDebounce(milesTracked, 500)

  // wait for user to stop clicking before submitting
  useEffect(() => {
    if (!supabaseContext) return
    if (debouncedMiles !== undefined) {
      const updateMiles = async (mileCount: number) => {
        const scoreChange = (mileCount - profile.miles_walked) * POINT_PER_MILE
        const { error } = await supabaseContext
          .rpc('incrementMiles', {
            userid: profile.user_id,
            score_increment: scoreChange,
            mile_increment: mileCount
          })

        if (error) {
          console.log(error)
        }
      }
      updateMiles(debouncedMiles)
    }
  }, [debouncedMiles])

  const decrementMiles = async () => {
    if (milesTracked !== undefined && milesTracked > 0) setMiles(milesTracked - 1)
  }

  const incrementMiles = async () => {
    if (milesTracked !== undefined) setMiles(milesTracked + 1)
  }

  return (
    <>
      <div className="flex flex-col p-4 m-2 border rounded-lg border-slate-800">
        <h1 className="text-xl">Mile tracker: { milesTracked !== undefined ? milesTracked : "loading..." }</h1>

        <div className="grid grid-cols-2">
          <button onClick={decrementMiles} className="col-span-1 text-center bg-red-600 rounded-l-lg">-</button>
          <button onClick={incrementMiles} className="col-span-1 text-center bg-green-600 rounded-r-lg ">+</button>
        </div>
      </div>
    </>
  )
}