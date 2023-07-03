import Login from '@/app/login'
import { GetTodoList } from '@/app/actions/supabase'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import Welcome from '@/app/welcome'
import TodoLists from '@/app/components/TodoLists'

export default async function ServerComponent() {
  const todos = await GetTodoList()
  const supabase = createServerComponentClient<Database>({ cookies })
  const {
    data: { session }
  } = await supabase.auth.getSession()

  return (
    <div className='container mx-auto'>
      <Login />

      { session && todos && (
        <div className='flex flex-col'>
          { todos?.length === 0 && (
            <Welcome />
          )}

          <TodoLists todos={todos} />
        </div>
      )}
    </div>
  )
}
