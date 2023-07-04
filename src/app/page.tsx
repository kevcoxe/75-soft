import { GetTodoList } from '@/app/actions/supabase'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import TodoLists from '@/app/components/TodoLists'
import NavBar from '@/app/components/NavBar'
import { redirect } from 'next/navigation'

export default async function Home() {
  const todos = await GetTodoList() as Todo[]
  const supabase = createServerComponentClient<Database>({ cookies })
  const {
    data: { session }
  } = await supabase.auth.getSession()

  if (!session) redirect("/landing")
  if (todos?.length === 0) redirect("/welcome")

  redirect('/todoList')

}
