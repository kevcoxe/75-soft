"use client"

import { UseSupabaseContext } from "@/app/contexts/SupabaseContext"
import { User } from "@supabase/supabase-js"
import { useEffect, useState } from "react"
import Todo from "@/app/components/new/Todo"
import { BiShow, BiHide } from "react-icons/bi"
import { POINT_PER_DAY } from "@/app/consts"
import { onCurrentDay } from "@/utils/dateUtils"

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
      const { data } = await supabaseContext
        .from('todos')
        .select()
        .match({
          user_id: user.id
        })

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
    setLoading(true)
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
    setIsOnCurrentDay(onCurrentDay(profile))
  }, [profile])

  return (
    <>
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
              <h1 className="text-2xl">🎉 Congrats on finishing the day 🎉</h1>
              <span>Come back tomorrow to complete your tasks.</span>
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
