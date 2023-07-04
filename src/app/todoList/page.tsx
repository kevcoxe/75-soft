import { revalidatePath } from "next/cache"
import Todo from "@/app/components/Todo"
import { GetTodoList, IncrementDaySuccess, ResetTodoComplete } from "@/app/actions/supabase"

export default async function Page() {

  const todos = await GetTodoList()

  const finishedTodoList = todos?.filter(({ is_complete }) => is_complete).map((todo: Todo, i) => {
    return (
      <Todo key={i} todo={todo} />
    )
  })

  const todoList = todos?.filter(({ is_complete }) => !is_complete).map((todo: Todo, i) => {
    return (
      <Todo key={i} todo={todo} />
    )
  })

  const completeDay = async () => {
    "use server"

    await ResetTodoComplete()
    await IncrementDaySuccess()

    revalidatePath("/")
  }

  return (
    <>
      { todoList?.length !== 0 && (
        <div className='mx-4'>
          <h1 className='font-extrabold underline'>Todos: </h1>
          { todoList }
        </div>
      )}

      { todos?.length !== 0 && todoList?.length === 0 && (
        <>
          <h1>Congrats on finishing the day!</h1>
          <form action={completeDay}>
            <button type="submit">Complete Day</button>
          </form>
        </>
      )}

      { finishedTodoList?.length !== 0 && (
        <div className='mx-4'>
          <h1 className='font-extrabold underline'>Finished Todos: </h1>
          { finishedTodoList }
        </div>
      )}
    </>
  )
}