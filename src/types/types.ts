export interface ProfileType {
  username: string
  profilePic: string
  lastLogin: string
  finishedPlans: PlanType[]
  unfinishedPlans: PlanType[]
}

export interface GoalType {
  name: string
  description: string
  completed: boolean
}

export interface PlanType {
  name: string
  planDuration: number
  daysCompleted: number
  finished: boolean
  goals: GoalType[]
  lastLogin: string
}

export interface NewSessionType {
  profile: ProfileType
  lastLogin: string
}

export interface SessionType {
  name: string
  failedCount: number
  successStreak: number
  goals: GoalType[]
  planLength: number
}