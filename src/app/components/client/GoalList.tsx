import { useCookies } from "react-cookie"
import { GoalType } from "@/types/types"
import { TEST_COOKIE_NAME } from "@/data/data"

interface GoalListParams {
  goals: GoalType[]
}


export default function GoalList ({ goals }: GoalListParams) {
  const [cookies, setCookie, removeCookie] = useCookies([TEST_COOKIE_NAME])

  const goalComponent = goals.map((goal: GoalType, i: number) => {
    return (
      <div key={i}>
        <div className="flex gap-2">
          <span>{ goal.finished ? '[X]' : '[ ]' }</span>
          <h1 className='underline'>{ goal.name }</h1>
        </div>
        <p className='ml-10'>{ goal.description }</p>
      </div>
    )
  })

  return (
    <>
      { goalComponent }
    </>
  )
}