"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { supabase } from "@/utils/supabase"
import { Session } from "@supabase/supabase-js"

export default function Admin({
  session,
} : {
  session: Session
}) {

  const [ todos, setTodos ] = useState<Todo[]>()
  const [ profiles, setProfiles ] = useState<Profile[]>()

  const [ isLoading, setLoading ] = useState(true)

  const getProfiles = async () => {
    try {
      let { data, error, status } = await supabase
        .from('profiles')
        .select()
        .order('score', { ascending: false })

      if (error && status !== 406) {
        throw error
      }

      if (data) {
        setProfiles(data)
      }
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message)
      }
    } finally {
      setLoading(false)
    }
  }

  const getTodos = async () => {
    try {
      const { data } = await supabase
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
    const channel = supabase
      .channel('admin profile changes')
      .on('postgres_changes', {
        event: '*',
        schema: 'public',
        table: 'profiles'
      }, () => {
        getProfiles()
      }).subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [session])

  useEffect(() => {
    const channel = supabase
      .channel('admin todos changes')
      .on('postgres_changes', {
        event: '*',
        schema: 'public',
        table: 'todos'
      }, () => {
        getTodos()
      }).subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [session])


  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: .3 }}
    >
      <table className="table table-zebra">
        {/* head */}
        <thead>
          <tr>
            <th>username</th>
            <th>Tasks</th>
          </tr>
        </thead>
        <tbody>
          { profiles && (
            <>
              { profiles.map((profile: Profile, i: number) => {
                const userTodos = todos?.filter((todo: Todo) => todo.user_id === profile.user_id)
                return (
                  <>
                    <tr key={"profile" + i}>
                      <td>{ profile.username }</td>
                      <td>
                        <ul>
                          { userTodos?.map((todo: Todo, j: number) => {
                            return (
                              <li key={"todo" + i + j}>{ todo.is_complete ? "✅" : "❌" } { todo.name }</li>
                            )
                          })}
                        </ul>
                      </td>
                    </tr>
                  </>
                )
              })}
            </>
          )}
        </tbody>
      </table>
    </motion.div>
  )
}
