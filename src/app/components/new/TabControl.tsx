"use client"

interface TabControlInterface {
  index: number
  name: string
  isCurrent: boolean
  handleOnClick: (i: number)=>void
}

export default function TabControl ({
  index,
  name,
  isCurrent,
  handleOnClick
}: TabControlInterface) {


  return (
    <button onClick={() => handleOnClick(index)} className={`flex content-center justify-items-center justify-center flex-col col-span-1 rounded-lg mx-1 text-lg font-extrabold border border-black shadow-lg ${isCurrent ? "ring-4 ring-offset-1 ring-cyan-400" : ""}`}>
      <span>{ name }</span>
    </button>
  )
}