import { ONE_DAY_IN_MILLISECONDS } from "@/app/consts";

export const onCurrentDay = (profile: Profile) => {
  if (!profile) return { compare: false, dayDiff: 0 }
  if (!profile.start_date) return { compare: false, dayDiff: 0 }

  const current = new Date()
  const start = new Date(profile.start_date)
  const diffDays = Math.ceil(Math.abs((current.getTime() - start.getTime()) / ONE_DAY_IN_MILLISECONDS));

  return {
    compare: profile.days_sucessful < diffDays,
    dayDiff: diffDays - profile.days_sucessful
  }
}

interface DateFormatParamCheck {
  currentDate?: boolean
  startDate?: boolean
  endDate?: boolean
  workingDate?: boolean
}

const defaultDateFormatParam = {
  currentDate: false,
  startDate: false,
  endDate: false,
  workingDate: false,
}

export const getCurrentDateStr = (profile: Profile, dateFormatParam?: DateFormatParamCheck) => {
  if (!profile) return { compare: false, dayDiff: 0 }
  if (!profile.start_date) return { compare: false, dayDiff: 0 }

  const current = new Date()
  const start = new Date(profile.start_date)
  const end = new Date(start.getTime() + (75 * ONE_DAY_IN_MILLISECONDS))
  // const diffDays = Math.ceil(Math.abs((current.getTime() - start.getTime()) / ONE_DAY_IN_MILLISECONDS));
  const diffDate = new Date(start.getTime() + (profile.days_sucessful * ONE_DAY_IN_MILLISECONDS))

  const getDate = (d: Date, long: boolean) => {
    if (long) return d.toLocaleDateString('en-us', { year:"numeric", month:"long", weekday:"long", day: "numeric" })
    return d.toLocaleDateString('en-us', { year:"numeric", month:"numeric", day:"numeric" })
  }

  const formatParams = {...defaultDateFormatParam, ...dateFormatParam}

  return {
    currentDate: getDate(current, formatParams.currentDate) || "",
    startDate: getDate(start, formatParams.startDate) || "",
    endDate: getDate(end, formatParams.endDate) || "",
    workingDate: getDate(diffDate, formatParams.workingDate) || "",
  }

}