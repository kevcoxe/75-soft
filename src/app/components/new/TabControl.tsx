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
}