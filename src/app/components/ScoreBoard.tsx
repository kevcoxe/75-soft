import { GetProfiles } from "../actions/supabase"

export default async function ScoreBoard () {

  const allProfiles = await GetProfiles()

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
      <div className={`text-xl flex flex-row gap-2 border-white ${placeColors[i]}`} key={i}>
        <span className="">{ i + 1 }</span>
        <h1 className="">{ profile.username }</h1>
        <span>{ profile.score }</span>
      </div>
    )
  })

  return (
    <div className="grid grid-cols-1 mx-4">
      <div className="col-span-1">
        <span className="text-3xl">Score Board:</span>
      </div>
      { scoreBoard }
    </div>
  )
}