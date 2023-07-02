import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { PostgrestError } from "@supabase/supabase-js";
import { cookies } from "next/headers";

export const GetSupabaseClient = async () => {
  "use server"
  const supabase = createServerComponentClient<Database>({ cookies })
  return supabase
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