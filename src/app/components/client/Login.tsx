"use client"

import { useState, useEffect } from "react"
import { UseSupabaseContext } from "@/app/contexts/SupabaseContext"
import { UseAuthSessionContext } from "@/app/contexts/AuthSessionContext"
import { useRouter } from "next/navigation"
import getURL from "@/utils/getURL"
import { ImSpinner8 } from "react-icons/im"


export default function Login () {
  const supabaseContext = UseSupabaseContext()
  const userSessionContext = UseAuthSessionContext()

  const router = useRouter()
  const [ isLoading, setIsLoading ] = useState(false)
  const [ showSignUp, setShowSignUp ] = useState(false)
  const [ showForgotPassword, setShowForgotPassword ] = useState(false)

  const [ email, setEmail ] = useState<string>("")
  const [ password, setPassword ] = useState<string>("")
  const [ emailError, setEmailError ] = useState<string>("")
  const [ passwordError, setPasswordError ] = useState<string>("")
  const [ message, setMessage ] = useState("")

  useEffect(() => {
    if (!supabaseContext) {
      setIsLoading(true)
    }
  }, [supabaseContext])

  const clearForm = () => {
    setEmail("")
    setPassword("")
  }

  const afterSignUp = () => {
    clearForm()
    setIsLoading(false)
    setShowForgotPassword(false)
    setShowSignUp(false)
    setMessage("Please check your email for account confirmation.")
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
      afterSignUp()
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

  const forgotPassword = async () => {
    if (supabaseContext) {
      if (email === "") {
        setEmailError("email cannot be empty")
        return
      }

      await supabaseContext.auth.resetPasswordForEmail(
        email, {
        redirectTo: getURL('/auth/callback'),
      })
    }
  }

  const loginAction = async () => {
    if (supabaseContext) {
      if (showForgotPassword) {
        await forgotPassword()
        return
      }

      if (showSignUp) {
        await signUp()
        return
      }

      await login()
      return
    }
  }

  const toggleSignup = () => {
    setShowSignUp(!showSignUp)
  }

  const toggleForgotPassword = () => {
    setShowForgotPassword(!showForgotPassword)
  }

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value)
    setEmailError("")
  }

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value)
    setPasswordError("")
  }


  return (
    <div className="grid content-around h-screen grid-cols-1 ">
      <div className={`content-around flex flex-col gap-1`}>
        <h1 className="mb-16 text-center text-7xl">
          75 Soft
        </h1>

        { message && (
          <div className="mb-4 text-2xl text-center underline">
            { message }
          </div>
        )}

        <form className="flex flex-col gap-1" action={loginAction}>
          <label htmlFor="email" >Email</label>
          <input className={`${emailError ? "border-2 border-rose-500" : ""} text-black border border-black rounded-lg px-4 py-2`} name="email" id="email" autoComplete="email" disabled={isLoading} placeholder="email" onChange={handleEmailChange} value={email}></input>
          { emailError && (
            <span className="text-red-900">{ emailError }</span>
          )}

          { !showForgotPassword && (
            <>
              <label htmlFor="email">Password</label>
              <input className={`${passwordError ? "border-2 border-rose-500" : ""} text-black border border-black rounded-lg px-4 py-2`} name="password" id="password" autoComplete="password" disabled={isLoading} placeholder="password" type="password" onChange={handlePasswordChange} value={password}></input>
              { passwordError && (
                <span className="text-red-900">{ passwordError }</span>
              )}

              <button type="submit" disabled={isLoading} className="py-2 mt-4 text-center text-white bg-black rounded-md">
                { isLoading && (
                  <ImSpinner8 className="mx-auto animate-spin" />
                )}

                { !isLoading && (
                  <>
                    { showSignUp ? "Sign Up" : "Login" }
                  </>
                )}
              </button>
            </>
          )}

          { showForgotPassword && (
            <button type="submit" disabled={isLoading} className="py-2 mt-4 text-white bg-black rounded-md">
              { isLoading && (
                <ImSpinner8 className="mx-auto animate-spin" />
              )}

              { !isLoading && (
                <>
                  Reset Password
                </>
              )}
            </button>
          )}
        </form>

        { !showForgotPassword && (
          <form action={toggleSignup}>
            <div className="flex justify-center w-full">
              <button type="submit" disabled={isLoading} className="py-2 mt-4 underline">{ showSignUp ? "Go to login" : "Go to sign up" }</button>
            </div>
          </form>
        )}
        { !showSignUp && (
          <form action={() => toggleForgotPassword()}>
            <div className="flex justify-center w-full">
              <button type="submit" disabled={isLoading} className="py-2 underline">{ showForgotPassword ? "Back to login" : "Forgot Password" }</button>
            </div>
          </form>
        )}
      </div>
    </div>
  )
}
