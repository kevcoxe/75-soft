import { saveSession, loadSession, destroySession } from "@/app/actions"
import { SessionType } from "@/types/types"
import { DEFAULT_GOALS } from "@/data/data"
import DailyPlan from "./components/DailyPlan"

export default async function Home() {

  const createSession = async (formData: FormData) => {
    "use server"

    const session = {
      name: formData.get('name'),
      failedCount: 0,
      successStreak: 0,
      goals: formData.get('goals') || DEFAULT_GOALS,
      planLength: 75
    } as SessionType

    saveSession(session)
  }

  const deleteSession = async (formData: FormData) => {
    "use server"

    await destroySession()
  }

  const session = await loadSession()
  const sessionExists = Object.keys(session).length !== 0

  return (
    <main className="flex flex-col items-center justify-between min-h-screen p-24">
      <div className="container">
        { sessionExists && (
          <div>
            <DailyPlan session={session} />
            <form action={deleteSession}>
              <button type="submit" className="text-red-600">delete plan</button>
            </form>
          </div>
        )}

        { !sessionExists && (
          <form action={createSession} className="flex flex-col gap-2">
            <label htmlFor="name">your name</label>
            <input className="text-black" type="text" name="name"></input>

            <button type="submit">Create plan</button>
          </form>
        )}

      </div>
    </main>
  )
}
