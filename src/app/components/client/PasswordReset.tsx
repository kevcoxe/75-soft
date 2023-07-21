import { UseAuthSessionContext } from "@/app/contexts/AuthSessionContext"
import { UseSupabaseContext } from "@/app/contexts/SupabaseContext"
import { useState } from "react"
import { ImSpinner8 } from "react-icons/im"
import { motion } from "framer-motion"

export default function PasswordReset () {
  const supabaseContext = UseSupabaseContext()
  const userSessionContext = UseAuthSessionContext()

  const [ newPassword, setNewPassword ] = useState("")
  const [ passwordConfirm, setPasswordConfirm ] = useState("")
  const [ passwordError, setPasswordError ] = useState("")
  const [ isLoading, setIsLoading ] = useState(false)


  const clearForm = () => {
    setNewPassword("")
    setPasswordConfirm("")
    setPasswordError("")
  }

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewPassword(e.target.value)
    setPasswordError("")
  }

  const handlePasswordConfirmChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPasswordConfirm(e.target.value)
    setPasswordError("")
  }

  const handleResetPassword = async () => {
    if (!supabaseContext || !userSessionContext) return
    if (!newPassword || !passwordConfirm) return

    if (newPassword !== passwordConfirm) {
      setPasswordError("Password and newPassword confirmation must match")
      return
    }

    setIsLoading(true)
    const { error } = await supabaseContext.auth.updateUser({password: newPassword})

    if (error) {
      console.log(error)
      setIsLoading(false)
      return
    }

    clearForm()
    window.location.reload()
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: .4 }}
    >
      <div className="flex flex-col w-full mt-4">
        <span className="text-2xl text-center">Password Reset</span>
        <div className="flex flex-col gap-1">
          <label htmlFor="newPassword" >New Password</label>
          <input className={`${passwordError ? "border-2 border-rose-500" : ""} text-black border border-black rounded-lg px-4 py-2`} name="newPassword" id="newPassword" autoComplete="New Password" disabled={isLoading} type="password" placeholder="newPassword" onChange={handlePasswordChange} value={newPassword}></input>
          { passwordError && (
            <span className="text-red-900">{ passwordError }</span>
          )}

          <label htmlFor="passwordConfirm">New Password Confirmation</label>
          <input className={`${passwordError ? "border-2 border-rose-500" : ""} text-black border border-black rounded-lg px-4 py-2`} name="newPasswordConfirm" id="newPasswordConfirm" autoComplete="New Password Confirmation" disabled={isLoading} placeholder="newPasswordConfirm" type="password" onChange={handlePasswordConfirmChange} value={passwordConfirm}></input>
          { passwordError && (
            <span className="text-red-900">{ passwordError }</span>
          )}

          <button onClick={()=>handleResetPassword()} disabled={isLoading} className="py-2 mt-4 text-white bg-black rounded-md">
            { isLoading && (
              <ImSpinner8 className="mx-auto animate-spin" />
            )}

            { !isLoading && (
              <>
                Reset Password
              </>
            )}
          </button>

        </div>
      </div>
    </motion.div>
  )
}