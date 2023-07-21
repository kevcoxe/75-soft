"use client"

import { useState, useEffect } from "react"
import { UseSupabaseContext } from "@/app/contexts/SupabaseContext"
import { UseAuthSessionContext } from "@/app/contexts/AuthSessionContext"
import { User } from "@supabase/supabase-js"
import Login from "@/app/components/client/Login"
import Logout from "@/app/components/client/Logout"
import Skeleton from "@/app/components/client/Skeleton"
import Stats from "@/app/components/client/Stats"
import DailyMiles from "@/app/components/client/DailyMiles"
import TodoList from "@/app/components/client/TodoList"
import ScoreBoard from "@/app/components/client/ScoreBoard"
import Welcome from "@/app/components/client/Welcome"
import Admin from "@/app/components/client/Admin"
import PasswordReset from "@/app/components/client/PasswordReset"
import WindowFocusHandler from "@/app/components/client/WindowFocusHandler"
import TabView from "./TabView"
import { GrTask, GrUserAdmin } from "react-icons/gr"
import { TbDeviceWatchStats } from "react-icons/tb"
import { BsTrophy, BsGear, BsCalendarCheck } from "react-icons/bs"
import { AnimatePresence } from 'framer-motion'
import { BiWalk } from "react-icons/bi"


export default function TabApp({
  children
}: {
  children: React.ReactNode 
}) {
  const supabaseContext = UseSupabaseContext()
  const userSessionContext = UseAuthSessionContext()

  const [ profile, setProfile ] = useState<Profile>()
  const [ user, setUser ] = useState<User>()
  const [ isLoading, setLoading ] = useState(true)

  const getProfileData = async () => {
    if (!supabaseContext || !userSessionContext) {
      setLoading(false)
      return
    }

    if (!userSessionContext.user) {
      return 
    }

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

  const getData = async () => {
    if (!supabaseContext || !userSessionContext) {
      setLoading(false)
      return
    }

    if (!userSessionContext.user) {
      return 
    }

    setUser(userSessionContext.user)

    await getProfileData()
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



  let settings = {
    items: [
      { 
        node: (!isLoading && user && profile && (
          <>
            <DailyMiles profile={profile}/>
            <TodoList key={"todo list"} user={user} profile={profile}/>
          </>
        )),
        icon: <GrTask />,
        name: "Tasks"
      },
      {
        node: (!isLoading && user && profile &&
          <Stats
            key={"stats"}
            profile={profile}
            startCollapsed={false}
          />
        ),
        icon: <TbDeviceWatchStats />,
        name: "Stats"
      },
      {
        node: (
          <ScoreBoard key={"scoreboard"}/>
        ),
        icon: <BsTrophy />,
        name: "Rank"
      },
      {
        node: (!isLoading && user && profile && (
          <div className="px-1">
            <Logout redirectPath="/" className="py-2 mt-2 text-xl font-bold border-4 border-red-500 rounded-md"/>
            <PasswordReset />
          </div>
        )),
        icon: <BsGear />,
        name: "Settings"
      }
    ]
  }

  if (profile && profile.is_admin) {
    settings.items.push({
      node: (
        <Admin key={"admin"} />
      ),
      icon: <GrUserAdmin />,
      name: "Admin"
    })
  }


  return (
    <AnimatePresence>
      <WindowFocusHandler onFocus={getProfileData} />
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
        <TabView settings={settings}>
          { profile && (
            <div className="navbar bg-base-100">
              <div className="flex-1">
                <a className="text-xl normal-case btn btn-ghost">{ profile.username }</a>
              </div>
              <div className="flex-none gap-5 pr-4">
                <div className="indicator">
                  <BiWalk className="text-4xl" />
                  <span className="badge badge-sm indicator-item badge-info">{ profile.miles_walked }</span>
                </div>
                <div className="indicator">
                  <BsCalendarCheck className="text-4xl" />
                  <span className="badge badge-sm indicator-item badge-info">{ profile.days_sucessful }</span>
                </div>
              </div>
            </div>
          )}
        </TabView>
      )}
    </AnimatePresence>
  )
}