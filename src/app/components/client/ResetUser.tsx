import { Session } from "@supabase/supabase-js";
import { supabase } from "@/utils/supabase"
import { getTodayDate } from "@/utils/dateUtils"
import { useEffect, useState } from "react";

export default function ResetUser ({
  session,
  callback
}: {
  session: Session,
  callback: ()=>void
}) {

  const [ isLoading, setLoading ] = useState(true)
  const [ profile, setProfile ] = useState<Profile>()

  const getProfile = async () => {
    try {
      if (!session?.user) throw new Error("No user on the session!")

      let { data, error, status } = await supabase
        .from('profiles')
        .select()
        .match({
          user_id: session.user.id
        })
        .single()

      if (error && status !== 406) {
        throw error
      }

      if (data) {
        setProfile(data)
      }
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message)
      }
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    setLoading(true)
    getProfile()

    const profileChannel = supabase
      .channel('profile rest profile changes')
      .on('postgres_changes', {
        event: '*',
        schema: 'public',
        table: 'profiles'
      }, () => {
        getProfile()
      }).subscribe()

    return () => {
      supabase.removeChannel(profileChannel)
    }
  }, [session])

  const handleReset = async () => {
    if (!session) return

    setLoading(true)
    const newStart = getTodayDate()

    const { error } = await supabase
      .rpc('resetPlan', {
        userid: session.user.id,
        newstart: newStart
      })

    setLoading(false)
    callback()
  }

  return (
    <button className="py-4 text-3xl rounded-lg btn-block btn btn-error btn-lg" disabled={isLoading} onClick={handleReset}>
      { isLoading && (
        <span className="loading loading-spinner"></span>
      )}
      Reset Plan
    </button>
  )
}