import { GoalType, PlanType } from "@/types/types"

export const DEFAULT_GOALS = [
  {
    name: "diet",
    description: "Eat better, do not eat any extra sweets, no treats, no extra drinks. Once a weekend I can have a treat.",
    finished: false
  } as GoalType,
  {
    name: "water",
    description: "Drink 96oz of water.",
    finished: false
  } as GoalType,
  {
    name: "exercise",
    description: "Do 45 mins of exercise a day.",
    finished: false
  } as GoalType,
  {
    name: "reading",
    description: "Read 10 pages of a book.",
    finished: false
  } as GoalType,
  {
    name: "picture",
    description: "Take a progress picture.",
    finished: false
  } as GoalType
]

export const DEFAULT_PLAN = {
  name: "75 Soft",
  planDuration: 75,
  daysCompleted: 0,
  finished: false,
  goals: DEFAULT_GOALS,
  lastLogin: Date.now().toString()
} as PlanType

export const TEST_COOKIE_NAME = "test"
