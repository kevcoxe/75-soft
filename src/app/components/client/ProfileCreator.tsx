"use client"

import { CookiesProvider, useCookies } from 'react-cookie'
import { PlanType, ProfileType } from "@/types/types"
import { DEFAULT_PLAN, TEST_COOKIE_NAME } from "@/data/data"
import GoalList from '@/app/components/client/GoalList'


export default function ProfileCreator () {
  const [cookies, setCookie, removeCookie] = useCookies([TEST_COOKIE_NAME])

  const createProfile = async (formData: FormData) => {
    const currentTime = new Date()
    const profile = {
      username: formData.get('username'),
      profilePic: '',
      lastLogin: currentTime.toISOString(),
      finishedPlans: [],
      unfinishedPlans: [ DEFAULT_PLAN ]
    } as ProfileType

    const cookieValue = JSON.stringify(profile)

    setCookie(TEST_COOKIE_NAME, cookieValue, { path: '/'})
  }

  const deleteProfile = async (formData: FormData) => {
    removeCookie(TEST_COOKIE_NAME)
  }

  const profile = cookies[TEST_COOKIE_NAME] as ProfileType

  var dateOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' };
  
  const d2 = new Date(profile?.lastLogin)
  console.log(d2, typeof(d2), d2.toLocaleDateString("en-US"))
  const formattedDate = d2.toLocaleDateString("en-US", dateOptions)


  const unfinishedPlans = profile?.unfinishedPlans.map((plan: PlanType, i: number) => {
    return (
      <div className="flex flex-col" key={i}>
        <h1>{ plan.name }</h1>
        <span>Days Completed: { plan.daysCompleted }</span>

        <h1>Goals</h1>
        <div className="flex flex-col">
          <GoalList goals={plan.goals} />
        </div>
      </div>
    )
  })

  return (
    <CookiesProvider>
      { profile && (
        <div className="flex flex-col gap-4">
          <span>hello there { profile.username}</span>
          <span>last login: { formattedDate }</span>
          <span>Number of finished plans: { profile.finishedPlans.length }</span>

          { unfinishedPlans }

          <form action={deleteProfile}>
            <button className='text-red-600' type="submit">Remove profile</button>
          </form>
        </div>
      )}

      { !profile && (
        <form action={createProfile}>
          <div className="flex flex-col gap-2">
            <label htmlFor="username">Username</label>
            <input className="text-black" type="text" name="username"></input>

            <button type="submit">Create Profile</button>
          </div>
        </form>
      )}

    </CookiesProvider>
  )
}