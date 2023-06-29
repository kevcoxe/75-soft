
import ProfileForm from "@/app/components/profileForm"
import { DeleteSession } from "@/app/actions/sessionActions"
import { LoadProfile } from "@/app/actions/profileActions"
import GoalList from "./goalList"

interface SessionParams {
  sessionId: string
}

export default async function Session({ sessionId }: SessionParams) {

  const profile = await LoadProfile(sessionId)

  const deleteSession = async () => {
    "use server"
    await DeleteSession()
  }

  return (
    <div className="flex flex-col gap-2">
      { profile && (
        <div className="flex flex-col">
          <span>username: { JSON.stringify(profile) }</span>
          <GoalList sessionId={sessionId} />
        </div>
      )}
      { !profile && (
        <ProfileForm sessionId={sessionId} />
      )}
      <form action={deleteSession}>
        <button className="text-red-500" type="submit">Delete Session</button>
      </form>
    </div>
  )
}