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

  const getUser = async () => {
    console.log("getting user")

    const newSupabase = createClientComponentClient<Database>()

    const {
      data: { session }
    } = await newSupabase.auth.getSession()

    setSupabase(newSupabase)

    if (!session) return
    setAuthContext({...authContext, user: session?.user})
  }

  useEffect(() => {
    getUser()
  }, [loadUser])

  useEffect(() => {
    getUser()
  }, [])

  return (
    <SupabaseContextProvider supabase={supabase}>
      <AuthSessionContextProvider authSession={authContext}>
        { children }
      </AuthSessionContextProvider>
    </SupabaseContextProvider>
  )
}