"use client"

import { UseSupabaseContext } from "@/app/contexts/SupabaseContext"
import { useEffect, useState } from "react"
import { BiShow, BiHide } from "react-icons/bi"
import { motion } from "framer-motion"

export default function Admin() {
  const supabaseContext = UseSupabaseContext()

  const [ todos, setTodos ] = useState<Todo[]>()
  const [ profiles, setProfiles ] = useState<Profile[]>()

  const [ isLoading, setLoading ] = useState(true)
  const [ collapse, setCollapse ] = useState(false)

  const handleCollapse = () => {
    setCollapse(!collapse)
  }

  const getProfiles = async () => {
    if (!supabaseContext) {
      setLoading(false)
      return
    }

    try {
      const { data } = await supabaseContext
        .from('profiles')
        .select()
        .order('score', { ascending: false })

      if (!data) {
        setLoading(false)
        return
      }

      setProfiles(data)
      setLoading(false)
    } catch (error) {
      console.log("error:", error)
    }
  }

  const getTodos = async () => {
    if (!supabaseContext) {
      setLoading(false)
      return
    }

    try {
      const { data } = await supabaseContext
        .from('todos')
        .select()
        .order('is_complete', { ascending: false })

      if (!data) {
        setLoading(false)
        return
      }

      setTodos(data)
      setLoading(false)
    } catch (error) {
      console.log("error:", error)
    }
  }


  useEffect(() => {
    setLoading(true)
    getProfiles()
    getTodos()
  }, [])

  useEffect(() => {
    if (!supabaseContext) return
    const channel = supabaseContext
      .channel('admin profile changes')
      .on('postgres_changes', {
        event: '*',
        schema: 'public',
        table: 'profiles'
      }, () => {
        getProfiles()
      }).subscribe()

    return () => {
      supabaseContext.removeChannel(channel)
    }
  }, [supabaseContext])

  useEffect(() => {
    if (!supabaseContext) return
    const channel = supabaseContext
      .channel('admin todos changes')
      .on('postgres_changes', {
        event: '*',
        schema: 'public',
        table: 'todos'
      }, () => {
        getTodos()
      }).subscribe()

    return () => {
      supabaseContext.removeChannel(channel)
    }
  }, [supabaseContext])


  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: .3 }}
    >
      <div className="flex flex-col p-4 m-2 border rounded-lg border-slate-800">
        <div className={`grid items-center grid-cols-6 ${isLoading ? "animate-pulse" : ""}`}>
          <div className="flex flex-col col-span-6">
            <div className="grid grid-cols-6">
              <button className="grid items-center grid-cols-6 col-span-6 text-3xl" onClick={handleCollapse}>
                <span className="col-span-5 text-2xl font-bold">Admin page</span>
                <span className="col-span-1">{ collapse ? <BiShow /> : <BiHide /> }</span>
              </button>
            </div>
            <div className={`${collapse ? "hidden" : ""}`}>
              { profiles?.map((profile: Profile, i: number) => {
                const userTodos = todos?.filter((todo: Todo) => todo.user_id === profile.user_id)
                return (
                  <div className="flex flex-col" key={i}>
                    <div className="flex justify-between">
                      <span>{ profile.username }</span>
                      <span>{ profile.score }</span>
                      <span>{ profile.days_sucessful }</span>
                      <span>{ profile.miles_walked }</span>
                    </div>
                    { userTodos?.map((todo: Todo, j: number) => {
                      return (
                        <div className="flex flex-col ml-4" key={j}>
                          {/* <span className={`${todo.is_complete ? "text-green-700" : "text-red-700"}`}>{ todo.name }</span> */}
                          <span>{ todo.is_complete ? "✅" : "❌" } { todo.name }</span>
                        </div>
                      )
                    })}
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
