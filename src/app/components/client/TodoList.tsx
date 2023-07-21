"use client"

import { UseSupabaseContext } from "@/app/contexts/SupabaseContext"
import { User } from "@supabase/supabase-js"
import { useEffect, useState } from "react"
import Todo from "@/app/components/client/Todo"
import { BiShow, BiHide } from "react-icons/bi"
import { POINT_PER_DAY } from "@/app/consts"
import { onCurrentDay } from "@/utils/dateUtils"
import WindowFocusHandler from "@/app/components/client/WindowFocusHandler"
import { motion } from "framer-motion"

export default function TodoList({
  user,
  profile,
}: {
  user: User,
  profile: Profile
}) {
  const supabaseContext = UseSupabaseContext()

  const [ todos, setTodos ] = useState<Todo[]>()
  const [ todosComplete, setTodosComplete ] = useState(false)
  const [ isLoading, setLoading ] = useState(true)
  const [ collapse, setCollapse ] = useState(false)
  const [ isOnCurrentDay, setIsOnCurrentDay ] = useState(false)
  const [ daysDiff, setDaysDiff ] = useState(0)

  const handleCollapse = () => {
    setCollapse(!collapse)
  }
  
  const handleCompleteDay = async () => {
    if (!supabaseContext) return

    const { error } = await supabaseContext
      .rpc('incrementDay', {
        userid: user.id,
        score_increment: POINT_PER_DAY
      })

    return { error }
  }

  const getData = async () => {
    if (!supabaseContext) {
      setLoading(false)
      return
    }

    try {
      setLoading(true)
      const { data } = await supabaseContext
        .from('todos')
        .select()
        .match({
          user_id: user.id
        })
        .order('is_complete', { ascending: true })

      if (!data) {
        setLoading(false)
        return
      }

      setTodos(data)

      const todosDone = data.filter(({ is_complete }) => !is_complete).length === 0
      setTodosComplete(todosDone)

      setLoading(false)
    } catch (error) {
      console.log("error:", error)
    }
  }


  useEffect(() => {
    getData()
  }, [user])


  useEffect(() => {
    if (!supabaseContext) return
    const channel = supabaseContext
      .channel('todos changes')
      .on('postgres_changes', {
        event: '*',
        schema: 'public',
        table: 'todos'
      }, () => {
        getData()
      }).subscribe()

    return () => {
      supabaseContext.removeChannel(channel)
    }
  }, [supabaseContext])


  useEffect(() => {
    const { compare, dayDiff } = onCurrentDay(profile)
    setIsOnCurrentDay(compare)
    setDaysDiff(dayDiff)
  }, [profile])
  return (
    <>
      {/* <WindowFocusHandler onFocus={getData} /> */}
      <div className="flex flex-col">
        { (todosComplete && isOnCurrentDay) && (
          <div className="flex flex-col col-span-6 px-2 mx-2 my-4 animate-pulse">
            <button className="col-span-6 py-4 text-3xl text-white bg-black rounded-lg" onClick={handleCompleteDay}>
              🎉 Complete Day 🎉
            </button>
          </div>
        )}

        { !isOnCurrentDay && (
          <div className="mx-2 my-2 card bg-base-100">
            <div className="card-body">
              <h2 className="card-title">🎉 Congrats on finishing the day 🎉</h2>
              <p>Come back tomorrow to complete your tasks.</p>
            </div>
          </div>
        )}

        { (!todosComplete && daysDiff > 1) && (
          <div className="mx-2 my-2 card bg-warning text-warning-content">
            <div className="card-body">
              <h2 className="card-title">🤨 Are you behind in your tasks 🤨</h2>
              <p>You have completed { profile.days_sucessful } days and are { daysDiff } days behind schedule.
              If you have just not checked off your tasks, go ahead and catch up you are doing great!</p>
            </div>
          </div>
        )}

        { todos && (
          <>
            { todos.map((todo: Todo, i: number) => {
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: "-100%" }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: .2 + (.1 * i) }}
                >
                  <Todo key={i} todo={todo} disabled={!isOnCurrentDay}/>
                </motion.div>
              )
            })}
          </>
        )}
      </div>
    </>
  )
}
