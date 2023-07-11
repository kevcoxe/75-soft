"use client"

import { ONE_DAY_IN_MILLISECONDS } from "@/app/consts"
import { useEffect, useState } from "react"

export default function ProgressTracker({
  profile,
}: {
  profile: Profile,
}) {

  const [ startDate, setStartDate ] = useState<string>()
  const [ currentDate, setCurrentDate ] = useState<string>()
  const [ endDate, setEndDate ] = useState<string>()


  useEffect(() => {
    if (!profile.created_at) return

    const current = new Date()
    const start = new Date(profile.created_at)
    const end = new Date(start.getTime() + (75 * ONE_DAY_IN_MILLISECONDS))

    setCurrentDate(current.toLocaleDateString('en-us', { year:"numeric", month:"numeric", day:"numeric"}))
    setStartDate(start.toLocaleDateString('en-us', { year:"numeric", month:"numeric", day:"numeric"}))
    setEndDate(end.toLocaleDateString('en-us', { year:"numeric", month:"numeric", day:"numeric"}))

  }, [profile])


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