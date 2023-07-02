import { cookies } from 'next/headers'
import { createServerActionClient } from '@supabase/auth-helpers-nextjs'
import { revalidatePath } from 'next/cache'

export default async function NewTodo() {
  const addTodo = async (formData: FormData) => {
    'use server'

    const task = String(formData.get('task')) || null
    const supabase = createServerActionClient<Database>({ cookies })
    const {
      data: { session }
    } = await supabase.auth.getSession()

    if (!session) return

    await supabase.from('todos').insert({ task, user_id: session?.user.id })
    revalidatePath('/')
  }

  return (
    <>
      <h1>Create Todo</h1>
      <form action={addTodo}>
        <label htmlFor="task">Task name</label>
        <input name="task" />
      </form>
    </>
  )
}