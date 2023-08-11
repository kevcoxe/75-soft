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

  const [ isLoading, setLoading ] = useState(false)
  const [ confirmed, setConfirmed ] = useState(false)

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
    setConfirmed(false)
    callback()
  }

  return (
    <>
      { confirmed && (
        
        <div className="flex join-vertical join">
          <button className="py-4 text-xl rounded-lg join-item btn btn-error btn-lg" disabled={isLoading} onClick={handleReset}>
            { isLoading && (
              <span className="loading loading-spinner"></span>
            )}
            Confirm Reset Plan
          </button>

          <button className="py-4 text-xl rounded-lg btn-outline btn-lg join-item" disabled={isLoading} onClick={()=>setConfirmed(false)}>
            Cancel
          </button>
        </div>
      )}

      { !confirmed && (
        <button className="py-4 text-2xl rounded-lg btn-block btn btn-error btn-lg" disabled={isLoading} onClick={()=>setConfirmed(true)}>
          Reset Plan
        </button>
      )}
    </>
  )
}