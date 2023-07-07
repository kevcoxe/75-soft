"use client"

import { UseSupabaseContext } from "@/app/contexts/SupabaseContext"
import { useEffect, useState } from "react"
import { BiShow, BiHide } from "react-icons/bi"

const ScoreRow = ({
  place,
  profile
}: {
  place: number,
  profile: Profile
}) => {
  return (
    <div className="grid grid-cols-10 px-2 py-4 my-2">
      <span className="col-span-1">{ place }</span>
      <h1 className="col-span-3">{ profile.username }</h1>
      <span className="col-span-2">{ profile.score }</span>
      <span className="col-span-2">{ profile.days_sucessful } days</span>
      <span className="col-span-2">{ profile.miles_walked } miles</span>
    </div>
  )
}

export default function ScoreBoard() {
  const supabaseContext = UseSupabaseContext()
  const [ collapse, setCollapse ] = useState(false)
  const [ isLoading, setLoading ] = useState(true)
  const [ profiles, setProfiles ] = useState<Profile[]>()

  const handleCollapse = () => {
    setCollapse(!collapse)
  }


  const getData = async () => {
    if (!supabaseContext) {
      setLoading(false)
      return
    }

    try {
      const { data } = await supabaseContext
        .from('profiles')
        .select()
        .order('score', { ascending: false })

      if (!data) {
        setLoading(false)
        return
      }

      setProfiles(data)

      setLoading(false)
    } catch (error) {
      console.log("error:", error)
    }
  }


  useEffect(() => {
    setLoading(true)
    getData()
  }, [])


  useEffect(() => {
    if (!supabaseContext) return
    const channel = supabaseContext
      .channel('scoreboard changes')
      .on('postgres_changes', {
        event: '*',
        schema: 'public',
        table: 'profiles'
      }, () => {
        getData()
      }).subscribe()

    return () => {
      supabaseContext.removeChannel(channel)
    }
  }, [supabaseContext])

  return (
    <>
      <div className="flex flex-col p-4 m-2 border rounded-lg border-slate-800">
        <div className="grid items-center grid-cols-6">
          <div className="flex flex-col col-span-6">
            <div className="grid grid-cols-6">
              <div className="col-span-5 px-2 py-4 my-2 text-xl text-center">Score Board</div>
              <button className="col-span-1 mx-auto text-4xl" onClick={handleCollapse}>{ collapse ? <BiShow /> : <BiHide /> }</button>
            </div>
            <div className={`${collapse ? "hidden" : ""}`}>
              { profiles && (
                <>
                { profiles.map((profile: Profile, i: number) => {
                  return <ScoreRow key={i} place={i + 1} profile={profile}/>
                })}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}