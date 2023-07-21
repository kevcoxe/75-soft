"use client"

interface TabControlInterface {
  index: number
  name?: string
  icon?: React.ReactNode
  isCurrent: boolean
  handleOnClick: (i: number)=>void
}

export default function TabControl ({
  index,
  name,
  icon,
  isCurrent,
  handleOnClick
}: TabControlInterface) {

  return (
    <button onClick={() => handleOnClick(index)} className={`${isCurrent ? "active" : ""}`}>
      { icon && (
        <span className="mx-auto text-4xl">{ icon }</span>
      )}
      { name && (
        <span className="btm-nav-label">{ name }</span>
      )}
    </button>
  )

  // return (
  //   <button onClick={() => handleOnClick(index)} className={`flex content-center justify-items-center justify-center flex-col col-span-1 rounded-lg font-bold border border-black shadow-lg ${isCurrent ? "ring-2 ring-cyan-400" : ""}`}>
  //     { name && (
  //       <span>{ name }</span>
  //     )}
  //     { icon && (
  //       <span className="mx-auto text-4xl">{ icon }</span>
  //     )}
  //   </button>
  // )
}