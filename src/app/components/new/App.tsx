"use client"

import { useState, useEffect } from "react"
import { UseSupabaseContext } from "@/app/contexts/SupabaseContext"
import { UseAuthSessionContext } from "@/app/contexts/AuthSessionContext"
import { User } from "@supabase/supabase-js"
import Login from "@/app/components/new/Login"
import Logout from "@/app/components/client/Logout"
import Skeleton from "@/app/components/new/Skeleton"
import Stats from "@/app/components/new/Stats"
import Miles from "@/app/components/new/Miles"
import TodoList from "@/app/components/new/TodoList"
import ScoreBoard from "@/app/components/new/ScoreBoard"
import Welcome from "./Welcome"


export default function App({
  children
}: {
  children: React.ReactNode 
}) {
  const supabaseContext = UseSupabaseContext()
  const userSessionContext = UseAuthSessionContext()

  const [ profile, setProfile ] = useState<Profile>()
  const [ user, setUser ] = useState<User>()
  const [ isLoading, setLoading ] = useState(true)

  const getData = async () => {
    if (!supabaseContext || !userSessionContext) {
      setLoading(false)
      return
    }

    if (!userSessionContext.user) {
      return 
    }

    setUser(userSessionContext.user)

    try {
      const { data } = await supabaseContext
        .from('profiles')
        .select()
        .match({
          user_id: userSessionContext.user.id 
        })
        .single()

      if (!data) {
        setLoading(false)
        return
      }

      setProfile(data)
      setLoading(false)
    } catch (error) {
      console.log("error:", error)
    }
  }


  useEffect(() => {
    setLoading(true)
    getData()
  }, [userSessionContext.user])


  useEffect(() => {
    if (!supabaseContext) return
    const channel = supabaseContext
      .channel('profile changes')
      .on('postgres_changes', {
        event: '*',
        schema: 'public',
        table: 'profiles'
      }, () => {
        getData()
      }).subscribe()

    return () => {
      supabaseContext.removeChannel(channel)
    }
  }, [supabaseContext])


  return (
    <div className="container max-w-xl mx-auto">
      { isLoading && (
        <Skeleton />
      )}

      { !isLoading && !user && (
        <>
          <div className="px-1 py-2 mx-2 rounded">
            <Login />
          </div>
        </>
      )}

      { !isLoading && user && !profile && (
        <>
          <Welcome />
        </>
      )}

      { !isLoading && user && profile && (
        <div className="flex flex-col items-center">
          <div className="grid w-full grid-cols-5 content-stretch">
            <span className="w-full col-span-5">
              <Stats
                profile={profile}
                logoutChild={
                  <Logout redirectPath="/" className="py-2 mt-2 text-xl font-bold border border-white rounded-md"/>
                }/>
              <Miles profile={profile}/>
              <TodoList user={user} />
              <ScoreBoard />
            </span>
          </div>
          <div className="container mx-auto ">
            { children }
          </div>
        </div>
      )}
    </div>
  )
}