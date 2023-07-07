"use client"

import { redirect } from 'next/navigation'

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
    <form className="flex w-full" action={handleSignOut}>
      <button type="submit" className={`w-full ${textColor} ${className}`}>Sign out</button>
    </form>
  )
}