"use client"

import { SupabaseClient } from "@supabase/supabase-js"
import { createContext, useContext } from "react"

export const SupabaseContext = createContext<SupabaseClient<Database>|undefined|null>(undefined)

export const SupabaseContextProvider = ({
  children,
  supabase
}: {
  children: React.ReactNode
  supabase: SupabaseClient<Database>|undefined|null
}) => {
  return (
    <SupabaseContext.Provider value={supabase}>
      { children }
    </SupabaseContext.Provider>
  )
}

export const UseSupabaseContext = () => {
  const context = useContext<SupabaseClient<Database>|undefined|null>(SupabaseContext)
  if (context === undefined) {
    throw new Error(
      "UseSupabaseContext must be used within a SupabaseContext.Provider"
    );
  }
  return context
}