import { GetProfiles } from "@/app/actions/supabase"

export default async function ScoreBoard () {

  const allProfiles = await GetProfiles({ count: 10 })

  const scoreBoard = allProfiles?.sort((profileA: Profile, profileB: Profile) => {
    if (profileA.score < profileB.score) return 1
    if (profileA.score > profileB.score) return -1
    return 0
  })?.map((profile: Profile, i: number) => {
    return (
      <>
        <span className="col-span-1">{ i + 1 }</span>
        <h1 className="col-span-3">{ profile.username }</h1>
        <span className="col-span-2">{ profile.score }</span>
        <span className="col-span-2">{ profile.days_sucessful } days</span>
        <span className="col-span-2">{ profile.miles_walked } miles</span>
      </>
    )
  })

  return (
    <div className="grid grid-cols-1 mx-4">
      <div className="col-span-1">
        <span className="text-3xl">Score Board:</span>
      </div>
      <div className="grid grid-cols-10 gap-2 text-xl">
        { scoreBoard }
      </div>
    </div>
  )
}