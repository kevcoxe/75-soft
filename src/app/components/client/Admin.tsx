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
