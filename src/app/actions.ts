'use server'

import { cookies } from "next/headers"
import { SessionType } from "@/types/types"

const COOKIE_NAME = "75SOFTTOKEN"

const saveSession = async (session: SessionType) => {
  const encodedSession = encodeSession(session)
  await cookies().set(COOKIE_NAME, encodedSession)
  
}

const loadSession = async (): Promise<SessionType> => {
  // check if cookie exists
  const cookie = await cookies().get(COOKIE_NAME)
  if (!cookie) {
    return {} as SessionType
  }

  const session = decodeSession(cookie?.value || '{}')

  return session
}

const destroySession = async (): Promise<Boolean> => {
  const cookie = await cookies().get(COOKIE_NAME)
  if (!cookie) {
    return false
  }

  await cookies().set({
    name: COOKIE_NAME,
    value: '',
    expires: new Date('2016-10-05'),
    path: '/', // For all paths
  })

  return true
}



const encodeSession = (session: SessionType) => {
  // return new Buffer(JSON.stringify(session) || '').toString('base64').replace('+', '-').replace('/', '_').replace(/=+$/, '')
  return JSON.stringify(session)
}

const decodeSession = (session: string): SessionType => {
  // let encoded = session.replace('-', '+').replace('_', '/');
  // while (encoded.length % 4) {
  //   encoded += '=';
  // }
  // const decoded = new Buffer(encoded || '', 'base64').toString('utf8')
  // return decoded
  return JSON.parse(session)
}

export {
  saveSession,
  loadSession,
  destroySession
}