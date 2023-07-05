"use client"

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { useState, useEffect } from "react"
import useDebounce from "@/utils/debounce"
import { POINT_PER_MILE } from "@/app/consts"

export default function MileTracker () {
  const supabase = createClientComponentClient<Database>()

  const [ milesTracked, setMiles ] = useState<number>()
  const debouncedMiles = useDebounce(milesTracked, 500)

  // wait for user to stop clicking before submitting
  useEffect(() => {
    console.log(`debouncedMiles: ${debouncedMiles}`)
    if (debouncedMiles !== undefined) {
      console.log(debouncedMiles)
      const updateMiles = async (mileCount: number) => {
        const {
          data: { session }
        } = await supabase.auth.getSession()
        if (!session) return

        const { data: profile } = await supabase.from('profiles').select().match({ user_id: session?.user.id }).single()
        if (!profile) return

        const scoreChange = (mileCount - profile.miles_walked) * POINT_PER_MILE

        const { error } = await supabase
          .from('profiles')
          .update({
            score: profile.score + scoreChange,
            miles_walked: mileCount,
            user_id: session?.user.id
          })
          .eq('id', profile.id)

        if (error) {
          console.log(error)
        }
      }
      updateMiles(debouncedMiles)
    }
  }, [debouncedMiles])

  useEffect(() => {
    const getData = async () => {
      const {
        data: { session }
      } = await supabase.auth.getSession()
      if (!session) return

      const { data: profile } = await supabase.from('profiles').select().match({ user_id: session?.user.id }).single()
      if (!profile) return

      setMiles(profile?.miles_walked)
    }

    getData()
  }, [])

  const decrementMiles = async () => {
    if (milesTracked !== undefined) setMiles(milesTracked - 1)
  }

  const incrementMiles = async () => {
    if (milesTracked !== undefined) setMiles(milesTracked + 1)
  }

  return (
    <div className="flex flex-col mx-4">
      <h1 className="text-xl">Mile tracker: { milesTracked !== undefined ? milesTracked : "loading..." }</h1>

      <div className="grid grid-cols-2">
        <button onClick={decrementMiles} className="col-span-1 text-center bg-red-600 rounded-l-lg">-</button>
        <button onClick={incrementMiles} className="col-span-1 text-center bg-green-600 rounded-r-lg ">+</button>
      </div>
    </div>
  )
}