"use client"

import { useState } from "react"

export default function SessionLoader() {

  const [session, ] = useState(null)

  return (
    <div>
      load data
      { session && (
        JSON.stringify(session)
      )}
    </div>
  )
}