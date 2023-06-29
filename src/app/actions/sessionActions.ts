"use server"

import { cookies } from 'next/headers'
import { v4 } from 'uuid'

import { DeleteProfile } from './profileActions'
import { DeleteGoals } from './goalActions'
import { DeleteStreak } from './streakActions'


const SESSION_COOKIE_NAME = "session"


export const LoadSession = async () => {
  const session = await cookies().get(SESSION_COOKIE_NAME)
  return session?.value || false
}

export const LoadOrCreateSession = async () => {
  let session = await LoadSession()
  if (session) {
    return session
  }

  await CreateSession()

  return await LoadSession()
}

export const CreateSession = async () => {
  await cookies().set(SESSION_COOKIE_NAME, v4())
}

export const DeleteSession = async () => {
  const session = await LoadSession()

  if (!session) return

  await DeleteProfile(session)
  await DeleteGoals(session)
  await DeleteStreak(session)

  await cookies().set({
    name: SESSION_COOKIE_NAME,
    value: '',
    expires: new Date('2016-10-05'),
    path: '/', // For all paths
  })
}