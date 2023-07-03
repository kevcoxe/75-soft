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
    <form className="grid grid-cols-5" action={toggleTaskComplete}>
      <button className={`${ is_complete ? 'bg-green-800 border-green-800' : 'border-white' } col-span-5 my-4 border rounded-lg`} type='submit'>
        <input type="hidden" defaultValue={ id } name="taskId" />
        <input type="hidden" defaultValue={ JSON.stringify(is_complete) } name="isComplete" />
        <div className="flex">
          <div className="flex flex-col items-start mx-2">
            <span className='font-bold'>{ name }</span>
            <span className='font-light'>{ description }</span>
          </div>
        </div>
      </button>
    </form>
  )
}