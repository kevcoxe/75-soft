"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Session } from "@supabase/supabase-js"
import { supabase } from "@/utils/supabase"

export default function Welcome({
  session,
} : {
  session: Session
}) {
  const [ username, setUsername ] = useState<string>("")
  const [ usernameError, setUsernameError ] = useState<string>("")
  const [ isLoading, setIsLoading ] = useState(false)

  const router = useRouter()

  const clearForm = () => {
    setUsername("")
    setUsernameError("")
    setIsLoading(false)
  }

  const start75Soft = async () => {
    if (!session.user) return
    if (!username) {
      setUsernameError("Username cannot be empty")
      return
    }

    setIsLoading(true)
    await Promise.all([
      supabase.from('profiles').insert({
        username,
        user_id: session.user.id
      }),
      supabase.from('todos').insert({
        name: "Read a book",
        description: "Read at least 10 pages of a non fiction book.",
        user_id: session.user.id
      }),
      supabase.from('todos').insert({
        name: "Workout",
        description: "Do a 45 minute workout, can be split up thought the day. Also try to walk 1 mile a day.",
        user_id: session.user.id
      }),
      supabase.from('todos').insert({
        name: "Drink water",
        description: "Goal is to drink at least 96oz of water.",
        user_id: session.user.id
      }),
      supabase.from('todos').insert({
        name: "Follow Diet",
        description: "Pick a diet plan and follow it.",
        user_id: session.user.id
      }),
    ])

    clearForm()
    router.refresh()
  }

  return (
    <div className="grid content-around h-screen grid-cols-1 ">
      <div className={`content-around flex flex-col px-6 gap-1 ${isLoading ? "animate-pulse" : ""}`}>
        <div className="flex flex-col mb-16">
          <span className="mb-2 text-center text-7xl">
            75 Soft
          </span>
          <span className="mb-2 text-2xl text-center">Welcome to 75 soft.</span>
          <p className="mb-4 indent-8">75 soft is a fitness and life challenge. It consists of daily challenges. To proceed to the following day you must complete the challenges each day. If you fail to complete all of the tasks each day you must start over from day one. Good luck you got this!</p>

          <div className="flex flex-col">
            <span className="mb-2 text-lg underline">Daily task list:</span>
            <ul className="ml-4 list-disc ">
              <li>Pick a diet and follow it</li>
              <li>Drink at least 96oz of water</li>
              <li>Read 10 pages of a non fiction book</li>
              <li>Workout for 45 minutes</li>
            </ul>
          </div>
        </div>

        <form className="flex flex-col gap-1" action={start75Soft}>
          <label htmlFor="username">Username</label>
          <input className={`${usernameError ? "border-2 border-rose-500" : ""} text-black border border-black rounded-lg px-4 py-2`} name="username" id="username" autoComplete="username" disabled={isLoading} placeholder="username" onChange={(e) => setUsername(e.target.value)} value={username}></input>
          { usernameError && (
            <span className="text-red-900">{ usernameError }</span>
          )}

          <button type="submit" disabled={isLoading} className={`py-2 mt-4 border border-black bg-black text-white rounded-md`}>Start 75 Soft</button>
        </form>

      </div>
    </div>
  )
}