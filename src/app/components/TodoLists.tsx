import { revalidatePath } from "next/cache"
import Todo from "@/app/components/Todo"
import { CompleteDay } from "@/app/actions/supabase"

export default async function TodoLists({ todos }: { todos: Todo[]}) {

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

    await CompleteDay()

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
        <div className="grid grid-cols-1 gap-2 mx-4 my-2">
          <h1 className="text-2xl ">Congrats on finishing the day!</h1>
          <form action={completeDay}>
            <button className="w-full px-4 py-2 bg-blue-900 rounded-md" type="submit">Complete Day</button>
          </form>
        </div>
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