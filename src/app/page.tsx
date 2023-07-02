import Login from '@/app/login'
import Todo from '@/app/components/Todo'
import { GetUserSession, GetTodoList } from '@/app/actions/supabase'

export default async function ServerComponent() {

  const todos = await GetTodoList()
  const session = await GetUserSession()

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

  return (
    <div>
      <Login />

      { session && todos && (
        <div className='flex flex-col'>
          { todoList?.length !== 0 && (
            <>
              <h1 className='font-extrabold underline'>Todos: </h1>
              { todoList }
            </>
          )}

          { todoList?.length === 0 && (
            <h1>Congrats on finishing the day!</h1>
          )}

          { finishedTodoList?.length !== 0 && (
            <>
              <h1 className='font-extrabold underline'>Finished Todos: </h1>
              { finishedTodoList }
            </>
          )}
        </div>
      )}
    </div>
  )
}
