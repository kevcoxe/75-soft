"use server"

import { cookies } from 'next/headers'
import { CreateGoals } from "@/app/actions/goalActions"
import { CreateStreak } from '@/app/actions/streakActions'


const PROFILE_COOKIE_NAME = "profile-"


export const LoadProfile = async (sessionId: string) => {
  const profile = await cookies().get(PROFILE_COOKIE_NAME + sessionId)
  return profile?.value || false
}

export const CreateProfile = async (sessionId: string, userName: string) => {
  await cookies().set(PROFILE_COOKIE_NAME + sessionId, userName)
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