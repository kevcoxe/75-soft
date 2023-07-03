import { revalidatePath } from "next/cache"
import { ToggleTodoComplete } from "../actions/supabase"

export default async function Todo ({ todo: { id, is_complete, name, description } }: { todo: Todo}) {
  const toggleTaskComplete = async (formData: FormData) => {
    "use server"

    const taskId = String(formData.get('taskId'))
    const isComplete = JSON.parse(String(formData.get('isComplete')))

    const { error } = await ToggleTodoComplete({ isComplete, taskId })
    if (error) {
      console.error(error)
    }

    revalidatePath('/')
  }

  return (
    <form className="" action={toggleTaskComplete}>
      <button className='flex w-full m-4 border border-white rounded-lg' type='submit'>
        <input type="hidden" defaultValue={ id } name="taskId" />
        <input type="hidden" defaultValue={ JSON.stringify(is_complete) } name="isComplete" />
        <div className="flex">
          <span className='mx-2'>{ is_complete ? '✅' : '' }</span>
          <div className="flex flex-col items-start">
            <span className='font-bold'>{ name }</span>
            <span className='font-light'>{ description }</span>
          </div>
        </div>
      </button>
    </form>
  )
}