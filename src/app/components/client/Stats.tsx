"use client"

import { useEffect, useState } from "react"
import ProgressTracker from "@/app/components/client/ProgressTracker"
import { motion } from "framer-motion"

export default function Stats({
  profile,
  logoutChild = <></>,
  startCollapsed = true
}: {
  profile: Profile,
  logoutChild?: React.ReactNode,
  startCollapsed?: boolean
}) {

  const [ userProfile, setUserProfile ] = useState(profile)
  const [ collapse, setCollapse ] = useState(startCollapsed)

  useEffect(() => {
    setUserProfile(profile)
  }, [profile])

  const handleCollapse = () => {
    setCollapse(!collapse)
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: .3 }}
    >
      <ProgressTracker profile={userProfile} />
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
    </motion.div>
  )
}