
import { CompleteAllGoals, LoadGoals, CompleteGoalWithIndex } from "@/app/actions/goalActions"
import { LoadStreak, IncrementStreak, ResetStreak } from "@/app/actions/streakActions"
import { GoalType } from "@/types/types"

interface GoalListParams {
  sessionId: string
}

export default async function GoalList ({ sessionId }: GoalListParams) {

  const goals = await LoadGoals(sessionId)
  const streak = await LoadStreak(sessionId)

  const completedGoals = goals.filter((goal: GoalType) => {
    return goal.completed
  })

  const allGoalsCompleted = completedGoals.length === goals.length

  const completeGoal = async (formData: FormData) => {
    "use server"
    const goalIndex = formData.get('goalIndex') as number | null
    await CompleteGoalWithIndex(sessionId, goalIndex)
  }

  const completeAllGoals = async () => {
    "use server"
    await CompleteAllGoals(sessionId)
  }

  const resetStreak = async () => {
    "use server"
    await ResetStreak(sessionId)
  }

  const goalList = goals.map((goal: GoalType, i: number) => {
    return (
      <div key={i} className="flex flex-col">
        <form action={completeGoal}>
          <button type="submit">
            <input className="hidden" type="hidden" name="goalIndex" defaultValue={i}></input>
            <span>{ goal.completed ? "[X]" : "[ ]" } { goal.name }</span>
          </button>
            <p className="ml-4">{ goal.description }</p>
        </form>
      </div>
    )
  })


  return (
    <>
    { allGoalsCompleted && (
      <form action={completeAllGoals}>
        <button type="submit" className="text-green-500">
          all goals completed, start next day
        </button>
      </form>
    )}

    <div>
      <span>Your streak: { streak }</span>
    </div>

    
    { goalList }

    <form action={resetStreak}>
      <button className="mt-20 text-red-500" type="submit">Reset streak</button>
    </form>
    
    </>
  )
}