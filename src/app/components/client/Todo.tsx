"use client"

import { POINT_PER_TASK } from "@/app/consts"
import { UseSupabaseContext } from "@/app/contexts/SupabaseContext"
import { useEffect, useState } from "react"
import { motion } from "framer-motion"

export default function Todo ({
  todo,
  disabled = false,
}: {
  todo: Todo,
  disabled: boolean
}) {
  const supabaseContext = UseSupabaseContext()
  const [ collapse, setCollapse ] = useState(false)
  const [ isLoading, setIsLoading ] = useState(false)
  const [ isDisabled, setIsDisabled ] = useState(disabled)

  useEffect(() => {
    setIsDisabled(disabled)
  }, [disabled])

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
    <motion.div
      animate={isLoading ? "loading" : "loaded"}
      variants={{
        loaded: { opacity: 1, x: 0 },
        loading: { opacity: 0, x: "100%" },
      }}
    >
      <button className="w-full overflow-x-hidden text-start" onClick={isDisabled ? ()=>{} : handleTodo}>
        <div className="mx-2 my-2 shadow-xl card bg-base-100">
          <div className="card-body">
            <div className="flex items-center gap-4">
              { isLoading && (
                <span className="loading text-primary loading-ring loading-lg"></span>
              )}
              { !isLoading && (
                <input type="checkbox" disabled={isDisabled} defaultChecked={todo.is_complete === true ? true : false} className="col-span-1 px-2 checkbox checkbox-info checkbox-lg" />
              )}

              <div className="flex flex-col">
                <h1 className="text-xl font-bold">{ todo.name }</h1>
                <p className="text-sm">{ todo.description }</p>
              </div>
            </div>
          </div>
        </div>
      </button>
    </motion.div>
  )
}