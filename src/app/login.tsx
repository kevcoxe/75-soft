import { revalidatePath } from 'next/cache'

import { GetUserSession, LoginUser, LogoutUser, SignupUser } from '@/app/actions/supabase'

export default async function Login() {
  const session = await GetUserSession()

  const handleSignUp = async (formData: FormData) => {
    'use server'
    const email = String(formData.get('email'))
    const password = String(formData.get('password'))

    await SignupUser({ email, password })
    revalidatePath('/')
  }

  const handleSignIn = async (formData: FormData) => {
    'use server'
    const email = String(formData.get('email'))
    const password = String(formData.get('password'))

    await LoginUser({ email, password})
    revalidatePath('/')
  }

  const handleSignOut = async () => {
    'use server'
    await LogoutUser()
    revalidatePath('/')
  }

  return (
    <form action={handleSignIn}>
      { session && (
        <div className='flex gap-4 my-4'>
          <h1>Hello { session.user.email }</h1>
          <button formAction={handleSignOut}>Sign out</button>
        </div>
      )}

      { !session && (
        <div className='flex flex-col'>
          <label htmlFor="email">Email:</label>
          <input name="email" />

          <label htmlFor="password">Password:</label>
          <input type="password" name="password" />

          {/* <button formAction={handleSignUp}>Sign up</button> */}
          <button type="submit">Sign in</button>
        </div>
      )}
    </form>
  )
}