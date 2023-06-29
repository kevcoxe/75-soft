import { cookies } from "next/headers"
import { NewSessionType, ProfileType } from "@/types/types"

const PROFILE_COOKIE_NAME = "75softprofile"
const SESSION_COOKIE_NAME = "75softsession"

/*
 * Profile functions
 */
export const saveProfile = async (profile: ProfileType) => {
  await cookies().set(PROFILE_COOKIE_NAME, JSON.stringify(profile))
}

export const loadProfile = async () => {
  // check if cookie exists
  const cookie = await cookies().get(PROFILE_COOKIE_NAME)
  if (!cookie) {
    return {} as ProfileType
  }

  return JSON.parse(cookie?.value || '{}')
}

export const destroyProfile = async (): Promise<Boolean> => {
  const cookie = await cookies().get(PROFILE_COOKIE_NAME)
  if (!cookie) {
    return false
  }

  await cookies().set({
    name: PROFILE_COOKIE_NAME,
    value: '',
    expires: new Date('2016-10-05'),
    path: '/', // For all paths
  })

  return true
}

/*
 * Session functions
 */
export const saveSession = async (session: NewSessionType) => {
  await cookies().set(SESSION_COOKIE_NAME, JSON.stringify(session))
  
}

export const loadSession = async (): Promise<NewSessionType> => {
  // check if cookie exists
  const cookie = await cookies().get(SESSION_COOKIE_NAME)
  if (!cookie) {
    return {} as NewSessionType
  }

  return JSON.parse(cookie?.value || '{}')
}

export const destroySession = async (): Promise<Boolean> => {
  const cookie = await cookies().get(SESSION_COOKIE_NAME)
  if (!cookie) {
    return false
  }

  await cookies().set({
    name: SESSION_COOKIE_NAME,
    value: '',
    expires: new Date('2016-10-05'),
    path: '/', // For all paths
  })

  return true
}