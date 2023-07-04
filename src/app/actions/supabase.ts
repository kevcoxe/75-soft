import getURL from "@/utils/getURL";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { PostgrestError } from "@supabase/supabase-js";
import { cookies } from "next/headers";

export const GetSupabaseClient = async () => {
  "use server"
  const supabase = createServerComponentClient<Database>({ cookies })
  return supabase
}

// profiles
export const GetProfiles = async ({ count = 0 }: { count: number }) => {
  "use server"
  const supabase = await GetSupabaseClient()
  
  let profiles = [] as any[] | null
  if (count <= 0) {
    const{ data } = await supabase
      .from('profiles')
      .select()
      .order('score', { ascending: true })
    profiles = data
  } else {
    const{ data } = await supabase
      .from('profiles')
      .select()
      .order('score', { ascending: false })
      .limit(count)
    profiles = data
  }
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

export const IncrementDaySuccess = async (): Promise<{ error: PostgrestError | null }> => {
  "use server"
  const supabase = await GetSupabaseClient()
  const session = await GetUserSession()
  const profile = await GetProfile({ user_id: session?.user.id })

  if (!profile || !session) return { error: null }

  const { error } = await supabase
    .from('profiles')
    .update({
      days_sucessful: profile.days_sucessful + 1,
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

export const ResetTodoComplete = async () => {
  "use server"
  const supabase = await GetSupabaseClient()
  const session = await GetUserSession()
  const todos = await GetTodoList()

  if (!todos || !session) return {
    error: null
  } as ToggleReturn

  await Promise.all(todos.map(async (todo: Todo) => {
    return supabase
      .from('todos')
      .update({ 
        is_complete: false,
        user_id: session?.user.id
      })
      .eq('id', todo.id)
  }))
}

// session
export const SignupUser = async ({ email, password }: { email: string, password: string }) => {
  "use server"
  const supabase = await GetSupabaseClient()
  await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: getURL('/auth/callback'),
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