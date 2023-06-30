import { cookies } from 'next/headers'
import { kv } from '@vercel/kv';

import { CreateGoals } from "@/app/actions/goalActions"
import { CreateStreak } from '@/app/actions/streakActions'


const PROFILE_COOKIE_NAME = "profile-"


export const LoadProfile = async (sessionId: string) => {
  const profile = await cookies().get(PROFILE_COOKIE_NAME + sessionId)

  const session = await kv.hgetall(sessionId)
  console.log(session)

  return profile?.value || false
}

export const CreateProfile = async (sessionId: string, userName: string) => {
  await cookies().set(PROFILE_COOKIE_NAME + sessionId, userName)

  try {
    await kv.hset(sessionId, {
      username: userName,
      failedCount: 0,
      successStreak: 0
    });
  } catch (error) {
    console.log('failed to create session in kv', error)
  }

  await CreateGoals(sessionId)
  await CreateStreak(sessionId)
}

export const DeleteProfile = async (sessionId: string) => {
  const profile = await LoadProfile(sessionId)

  if (!profile) return

  await cookies().set({
    name: PROFILE_COOKIE_NAME + sessionId,
    value: '',
    expires: new Date('2016-10-05'),
    path: '/', // For all paths
  })
}