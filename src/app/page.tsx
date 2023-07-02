import Login from '@/app/login'
import Todo from '@/app/components/Todo'
import { CreateTodo, GetTodoList } from '@/app/actions/supabase'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import NewTodo from './new-todo'
import { revalidatePath } from 'next/cache'

export default async function ServerComponent() {
  const todos = await GetTodoList()
  const supabase = createServerComponentClient<Database>({ cookies })
  const {
    data: { session }
  } = await supabase.auth.getSession()

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

  const createProfile = async (formData: FormData) => {
    "use server"

    await Promise.all([
      CreateTodo({ name: "Follow Diet", description: "Pick a diet plan and follow it." }),
      CreateTodo({ name: "Drink water", description: "Goal is to drink at least 96oz of water." }),
      CreateTodo({ name: "Workout", description: "Do a 45 minute workout, can be split up thought the day. Also try to walk 1 mile a day." }),
      CreateTodo({ name: "Read a book", description: "Read at least 10 pages of a non fiction book." }),
      CreateTodo({ name: "Take progress picture", description: "Take a progress picture to keep track of your progress." }),
    ])

    revalidatePath('/')
  }

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

          { todos?.length !== 0 && todoList?.length === 0 && (
            <h1>Congrats on finishing the day!</h1>
          )}

          { todos?.length === 0 && (
            <div className='flex'>
              <span>Lets create a profile</span>
              <form action={createProfile}>
                <button type='submit'>Create Profile</button>
              </form>
            </div>
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
