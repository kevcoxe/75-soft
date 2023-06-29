"use client"

import { useState } from "react"
import { loadSession } from "@/app/actions"

export default function SessionLoader() {

  const [session, setSession] = useState(null)

  const loadSessionData = async () => {
    "use server"

    const sessionData = await loadSession()

    setSession(sessionData)
  }

  return (
    <div>
      load data
      { session && (
        JSON.stringify(session)
      )}
    </div>
  )
}