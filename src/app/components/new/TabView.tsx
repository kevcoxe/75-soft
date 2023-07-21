"use client"

import { useEffect, useState } from "react"
import TabControl from "./TabControl"

interface TabViewInterface {
  children: React.ReactNode
  settings: {
    top?: boolean,
    childrenOnTop?: boolean,
    items: {
      node: React.ReactNode
      name?: string
      icon?: React.ReactNode
    }[]
  }
}

export default function TabView ({
  children,
  settings: {
    top = false,
    childrenOnTop = true,
    items
  }
}: TabViewInterface) {

  const [ currentTab, setCurrentTab ] = useState(0)


  const tabControls = items.map((item, i) => {
    let isCurrent = currentTab === i
    return (
      <TabControl
        key={i}
        index={i}
        name={item?.name}
        icon={item?.icon}
        isCurrent={isCurrent}
        handleOnClick={setCurrentTab}
      />
    )
  })


  return (
    <div className="h-full">
      <div className={`flex ${top ? "flex-col" : "flex-col-reverse"} h-full `}>
        <div className={`items-center content-center w-full pb-4 ${ top ? "mb-5 mt-2" : "mt-5 mb-2" }`}>
          {/* <div className={`grid gap-1 px-1 h-16 ${items.length === 5 ? "grid-cols-5" : "grid-cols-4" }`}> */}
          <div className="z-50 btm-nav btm-nav-lg">
            { tabControls }
          </div>
        </div>

        <div className={`flex ${childrenOnTop ? "flex-col" : "flex-col-reverse"} flex-grow overflow-hidden mb-10`}>
          { children }
          <div className="overflow-y-auto">
            { items[currentTab].node }
          </div>
        </div>
      </div>
    </div>
  )
}