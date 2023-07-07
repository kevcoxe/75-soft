"use client"

import { SupabaseContextProvider } from "@/app/contexts/SupabaseContext"
import { AuthSessionContextProvider, AuthSessionContextInterface } from "@/app/contexts/AuthSessionContext"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { SupabaseClient } from "@supabase/supabase-js"
import { useEffect, useState } from "react"

export default function SupabaseProviderWrapper({ children }: { children: React.ReactNode }) {

  const [ supabase, setSupabase ] = useState<SupabaseClient|null>(null)
  const [ loadUser, setLoadUser ] = useState(false)

  const updateLoadUser = () => {
    setLoadUser(!loadUser)
  }
  const [ authContext, setAuthContext ] = useState<AuthSessionContextInterface>({
    user: undefined,
    reload: loadUser,
    reloadFunc: updateLoadUser
  } as AuthSessionContextInterface)

  useEffect(() => {
    const getUser = async () => {
      const supabase = createClientComponentClient<Database>()
      setSupabase(supabase)

      const {
        data: { session }
      } = await supabase.auth.getSession()

      if (!session) return
      setAuthContext({...authContext, user: session?.user})
    }
    getUser()
  }, [loadUser])

  return (
    <SupabaseContextProvider supabase={supabase}>
      <AuthSessionContextProvider authSession={authContext}>
        { children }
      </AuthSessionContextProvider>
    </SupabaseContextProvider>
  )
}