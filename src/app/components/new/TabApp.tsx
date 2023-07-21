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
  const [ settingModalOpen, setSettingModalOpen ] = useState(false)
  const [ adminModalOpen, setAdminModalOpen ] = useState(false)

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
            <TodoList key={"todolist"} user={user} profile={profile}/>
          </>
        )),
        icon: <GrTask />,
        name: "Tasks"
      },
      {
        node: <>
          { profile && (
            <DailyMiles key={"dailymiles"} profile={profile}/>
          )}
        </>,
        icon: <BiWalk />,
        name: "Miles"
      },
      {
        node: (!isLoading && user && profile &&
          <>
            <Stats
              key={"stats"}
              profile={profile}
              startCollapsed={false}
            />
          </>
        ),
        icon: <TbDeviceWatchStats/>,
        name: "Stats"
      },
      {
        node: (
          <ScoreBoard key={"scoreboard"}/>
        ),
        icon: <BsTrophy />,
        name: "Rank"
      }
    ]
  }


  const logoutFunc = async () => {
    if (!supabaseContext || !userSessionContext) return

    const { error } = await supabaseContext.auth.signOut()
    if (error) {
      console.log("failed to logout:", error)
      return
    }

    window.location.reload()
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
            <>
              <div className="navbar bg-base-100">
                <div className="items-center flex-1">
                  <a className="text-xl normal-case btn btn-ghost">
                    { profile.username }
                  </a>
                  <div className="badge badge-lg badge-primary">{ profile.score }p</div>
                </div>
                <div className="flex-none gap-5 pr-4">
                  {/* <button onClick={()=>setModelOpen(!modalOpen)}>
                    <div className="indicator">
                      <BiWalk className="text-4xl" />
                      <span className="badge badge-sm indicator-item badge-info">{ profile.miles_walked }</span>
                    </div>
                  </button> */}
                  <button onClick={()=>setSettingModalOpen(true)} className="text-xl btn btn-square btn-ghost">
                    <BsGear />
                  </button>

                  { profile && profile.is_admin && (
                    <button onClick={()=>setAdminModalOpen(true)} className="text-xl btn btn-square btn-ghost">
                      <GrUserAdmin />
                    </button>
                  )}
                </div>
              </div>

              <dialog id="setting_modal" className={`modal ${settingModalOpen ? "modal-open" : ""}`}>
                <form method="dialog" className="modal-box">
                  <button onClick={()=>setSettingModalOpen(false)} className="absolute btn btn-sm btn-circle btn-ghost right-2 top-2">✕</button>
                  <div className="px-1 pt-4">
                    <PasswordReset />
                    <div className="divider"></div>
                    <Logout redirectPath="/" logoutFunc={logoutFunc} />
                  </div>
                </form>
              </dialog>

              { profile && profile.is_admin && (
                <dialog id="admin_modal" className={`modal ${adminModalOpen ? "modal-open" : ""}`}>
                  <form method="dialog" className="modal-box">
                    <button onClick={()=>setAdminModalOpen(false)} className="absolute btn btn-sm btn-circle btn-ghost right-2 top-2">✕</button>
                    <div className="px-1 pt-4">
                      <Admin />
                    </div>
                  </form>
                </dialog>
              )}
            </>
          )}
        </TabView>
      )}
    </AnimatePresence>
  )
}