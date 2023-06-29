import { GoalType, PlanType, SessionType } from "@/types/types"
import { saveSession } from "../actions"


interface DailyPlanParams {
  session: SessionType
}

export default async function DailyPlan ({ session }: DailyPlanParams) {
  const { name, failedCount, goals, successStreak } = session

  const goalsComplete = goals.filter((goal: GoalType) => {
    return !goal.finished
  }).length === 0

  const toggleGoal = async (formData: FormData) => {
    "use server"

    const goalIndex = Number(formData.get('goalIndex'))
    const goalFinished = Number(formData.get('goalFinished'))
    const finished = goalFinished === 0 ? true : false

    let newGoals = [...goals]
    newGoals[goalIndex] = {...goals[goalIndex], finished: finished }

    let newStreak = session.successStreak
    // check if goals have been completed after
    // checking a box if so update streak
    if (newGoals.filter((goal: GoalType) => !goal.finished).length === 0) {
      newStreak += 1
    }

    const newSession = {...session, goals: newGoals, successStreak: newStreak}

    await saveSession(newSession)
  }

  const planList = goals.map(({ name, description, finished }: GoalType, i: number) => {
    return (
      <div key={i} className="flex flex-col">
        <div className="flex gap-2">
          <form action={toggleGoal}>
            <input className="hidden" name="goalIndex" defaultValue={i}></input>
            <input className="hidden" name="goalFinished" defaultValue={finished ? 1 : 0}></input>
            <button type="submit">{ finished ? "[X]" : "[ ]"}</button>
          </form>
          <span className="font-bold underline">{ name }</span>
        </div>
        <p className="hidden">{ description }</p>
      </div>
    )
  })

  return (
    <div className="flex flex-col">
      <div className="flex gap-6">
        <span>Welcome back { name }</span>
        <span>Streak is: { successStreak } </span>
        <span>Fail Count: { failedCount }</span>
      </div>
      <p>Go ahead and check off what goals you have done for today.</p>
      { planList }
      { goalsComplete && (
        <span className="text-green-600">Success you completed your goals for today! come back tomorrow.</span>
      )}
    </div>
  )
}