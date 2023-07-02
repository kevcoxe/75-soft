
/*
import { LoadSession, LoadAllSessions, CreateSession } from "@/app/actions/sessionActions"
import Session from "@/app/components/session"
import Client from "@/app/components/client"


export default async function Home() {
  const session = await LoadSession()
  const sessions = await LoadAllSessions()

  const createSession = async () => {
    "use server"
    await CreateSession()
  }


  return (
    <main className="flex flex-col items-center justify-between min-h-screen p-24">
      <div className="container">
        <Client>
          <div className="grid w-full grid-cols-3 align-middle justify-items-center">
            { session && (
              <div className="w-full col-span-3">
                <Session sessionId={session} />
              </div>
            )}

            { !session && (
              <div className="w-full col-span-3">
                <form action={createSession}>
                  <button type="submit">Start Session</button>
                </form>
              </div>
            )}

            <div className="w-full col-span-3">
              <div className="flex flex-col">
                <h1>Sessions:</h1>
                <span>
                  { JSON.stringify(sessions) }
                </span>
              </div>
            </div>
          </div>
        </Client>
      </div>
    </main>
  )
}
*/

import Login from '@/app/login'
import NewTodo from '@/app/new-post'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { revalidatePath } from 'next/cache'
import { cookies } from 'next/headers'

export default async function ServerComponent() {

  const toggleTaskComplete = async (formData: FormData) => {
    "use server"

    const taskId = formData.get('taskId')
    const isComplete = String(formData.get('isComplete'))

    const supabase = createServerComponentClient<Database>({ cookies })
    const {
      data: { session }
    } = await supabase.auth.getSession()

    if (!session) return
    const { data, error } = await supabase
      .from('todos')
      .update({ 
        is_complete: !JSON.parse(isComplete),
        user_id: session?.user.id
      })
      .eq('id', taskId)
  
    if (error) {
      console.error(error)
    }

    revalidatePath('/')
  }

  const supabase = createServerComponentClient<Database>({ cookies })
  const { data: todos } = await supabase.from('todos').select()

  const todoList = todos?.map(({ id, task, is_complete }, i) => {
    return (
      <div key={i}>
        <form action={toggleTaskComplete}>
          <button type='submit'>
            <input type="hidden" defaultValue={ id } name="taskId" />
            <input type="hidden" defaultValue={ JSON.stringify(is_complete) } name="isComplete" />
            <span>{ is_complete ? '✅' : '' } { task }</span>
          </button>
        </form>
      </div>
      )
    })

  return (
    <>
      <Login />
      <NewTodo />
      { todos && (
        <div className='flex flex-col'>
          <h1>Todos: </h1>
          { todoList }
        </div>
      )}
    </>
  )
}
