"use client"

import { User } from "@supabase/supabase-js"
import { createContext, useContext } from "react"

export interface AuthSessionContextInterface {
  user: User | undefined
  reload: false
  reloadFunc: ()=>void
}

export const AuthSessionContext = createContext<AuthSessionContextInterface|undefined>(undefined)

export const AuthSessionContextProvider = ({
  children,
  authSession
}: {
  children: React.ReactNode
  authSession: AuthSessionContextInterface|undefined
}) => {
  return (
    <AuthSessionContext.Provider value={authSession} >
      { children }
    </AuthSessionContext.Provider>
  )
}

export const UseAuthSessionContext = () => {
  const context = useContext<AuthSessionContextInterface|undefined>(AuthSessionContext)
  if (context === undefined) {
    throw new Error(
      "UseAuthSessionContext must be used within a AuthSessionContext.Provider"
    );
  }
  return context
}