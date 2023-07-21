"use client"

import { motion } from "framer-motion"
import { useState } from 'react'

export default function Logout({
  logoutPath = "/api/logout",
  logoutMethod = "DELETE",
  redirectPath = "/",
  logoutFunc
}: {
  logoutPath?: string,
  logoutMethod?: string,
  redirectPath?: string,
  logoutFunc: ()=>void,
}) {

  const [ isLoading, setIsloading ] = useState(false)

  const handleLogout = async () => {
    setIsloading(true)
    await logoutFunc()
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: .3 }}
    >
      <div className="flex w-full">
        <button onClick={handleLogout} type="submit" className="w-full border-4 btn btn-outline btn-lg btn-error">
          { isLoading && (
            <span className="loading loading-spinner"></span>
          )}
          Sign out
        </button>
        {/* <button type="submit" className={`w-full ${textColor} ${className}`}>Sign out</button> */}
      </div>
    </motion.div>
  )
}