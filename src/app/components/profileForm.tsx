import { CreateProfile } from "@/app/actions/profileActions"

interface ProfileFormParams {
  sessionId: string
}

export default function ProfileForm ({ sessionId }: ProfileFormParams) {

  const createProfile = async (formData: FormData) => {
    "use server"
    const userName = await formData.get('userName')
    await CreateProfile(sessionId, userName as string)
  }

  return (
    <form action={createProfile} className="flex flex-col">
      <div className="flex-row">
        <label htmlFor="userName">UserName: </label>
        <input className="text-black" type="text" name="userName"/>
      </div>

      <button type="submit">Create Profile</button>
    </form>
  )
}