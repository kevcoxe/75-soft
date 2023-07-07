"use client"

import { useState, useEffect } from "react"
import { UseSupabaseContext } from "@/app/contexts/SupabaseContext"
import { UseAuthSessionContext } from "@/app/contexts/AuthSessionContext"
import { useRouter } from "next/navigation"


export default function Login () {
  const supabaseContext = UseSupabaseContext()
  const userSessionContext = UseAuthSessionContext()

  const router = useRouter()
  const [ isLoading, setIsLoading ] = useState(false)

  const [ email, setEmail ] = useState<string>("")
  const [ password, setPassword ] = useState<string>("")
  const [ formError, setFormError ] = useState<string>("")

  useEffect(() => {
    if (!supabaseContext) {
      setIsLoading(true)
    }
  }, [supabaseContext])

  const clearForm = () => {
    setEmail("")
    setPassword("")
  }

  const login = async () => {
    if (supabaseContext) {
      if (email === undefined) {
        setFormError("email cannot be empty")
        return
      }
      if (password === undefined) {
        setFormError("password cannot be empty")
        return
      }

      setFormError("")

      await supabaseContext.auth.signInWithPassword({
        email,
        password,
      })

      setIsLoading(true)
      userSessionContext.reloadFunc()
      clearForm()
      router.refresh()
      setIsLoading(false)
    }
  }


  return (
    <form className="grid content-around h-screen grid-cols-1 " action={login}>
      <div className={`content-around flex flex-col gap-1 ${isLoading ? "animate-pulse" : ""}`}>
        <h1 className="mb-16 text-center text-7xl">
          75 Soft
        </h1>
        { formError && (
          <span className="text-red-900">{ formError }</span>
        )}
        <div className="flex flex-col gap-1 mb-4">
          <input name="email" id="email" autoComplete="email" disabled={isLoading} placeholder="email" onChange={(e) => setEmail(e.target.value)} value={email}></input>
          <input name="password" id="password" autoComplete="password" disabled={isLoading} placeholder="password" type="password" onChange={(e) => setPassword(e.target.value)} value={password}></input>
        </div>
        <button type="submit" disabled={isLoading} className="border border-white rounded-md">Login</button>
      </div>
    </form>
  )
}
