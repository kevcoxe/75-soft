"use client"

import { POINT_PER_TASK } from "@/app/consts"
import { UseSupabaseContext } from "@/app/contexts/SupabaseContext"
import { useState } from "react"
import { BsSquare, BsCheckSquare } from "react-icons/bs"

export default function Todo ({
  todo
}: {
  todo: Todo
}) {
  const supabaseContext = UseSupabaseContext()
  const [ collapse, setCollapse ] = useState(false)
  const [ isLoading, setIsLoading ] = useState(false)

  const handleTodo = async () => {
    if (!supabaseContext) return
    setIsLoading(true)
    const newCompleteState = !todo.is_complete
    const { error: todoError } = await supabaseContext
      .from('todos')
      .update({ 
        is_complete: newCompleteState,
        user_id: todo.user_id
      })
      .eq('id', todo.id)

      const score_increment = newCompleteState ? POINT_PER_TASK : POINT_PER_TASK * -1
      const { error: scoreError } = await supabaseContext
        .rpc('incrementScore', {
          userid: todo.user_id,
          score_increment
        })

    setIsLoading(false)
    return { todoError, scoreError }
  }

  return (
    <div className="grid items-center w-full grid-cols-5">
      <button onClick={handleTodo} className={`col-span-1 border-spacing-2 px-2 py-4 border-slate-800 rounded-xl mx-2 text-5xl`}>
        { isLoading && (
          <svg className="mr-3 -ml-1 text-black animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
        )}
        { !isLoading && (
          <>
            { todo.is_complete ? <BsCheckSquare /> : <BsSquare /> }
          </>
        )}
      </button>
      <div className="flex flex-col col-span-4 px-2 py-4 my-2 justify-items-center rounded-xl">
        <span className="text-2xl">{ todo.name }</span>
        <div className={`${collapse ? "hidden" : ""}`}>
          { todo.description }
        </div>
      </div>
    </div>
  )
}