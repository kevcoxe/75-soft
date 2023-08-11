"use client"

import { useState, useEffect } from "react"
import { Session, User } from "@supabase/supabase-js"
import Logout from "@/app/components/client/Logout"
import Stats from "@/app/components/client/Stats"
import DailyMiles from "@/app/components/client/DailyMiles"
import TodoList from "@/app/components/client/TodoList"
import ScoreBoard from "@/app/components/client/ScoreBoard"
import Welcome from "@/app/components/client/Welcome"
import Admin from "@/app/components/client/Admin"
import PasswordReset from "@/app/components/client/PasswordReset"
import TabView from "./TabView"
import { GrTask, GrUserAdmin } from "react-icons/gr"
import { TbDeviceWatchStats } from "react-icons/tb"
import { BsTrophy, BsGear } from "react-icons/bs"
import { AnimatePresence } from 'framer-motion'
import { BiWalk } from "react-icons/bi"
import { supabase } from "@/utils/supabase"
import ResetUser from "@/app/components/client/ResetUser"


export default function TabApp({
  children,
  session,
}: {
  children: React.ReactNode,
  session: Session,
}) {

  const [ profile, setProfile ] = useState<Profile>()
  const [ isLoading, setLoading ] = useState(true)
  const [ settingModalOpen, setSettingModalOpen ] = useState(false)
  const [ adminModalOpen, setAdminModalOpen ] = useState(false)

  const getProfile = async () => {
    try {
      if (!session?.user) throw new Error("No user on the session!")

      let { data, error, status } = await supabase
        .from('profiles')
        .select()
        .match({
          user_id: session.user.id
        })
        .single()

      if (error && status !== 406) {
        throw error
      }

      if (data) {
        setProfile(data)
      }
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message)
      }
    } finally {
      setLoading(false)
    }
  }

  const getData = async () => {
    if (!session) return
    await getProfile()
  }


  useEffect(() => {
    setLoading(true)
    getData()
  }, [session])


  useEffect(() => {
    if (!session) return

    const channel = supabase
      .channel('profile changes')
      .on('postgres_changes', {
        event: '*',
        schema: 'public',
        table: 'profiles'
      }, () => {
        getData()
      }).subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [supabase])



  let settings = {
    items: [
      { 
        node: (!isLoading && session && profile && (
          <>
            <TodoList key={"todolist"} session={session} />
          </>
        )),
        icon: <GrTask />,
        name: "Tasks"
      },
      {
        node: <>
          { profile && (
            <DailyMiles key={"dailymiles"} session={session} />
          )}
        </>,
        icon: <BiWalk />,
        name: "Miles"
      },
      {
        node: (!isLoading && session && profile &&
          <>
            <Stats
              key={"stats"}
              session={session}
            />
          </>
        ),
        icon: <TbDeviceWatchStats />,
        name: "Stats"
      },
      {
        node: (
          <ScoreBoard key={"scoreboard"} session={session} />
        ),
        icon: <BsTrophy />,
        name: "Rank"
      }
    ]
  }


  const logoutFunc = async () => {
    if (!session) return

    const { error } = await supabase.auth.signOut()
    if (error) {
      console.log("failed to logout:", error)
      return
    }

    window.location.reload()
  }


  return (
    <AnimatePresence>
      { !isLoading && session && !profile && (
        <>
          <Welcome session={session}/>
        </>
      )}

      { !isLoading && session && profile && (
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
                    <PasswordReset session={session}/>
                    <div className="divider"></div>
                    <ResetUser session={session} callback={()=>setSettingModalOpen(false)} />
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
                      <Admin session={session} />
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