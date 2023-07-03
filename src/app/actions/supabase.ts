import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { PostgrestError } from "@supabase/supabase-js";
import { cookies } from "next/headers";

export const GetSupabaseClient = async () => {
  "use server"
  const supabase = createServerComponentClient<Database>({ cookies })
  return supabase
}

// profiles
export const GetProfiles = async () => {
  "use server"
  const supabase = await GetSupabaseClient()
  const { data: profiles } = await supabase.from('profiles').select()
  return profiles
}

export const GetProfile = async ({ user_id }: { user_id?: string }) => {
  "use server"
  if (!user_id) return
  const supabase = await GetSupabaseClient()
  const { data: profile } = await supabase.from('profiles').select().match({ user_id }).single()
  return profile
}

export const CreateProfile = async ({ username }: { username: string }) => {
  "use server"
  const supabase = await GetSupabaseClient()
  const session = await GetUserSession()

  if (!session) return

  await supabase.from('profiles').insert({ username, user_id: session?.user.id })
}

export const IncrementComplete = async ({ pointIncrement }: {
  pointIncrement: number,
}): Promise<{ error: PostgrestError | null }> => {
  "use server"
  const supabase = await GetSupabaseClient()
  const session = await GetUserSession()

  const profile = await GetProfile({ user_id: session?.user.id })

  if (!profile) return { error: null }

  if (!session) return { error: null }

  const { error } = await supabase
    .from('profiles')
    .update({
      score: profile.score + pointIncrement,
      user_id: session?.user.id
    })
    .eq('id', profile.id)

  return { error }
}


// todo
export const GetTodoList = async () => {
  "use server"
  const supabase = await GetSupabaseClient()
  const { data: todos } = await supabase.from('todos').select()
  return todos
}

export const CreateTodo = async ({ name, description }: { name: string, description: string}) => {
  "use server"
  const supabase = await GetSupabaseClient()
  const session = await GetUserSession()

  if (!session) return

  await supabase.from('todos').insert({ name, description, user_id: session?.user.id })
}

interface ToggleReturn {
  error: PostgrestError | null
}
export const ToggleTodoComplete = async ({ isComplete, taskId }: { isComplete: boolean, taskId: string }): Promise<ToggleReturn> => {
  "use server"
  const supabase = await GetSupabaseClient()
  const session = await GetUserSession()

  if (!session) return {
    error: null
  } as ToggleReturn

  const { error } = await supabase
    .from('todos')
    .update({ 
      is_complete: !isComplete,
      user_id: session?.user.id
    })
    .eq('id', taskId)

  return { error }
}

// session
export const SignupUser = async ({ email, password }: { email: string, password: string }) => {
  "use server"
  const supabase = await GetSupabaseClient()
  await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `http://localhost:3000/auth/callback`,
    },
  })
}

export const LoginUser = async ({ email, password}: { email: string, password: string}) => {
  "use server"
  const supabase = await GetSupabaseClient()
  await supabase.auth.signInWithPassword({
    email,
    password,
  })
}

export const LogoutUser = async () => {
  "use server"
  const supabase = await GetSupabaseClient()
  await supabase.auth.signOut()
}

export const GetUserSession = async () => {
  "use server"
  const supabase = await GetSupabaseClient()
  const {
    data: { session }
  } = await supabase.auth.getSession()

  return session
}