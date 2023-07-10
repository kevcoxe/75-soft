"use client"

import { useEffect, useState } from "react"

export default function ProgressTracker({
  profile,
}: {
  profile: Profile,
}) {

  const [ startDate, setStartDate ] = useState<string>()
  const [ currentDate, setCurrentDate ] = useState<string>()
  const [ endDate, setEndDate ] = useState<string>()
  const [ progress, setProgress ] = useState<number>()
  const [ currentProgress, setCurrentProgress ] = useState<number>()
  const [ daysComplete, setDaysComplete ] = useState<number>()

  useEffect(() => {
    if (!profile.created_at) return
    const oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds

    const current = new Date()
    const start = new Date(profile.created_at)
    const end = new Date(start.getTime() + (75 * oneDay))


    const diffDays = Math.round(Math.abs((current.getTime() - start.getTime()) / oneDay));
    setDaysComplete(diffDays)
    setProgress(Math.round((diffDays / 75) * 100))
    setCurrentProgress(Math.round((profile.days_sucessful / 75) * 100))

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

          <div className="flex flex-col items-center justify-center col-span-12 mt-4">
            <span className="text-lg font-bold">Progress</span>
            <div className="flex flex-col w-full h-12 overflow-hidden bg-gray-200 rounded-xl dark:bg-gray-700">
              <div className="flex flex-col justify-center h-full overflow-hidden leading-none text-center text-blue-100 bg-blue-700" role="progressbar" style={{ width: `${ progress }%` }}>{ progress }%</div>
              <div className="flex flex-col justify-center h-full overflow-hidden leading-none text-center text-blue-100 bg-green-600" role="progressbar" style={{ width: `${ currentProgress }%` }}>{ currentProgress }%</div>
            </div>
            <div className="flex flex-col">
              <div className="flex">
                <span className="self-center px-6 py-1 mr-2 bg-blue-600"></span>
                <span>Current Date { daysComplete }</span>
              </div>
              <div className="flex">
                <span className="self-center px-6 py-1 mr-2 bg-green-600"></span>
                <span>Days Successful { profile.days_sucessful }</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}