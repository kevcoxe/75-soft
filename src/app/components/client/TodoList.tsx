"use client"

import { UseSupabaseContext } from "@/app/contexts/SupabaseContext"
import { User } from "@supabase/supabase-js"
import { useEffect, useState } from "react"
import Todo from "@/app/components/client/Todo"
import { BiShow, BiHide } from "react-icons/bi"
import { POINT_PER_DAY } from "@/app/consts"
import { onCurrentDay } from "@/utils/dateUtils"
import WindowFocusHandler from "@/app/components/client/WindowFocusHandler"

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
      <WindowFocusHandler onFocus={getData} />
      <div className="flex flex-col p-4 m-2 border rounded-lg border-slate-800">
        <div className={`grid items-center grid-cols-6 ${isLoading ? "animate-pulse" : ""}`}>
          { todosComplete && isOnCurrentDay && (
            <div className="flex flex-col col-span-6 my-4 animate-pulse">
              <button className="col-span-6 py-4 text-3xl text-white bg-black rounded-lg" onClick={handleCompleteDay}>
                🎉 Complete Day 🎉
              </button>
            </div>
          )}

          { !isOnCurrentDay && (
            <div className="flex flex-col col-span-6 my-4 text-center">
              <h1 className="text-xl">🎉 Congrats on finishing the day 🎉</h1>
              <span>Come back tomorrow to complete your tasks.</span>
            </div>
          )}

          { !todosComplete && daysDiff > 1 && (
            <div className="flex flex-col col-span-6 my-4 text-center">
              <h1 className="text-2xl">🤨 Are you behind in your tasks 🤨</h1>
              <span className="text-start indent-4">
                You have completed { profile.days_sucessful } days and are { daysDiff } days behind schedule.
                If you have just not checked off your tasks, go ahead and catch up you are doing great!
                {/* If you have failed, go ahead and reset your 75 days. Keep it up you can do it next time!
                <button className="inline-flex ml-4 text-red-700">Reset your 75 days?</button> */}
              </span>

            </div>
          )}

          <div className="flex flex-col col-span-6">
            <div className="grid grid-cols-6">
              <button className="grid items-center grid-cols-6 col-span-6 text-3xl" onClick={handleCollapse}>
                <span className="col-span-5 text-2xl font-bold">Daily Todos</span>
                <span className="col-span-1">{ collapse ? <BiShow /> : <BiHide /> }</span>
              </button>
            </div>
            <div className={`${collapse ? "hidden" : ""}`}>
              { todos && (
                <>
                  { todos.map((todo: Todo, i: number) => {
                    return (
                      <Todo key={i} todo={todo} disabled={!isOnCurrentDay}/>
                    )
                  })}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
