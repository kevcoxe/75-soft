import { createServerActionClient } from '@supabase/auth-helpers-nextjs'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { revalidatePath } from 'next/cache'
import { cookies } from 'next/headers'

export default async function Login() {
  const supabase = createServerComponentClient<Database>({ cookies })
  const {
    data: { session }
  } = await supabase.auth.getSession()

  const handleSignUp = async (formData: FormData) => {
    'use server'
    const email = String(formData.get('email'))
    const password = String(formData.get('password'))

    const supabase = createServerActionClient<Database>({ cookies })
    await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: 'http://localhost:3000/auth/callback',
      },
    })

    revalidatePath('/')
  }

  const handleSignIn = async (formData: FormData) => {
    'use server'
    const email = String(formData.get('email'))
    const password = String(formData.get('password'))

    const supabase = createServerActionClient<Database>({ cookies })
    await supabase.auth.signInWithPassword({
      email,
      password,
    })

    revalidatePath('/')
  }

  const handleSignOut = async () => {
    'use server'
    const supabase = createServerActionClient<Database>({ cookies })
    await supabase.auth.signOut()
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