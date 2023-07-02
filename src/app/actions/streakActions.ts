import { cookies } from 'next/headers'
import { kv } from '@vercel/kv';

import { CreateGoals } from "@/app/actions/goalActions"


const STREAK_COOKIE_NAME = "streak-"
const DEFAULT_STREAK = 0


export const LoadStreak = async (sessionId: string) => {
  const streak = await cookies().get(STREAK_COOKIE_NAME + sessionId)

  if (streak === undefined) return false

  return Number(streak.value)
}

export const CreateStreak = async (sessionId: string) => {
  await SetStreak(sessionId, DEFAULT_STREAK)
  await CreateGoals(sessionId)
}

export const SetStreak = async (sessionId: string, streak: number) => {
  try {
    await kv.hset(sessionId, {
      successStreak: streak
    });

  } catch (error) {
    console.log('failed to create session in kv', error)
  }
  await cookies().set(STREAK_COOKIE_NAME + sessionId, JSON.stringify(streak))
}

export const DeleteStreak = async (sessionId: string) => {
  const streak = await LoadStreak(sessionId)

  if (streak === false) return

  await cookies().set({
    name: STREAK_COOKIE_NAME + sessionId,
    value: '',
    expires: new Date('2016-10-05'),
    path: '/', // For all paths
  })
}

export const IncrementStreak = async (sessionId: string) => {
  let streak = await LoadStreak(sessionId)
  if (streak === false) return

  streak += 1

  await SetStreak(sessionId, streak)
}

export const ResetStreak = async (sessionId: string) => {
  try {
    let failedCount = await kv.hget(sessionId, 'failedCount') as number
    await kv.hset(sessionId, {
      failedCount: failedCount + 1
    });

  } catch (error) {
    console.log('failed to create session in kv', error)
  }
  await SetStreak(sessionId, 0)
}