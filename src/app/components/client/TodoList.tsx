"use client"

import { Session } from "@supabase/supabase-js"
import { useEffect, useState } from "react"
import { supabase } from "@/utils/supabase"
import Todo from "@/app/components/client/Todo"
import { POINT_PER_DAY } from "@/app/consts"
import { onCurrentDay, getCurrentDateStr } from "@/utils/dateUtils"
import { motion } from "framer-motion"

export default function TodoList({
  session,
}: {
  session: Session,
}) {

  const [ todos, setTodos ] = useState<Todo[]>()
  const [ todosComplete, setTodosComplete ] = useState(false)
  const [ isLoading, setLoading ] = useState(true)
  const [ isOnCurrentDay, setIsOnCurrentDay ] = useState(false)
  const [ daysDiff, setDaysDiff ] = useState(0)
  const [ profile, setProfile ] = useState<Profile>()
  const [ tasksDate, setTasksDate ] = useState<string>()
  
  const handleCompleteDay = async () => {
    if (!session) return

    const { error } = await supabase
      .rpc('incrementDay', {
        userid: session.user.id,
        score_increment: POINT_PER_DAY
      })

    return { error }
  }

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

        const { compare, dayDiff } = onCurrentDay(data)
        setIsOnCurrentDay(compare)
        setDaysDiff(dayDiff)
        let { workingDate } = getCurrentDateStr(data, {
          workingDate: true
        })
        setTasksDate(workingDate)
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
    try {
      let { data, error, status } = await supabase
        .from('todos')
        .select()
        .match({
          user_id: session.user.id
        })
        .order('is_complete', { ascending: true })

      if (error && status !== 406) {
        throw error
      }

      if (data) {
        const todosDone = data.filter(({ is_complete }) => !is_complete).length === 0
        setTodos(data)
        setTodosComplete(todosDone)
      }
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message)
      }
    } finally {
      setLoading(false)
    }
  }


  useEffect(() => {
    setLoading(true)

    getProfile()
    getData()

    const todoChannel = supabase
      .channel('todo list todos changes')
      .on('postgres_changes', {
        event: '*',
        schema: 'public',
        table: 'todos'
      }, () => {
        getData()
      }).subscribe()

    const profileChannel = supabase
      .channel('todo list profile changes')
      .on('postgres_changes', {
        event: '*',
        schema: 'public',
        table: 'profiles'
      }, () => {
        getProfile()
      }).subscribe()

    return () => {
      supabase.removeChannel(todoChannel)
      supabase.removeChannel(profileChannel)
    }
  }, [session])

  return (
    <>
      {/* <WindowFocusHandler onFocus={getData} /> */}
      <div className="flex flex-col overflow-x-hidden">
        { tasksDate && (
          <h2 className="text-lg text-center">Tasks for { tasksDate }</h2>
        )}

        { (todosComplete && isOnCurrentDay) && (
          <div className="flex flex-col col-span-6 px-2 mx-2 my-4 animate-pulse">
            <button className="col-span-6 py-4 text-3xl text-white bg-black rounded-lg" onClick={handleCompleteDay}>
              🎉 Complete Day 🎉
            </button>
          </div>
        )}

        { !isLoading && !isOnCurrentDay && (
          <div className="mx-2 my-2 card bg-base-100">
            <div className="text-center card-body">
              <h2 className="mx-auto card-title">🎉 Congrats 🎉</h2>
              <p>You finished the day! Come back tomorrow to complete your tasks.</p>
            </div>
          </div>
        )}

        { (profile && !todosComplete && daysDiff > 1) && (
          <div className="mx-2 my-2 card bg-warning text-warning-content">
            <div className="text-center card-body">
              <h2 className="mx-auto text-lg card-title">🤨 Behind on tasks? 🤨</h2>
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
                  key={"todo" + i}
                  initial={{ opacity: 0, x: "-100%" }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: .2 + (.1 * i) }}
                >
                  <Todo todo={todo} disabled={!isOnCurrentDay}/>
                </motion.div>
              )
            })}
          </>
        )}
      </div>
    </>
  )
}
