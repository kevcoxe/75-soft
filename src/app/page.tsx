
/*
import { LoadSession, LoadAllSessions, CreateSession } from "@/app/actions/sessionActions"
import Session from "@/app/components/session"
import Client from "@/app/components/client"


export default async function Home() {
  const session = await LoadSession()
  const sessions = await LoadAllSessions()

  const createSession = async () => {
    "use server"
    await CreateSession()
  }


  return (
    <main className="flex flex-col items-center justify-between min-h-screen p-24">
      <div className="container">
        <Client>
          <div className="grid w-full grid-cols-3 align-middle justify-items-center">
            { session && (
              <div className="w-full col-span-3">
                <Session sessionId={session} />
              </div>
            )}

            { !session && (
              <div className="w-full col-span-3">
                <form action={createSession}>
                  <button type="submit">Start Session</button>
                </form>
              </div>
            )}

            <div className="w-full col-span-3">
              <div className="flex flex-col">
                <h1>Sessions:</h1>
                <span>
                  { JSON.stringify(sessions) }
                </span>
              </div>
            </div>
          </div>
        </Client>
      </div>
    </main>
  )
}
*/

export default async function Home () {
  return (
    <div>
      hello
    </div>
  )
}
