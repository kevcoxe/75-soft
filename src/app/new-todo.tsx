import { revalidatePath } from 'next/cache'
import { CreateTodo } from '@/app/actions/supabase'

export default async function NewTodo() {
  const addTodo = async (formData: FormData) => {
    'use server'

    const name = String(formData.get('name')) || null
    const description = String(formData.get('description')) || null

    if (!name || !description) return

    await CreateTodo({ name, description })
    revalidatePath('/')
  }

  return (
    <div className='my-4'>
      <h1>Create Todo</h1>
      <form action={addTodo} className='flex flex-col'>
        <label htmlFor="name">Name</label>
        <input name="name" />

        <label htmlFor="description">Description</label>
        <input name="description" />

        <button type='submit'>Add Task</button>
      </form>
    </div>
  )
}