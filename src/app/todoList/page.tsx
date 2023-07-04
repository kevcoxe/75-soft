import { GetProfile, GetTodoList } from '@/app/actions/supabase'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import TodoLists from '@/app/components/TodoLists'
import NavBar from '@/app/components/NavBar'
import { redirect } from 'next/navigation'
import UserStats from '@/app/components/UserStats'

export default async function Page() {
  const todos = await GetTodoList() as Todo[]
  const supabase = createServerComponentClient<Database>({ cookies })
  const {
    data: { session }
  } = await supabase.auth.getSession()

  if (!session) redirect("/landing")
  if (todos && todos?.length === 0) redirect("/welcome")

  const profile = await GetProfile({ user_id: session.user.id }) as Profile

  return (
    <div className='container h-screen mx-auto'>
      <div className='flex flex-col'>
        <NavBar />

        <UserStats profile={profile} />

        <TodoLists todos={todos} />
      </div>
    </div>
  )
}
