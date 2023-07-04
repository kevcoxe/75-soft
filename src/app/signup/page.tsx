import { revalidatePath } from 'next/cache'

import { createServerActionClient, createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import getURL from "@/utils/getURL";
import { redirect } from 'next/navigation';

export default async function Page() {
  const supabase = createServerComponentClient<Database>({ cookies })
  const {
    data: { session }
  } = await supabase.auth.getSession()

  if (session) redirect("/")

  const handleSignUp = async (formData: FormData) => {
    'use server'
    const email = String(formData.get('email'))
    const password = String(formData.get('password'))

    const supabase = createServerActionClient<Database>({ cookies })
    await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: getURL('/auth/callback'),
      },
    })
    revalidatePath('/')
  }

  return (
    <form action={handleSignUp}>
      <div className='flex flex-col mx-4'>

        <div className='flex flex-col gap-2 my-4 text-center'>
          <h1 className='text-2xl underline'>Welcome to 75 Soft</h1>
          <p>
            75 soft is a fitness and mindset challenge. It is a softer version of 75 hard.
          </p>
        </div>

        <label htmlFor='email'>Email:</label>
        <input name='email' />

        <label htmlFor='password'>Password:</label>
        <input type='password' name='password' />

        <div className="grid grid-cols-2">
          <button className='col-span-2 px-4 py-2 mx-1 my-2 text-black bg-white rounded-md' type="submit">Sign up</button>
        </div>
      </div>
    </form>
  )
}