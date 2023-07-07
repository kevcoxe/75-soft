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
  const [ emailError, setEmailError ] = useState<string>("")
  const [ passwordError, setPasswordError ] = useState<string>("")

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
      if (email === "") {
        setEmailError("email cannot be empty")
      }
      if (password === "") {
        setPasswordError("password cannot be empty")
      }

      if (email === "" || password === "") return

      setEmailError("")
      setPasswordError("")

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
        <div className="flex flex-col gap-1 mb-4">
          <label htmlFor="email">Email</label>
          <input className={`${emailError ? "border-2 border-rose-500" : ""}`} name="email" id="email" autoComplete="email" disabled={isLoading} placeholder="email" onChange={(e) => setEmail(e.target.value)} value={email}></input>
          { emailError && (
            <span className="text-red-900">{ emailError }</span>
          )}

          <label htmlFor="email">Password</label>
          <input className={`${passwordError ? "border-2 border-rose-500" : ""}`} name="password" id="password" autoComplete="password" disabled={isLoading} placeholder="password" type="password" onChange={(e) => setPassword(e.target.value)} value={password}></input>
          { passwordError && (
            <span className="text-red-900">{ passwordError }</span>
          )}
        </div>
        <button type="submit" disabled={isLoading} className="py-2 border border-white rounded-md animate-pulse">Login</button>
      </div>
    </form>
  )
}
