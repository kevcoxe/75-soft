"use client"

import { useState } from "react"
import { BiShow, BiHide } from "react-icons/bi"

export default function Stats({
  profile,
  logoutChild = <></>
}: {
  profile: Profile,
  logoutChild?: React.ReactNode
}) {

  const [ collapse, setCollapse ] = useState(true)

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
              <div className="col-span-5 px-2 py-4 my-2 rounded-xl bg-slate-800">Username: { profile.username }</div>
              <button className="col-span-1 mx-auto text-4xl" onClick={handleCollapse}>{ collapse ? <BiShow /> : <BiHide /> }</button>
            </div>
            <div className={`${collapse ? "hidden" : ""}`}>
              <div className="px-2 py-4 my-2 rounded-xl bg-slate-800">Score: { profile.score }</div>
              <div className="px-2 py-4 my-2 rounded-xl bg-slate-800">Days Completed: { profile.days_sucessful }</div>
              <div className="px-2 py-4 my-2 rounded-xl bg-slate-800">Miles walked: { profile.miles_walked }</div>
              { logoutChild }
            </div>
          </div>
        </div>
      </div>
    </>
  )
}