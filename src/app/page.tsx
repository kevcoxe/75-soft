import { LoadSession, CreateSession, DeleteSession } from "@/app/actions/sessionActions"

import Session from "@/app/components/session"

export default async function Home() {
  const session = await LoadSession()

  const createSession = async () => {
    "use server"
    await CreateSession()
  }

  return (
    <main className="flex flex-col items-center justify-between min-h-screen p-24">
      <div className="container">
        { session && (
          <Session sessionId={session} />
        )}
        { !session && (
          <form action={createSession}>
            <button type="submit">Start Session</button>
          </form>
        )}
      </div>
    </main>
  )
}
