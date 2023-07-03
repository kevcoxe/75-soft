import { GetProfiles } from "../actions/supabase"

export default async function ScoreBoard () {

  const allProfiles = await GetProfiles({ count: 5 })

  const placeColors = [
    'text-green-700',
    'text-blue-700',
    'text-purple-700'
  ]

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
      </>
    )
  })

  return (
    <div className="grid grid-cols-1 mx-4">
      <div className="col-span-1">
        <span className="text-3xl">Score Board:</span>
      </div>
      <div className="grid grid-cols-8 gap-2 text-xl">
        { scoreBoard }
      </div>
    </div>
  )
}