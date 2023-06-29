"use server"

import { cookies } from 'next/headers'
import { GoalType } from "@/types/types"
import { IncrementStreak } from "@/app/actions/streakActions"
import { DEFAULT_GOALS } from "@/data/data"


const GOAL_COOKIE_NAME = "goals-"


export const LoadGoals = async (sessionId: string) => {
  const goals = await cookies().get(GOAL_COOKIE_NAME + sessionId)

  if (goals === undefined) return false

  return JSON.parse(goals.value)
}

export const CreateGoals = async (sessionId: string) => {
  const goals = DEFAULT_GOALS
  await SetGoals(sessionId, goals)
}

export const SetGoals = async (sessionId: string, goals: GoalType[]) => {
  await cookies().set(GOAL_COOKIE_NAME + sessionId, JSON.stringify(goals))
}

export const DeleteGoals = async (sessionId: string) => {
  const goals = await LoadGoals(sessionId)

  if (!goals) return

  await cookies().set({
    name: GOAL_COOKIE_NAME + sessionId,
    value: '',
    expires: new Date('2016-10-05'),
    path: '/', // For all paths
  })
}


export const CompleteGoalWithIndex = async (sessionId: string, goalIndex: number|null) => {
  if (!goalIndex) return

  const goals = await LoadGoals(sessionId)
  if (!goals) return

  if (goalIndex >= goals.length) return

  goals[goalIndex].completed = !goals[goalIndex].completed


  await SetGoals(sessionId, goals)
}

export const CompleteAllGoals = async (sessionId: string) => {
  await IncrementStreak(sessionId)
  await CreateGoals(sessionId)
}