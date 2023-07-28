"use client"

import { supabase } from "@/utils/supabase"
import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Session } from "@supabase/supabase-js"


const ScoreTitle = () => {
  return (
    <div className="grid grid-cols-10 px-2 py-4 my-2 text-lg font-bold">
      <span className="col-span-1">#</span>
      <h1 className="col-span-3">Username</h1>
      <span className="col-span-2">Score</span>
      <span className="col-span-2">Days</span>
      <span className="col-span-2">Miles</span>
    </div>
  )
}

const ScoreRow = ({
  place,
  profile
}: {
  place: number,
  profile: Profile
}) => {
  return (
    <div className="grid grid-cols-10 px-2 py-4 my-2 text-lg font-bold">
      <span className="col-span-1">{ place }</span>
      <h1 className="col-span-3">{ profile.username }</h1>
      <span className="col-span-2">{ profile.score }</span>
      <span className="col-span-2">{ profile.days_sucessful }</span>
      <span className="col-span-2">{ profile.miles_walked }</span>
    </div>
  )
}

export default function ScoreBoard({
  session,
} : {
  session: Session
}) {
  const [ collapse, setCollapse ] = useState(false)
  const [ isLoading, setLoading ] = useState(true)
  const [ profiles, setProfiles ] = useState<Profile[]>()


  const getProfiles = async () => {
    try {
      let { data, error, status } = await supabase
        .from('profiles')
        .select()
        .order('score', { ascending: false })

      if (error && status !== 406) {
        throw error
      }

      if (data) {
        setProfiles(data)
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
    getProfiles()

    const profileChannel = supabase
      .channel('daily miles profile changes')
      .on('postgres_changes', {
        event: '*',
        schema: 'public',
        table: 'profiles'
      }, () => {
        getProfiles()
      }).subscribe()

    return () => {
      supabase.removeChannel(profileChannel)
    }
  }, [session])

  const handleCollapse = () => {
    setCollapse(!collapse)
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: .3 }}
    >
      <div className="overflow-x-auto">
        <table className="table table-zebra">
          {/* head */}
          <thead>
            <tr>
              <th>#</th>
              <th>username</th>
              <th>Score</th>
              <th>Days</th>
              <th>Miles Walked</th>
            </tr>
          </thead>
          <tbody>
            { profiles && (
              <>
                { profiles.map((profile: Profile, i: number) => {
                  return (
                    <tr key={"profile" + i}>
                      <th>{ i + 1 }</th>
                      <td>{ profile.username }</td>
                      <td>{ profile.score }</td>
                      <td>{ profile.days_sucessful }</td>
                      <td>{ profile.miles_walked }</td>
                    </tr>
                  )
                })}
              </>
            )}
          </tbody>
        </table>
      </div>
    </motion.div>
  )
}