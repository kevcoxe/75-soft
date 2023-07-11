import { ONE_DAY_IN_MILLISECONDS } from "@/app/consts";

export const onCurrentDay = (profile: Profile) => {
  if (!profile) return { compare: false, dayDiff: 0 }
  if (!profile.created_at) return { compare: false, dayDiff: 0 }

  const current = new Date()
  const start = new Date(profile.created_at)
  const diffDays = Math.ceil(Math.abs((current.getTime() - start.getTime()) / ONE_DAY_IN_MILLISECONDS));
  
  return {
    compare: profile.days_sucessful < diffDays,
    dayDiff: diffDays - profile.days_sucessful
  }
}

