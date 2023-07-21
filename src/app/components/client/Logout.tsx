"use client"

import { redirect } from 'next/navigation'
import { motion } from "framer-motion"

export default function Logout({
  className = "",
  textColor = "text-red-500",
  logoutPath = "/api/logout",
  logoutMethod = "DELETE",
  redirectPath = "/",
}: {
  className?: string,
  textColor?: string,
  logoutPath?: string,
  logoutMethod?: string,
  redirectPath?: string,
}) {

  const handleSignOut = async () => {
    await fetch(logoutPath, { method: logoutMethod })
    redirect(redirectPath)
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: .3 }}
    >
      <form className="flex w-full" action={handleSignOut}>
        <button type="submit" className={`w-full ${textColor} ${className}`}>Sign out</button>
      </form>
    </motion.div>
  )
}