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
      name: string
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
  const [ tabControlClass, setNumTabs ] = useState<string>()

  useEffect(() => {
    setNumTabs(`grid h-16 grid-cols-${ items.length }`)
  }, [items])


  const tabControls = items.map((item, i) => {
    let isCurrent = currentTab === i
    return (
      <TabControl
        key={i}
        index={i}
        name={item.name}
        isCurrent={isCurrent}
        handleOnClick={setCurrentTab}
      />
    )
  })



  return (
    <div className="relative h-full">
      <div className={`flex ${top ? "flex-col" : "flex-col-reverse"} h-full `}>
        <div className={`items-center content-center w-full h-16 pb-4 ${ top ? "mb-5 mt-2" : "mt-5 mb-2" }`}>
          <div className={tabControlClass}>
            { tabControls }
          </div>
        </div>

        <div className={`flex ${childrenOnTop ? "flex-col" : "flex-col-reverse"} flex-grow overflow-y-auto`}>
          { children }
          { items[currentTab].node }
        </div>
      </div>
    </div>
  )
}