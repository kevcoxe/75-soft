import { cookies } from 'next/headers'
import { v4 } from 'uuid'
import { kv } from '@vercel/kv';

import { DeleteProfile } from '@/app/actions/profileActions'
import { DeleteGoals } from '@/app/actions/goalActions'
import { DeleteStreak } from '@/app/actions/streakActions'
import { SessionType } from '@/types/types';


const SESSION_COOKIE_NAME = "session"


export const LoadAllSessions = async () => {
  try {
    const sessions = await kv.smembers(SESSION_COOKIE_NAME)
    return sessions
  } catch (error) {
    console.log('failed to return sessions: ', error)
    return []
  }
}

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
  const sessionId = v4()

  try {
    await kv.hset(sessionId, {
      sessionId: sessionId,
      username: '',
      failedCount: 0,
      successStreak: 0
    });

    await kv.sadd(SESSION_COOKIE_NAME, sessionId)
  } catch (error) {
    console.log('failed to create session in kv', error)
  }

  await cookies().set(SESSION_COOKIE_NAME, sessionId)
}

export const DeleteSession = async () => {
  const session = await LoadSession()

  if (!session) return

  await DeleteProfile(session)
  await DeleteGoals(session)
  await DeleteStreak(session)

  try {
    await kv.hdel(session, 'sessionId')
  } catch (error) {
    console.log(error)
  }

  await cookies().set({
    name: SESSION_COOKIE_NAME,
    value: '',
    expires: new Date('2016-10-05'),
    path: '/', // For all paths
  })
}