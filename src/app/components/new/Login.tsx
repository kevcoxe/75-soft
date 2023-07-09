"use client"

import { useState, useEffect } from "react"
import { UseSupabaseContext } from "@/app/contexts/SupabaseContext"
import { UseAuthSessionContext } from "@/app/contexts/AuthSessionContext"
import { useRouter } from "next/navigation"
import getURL from "@/utils/getURL"


export default function Login () {
  const supabaseContext = UseSupabaseContext()
  const userSessionContext = UseAuthSessionContext()

  const router = useRouter()
  const [ isLoading, setIsLoading ] = useState(false)
  const [ showSignUp, setShowSignUp ] = useState(false)

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


  const signUp = async () => {
    if (supabaseContext) {
      await supabaseContext.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: getURL('/auth/callback'),
        },
      })

      setIsLoading(true)
      userSessionContext.reloadFunc()
      clearForm()
      router.refresh()
      setIsLoading(false)
    }
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

  const loginAction = async () => {
    if (supabaseContext) {
      if (showSignUp) {
        await signUp()
        return
      } else {
        await login()
      }
    }
  }

  const toggleSignup = () => {
    setShowSignUp(!showSignUp)
  }


  return (
    <div className="grid content-around h-screen grid-cols-1 ">
      <div className={`content-around flex flex-col gap-1 ${isLoading ? "animate-pulse" : ""}`}>
        <h1 className="mb-16 text-center text-7xl">
          75 Soft
        </h1>
        <form className="flex flex-col gap-1" action={loginAction}>
          <label htmlFor="email">Email</label>
          <input className={`${emailError ? "border-2 border-rose-500" : ""} text-black border border-black rounded-lg px-4 py-2`} name="email" id="email" autoComplete="email" disabled={isLoading} placeholder="email" onChange={(e) => setEmail(e.target.value)} value={email}></input>
          { emailError && (
            <span className="text-red-900">{ emailError }</span>
          )}

          <label htmlFor="email">Password</label>
          <input className={`${passwordError ? "border-2 border-rose-500" : ""} text-black border border-black rounded-lg px-4 py-2`} name="password" id="password" autoComplete="password" disabled={isLoading} placeholder="password" type="password" onChange={(e) => setPassword(e.target.value)} value={password}></input>
          { passwordError && (
            <span className="text-red-900">{ passwordError }</span>
          )}

          <button type="submit" disabled={isLoading} className={`py-2 mt-4 border ${showSignUp ? "bg-black text-white" : " border-black"} rounded-md`}>{ showSignUp ? "Sign Up" : "Login" }</button>
        </form>

        <form action={toggleSignup}>
          <button type="submit" disabled={isLoading} className="w-full py-2 mt-4 underline">{ showSignUp ? "Go to login" : "Go to sign up" }</button>
        </form>
      </div>
    </div>
  )
}
