import { ONE_DAY_IN_MILLISECONDS } from "@/app/consts";

export const onCurrentDay = (profile: Profile) => {
  if (!profile) return false
  if (!profile.created_at) return false

  const current = new Date()
  const start = new Date(profile.created_at)
  const diffDays = Math.ceil(Math.abs((current.getTime() - start.getTime()) / ONE_DAY_IN_MILLISECONDS));
  
  return profile.days_sucessful < diffDays
}