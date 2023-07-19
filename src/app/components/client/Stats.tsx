"use client"

import { useEffect, useState } from "react"
import { BiShow, BiHide } from "react-icons/bi"
import ProgressTracker from "@/app/components/client/ProgressTracker"

export default function Stats({
  profile,
  logoutChild = <></>
}: {
  profile: Profile,
  logoutChild?: React.ReactNode
}) {

  const [ userProfile, setUserProfile ] = useState(profile)
  const [ collapse, setCollapse ] = useState(true)

  useEffect(() => {
    setUserProfile(profile)
  }, [profile])

  const handleCollapse = () => {
    setCollapse(!collapse)
  }

  return (
    <>
      <div className="flex flex-col p-4 m-2 border rounded-lg border-slate-800">
        <div className="grid items-center grid-cols-6">
          {/* <div className="flex col-span-6">
            <div className="w-24 h-24 rounded-full bg-slate-800"></div>
          </div> */}
          <div className="flex flex-col col-span-6">
            <div className="grid grid-cols-6">
              <div className="col-span-5 px-2 py-4 my-2 text-2xl font-bold rounded-xl">Username: { userProfile.username }</div>
              <button className="col-span-1 mx-auto text-4xl" onClick={handleCollapse}>{ collapse ? <BiShow /> : <BiHide /> }</button>
            </div>
            <div className={`${collapse ? "hidden" : ""}`}>
              <ProgressTracker profile={userProfile} />
              <div className="px-2 py-4 my-2 text-2xl font-bold rounded-xl">Score: { userProfile.score }</div>
              <div className="px-2 py-4 my-2 text-2xl font-bold rounded-xl">Days Completed: { userProfile.days_sucessful }</div>
              <div className="px-2 py-4 my-2 text-2xl font-bold rounded-xl">Miles walked: { userProfile.miles_walked }</div>
              { logoutChild }
            </div>
          </div>
        </div>
      </div>
    </>
  )
}