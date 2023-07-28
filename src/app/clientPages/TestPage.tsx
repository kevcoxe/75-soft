"use client"

import { useEffect, useState } from "react"
import { Session } from '@supabase/supabase-js'
import { supabase } from "@/utils/supabase"
import TabApp from "@/app/components/new/TabApp"
import Login from "@/app/components/client/Login"
import Skeleton from "@/app/components/client/Skeleton"

export default function TestPage () {

  const [ isLoading, setLoading ] = useState(true)
  const [session, setSession] = useState<Session | null>(null)

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
      setLoading(false)
    })

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
      setLoading(false)
    })
  }, [])

  return (
    <div className="container h-[calc(100dvh)] mx-auto max-w-xlg">
      <Skeleton loading={isLoading}/>

      { !isLoading && (
        <>
          { session && session.user ? (
            <TabApp session={session}>
            </TabApp>
          ) : (
            <div className="px-1 py-2 mx-2 rounded">
              <Login />
            </div>
          )}
        </>
      )}

    </div>
  )
}