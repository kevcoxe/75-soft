import { revalidatePath } from "next/cache"
import { CreateTodo, CreateProfile } from "./actions/supabase"

export default async function Welcome() {

  const start75Soft = async (formData: FormData) => {
    "use server"

    const username = String(formData.get('username')) || null

    if (!username) return

    await Promise.all([
      CreateProfile({ username }),
      CreateTodo({ name: "Follow Diet", description: "Pick a diet plan and follow it." }),
      CreateTodo({ name: "Drink water", description: "Goal is to drink at least 96oz of water." }),
      CreateTodo({ name: "Workout", description: "Do a 45 minute workout, can be split up thought the day. Also try to walk 1 mile a day." }),
      CreateTodo({ name: "Read a book", description: "Read at least 10 pages of a non fiction book." }),
      CreateTodo({ name: "Take progress picture", description: "Take a progress picture to keep track of your progress." }),
    ])

    revalidatePath('/')
  }

  return (
    <>
      <form action={start75Soft}>
        <div className='flex flex-col gap-2 mx-4'>

          <div className="flex flex-col">
            <label htmlFor="username">Pick a Username: </label>
            <input type="text" name="username" placeholder="username" />
          </div>

          <button className='px-2 py-1 text-black transition bg-white rounded-lg hover:ring hover:ring-offset-4 hover:ring-offset-white' type='submit'>Start 75 Soft</button>
        </div>
      </form>
    </>
  )
}