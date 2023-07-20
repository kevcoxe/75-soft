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
  const [ tabControlClass, setTabControlClass ] = useState<string>()

  const getGridCol = (i: number) => {
    return `grid-cols-${ i }`
  }

  useEffect(() => {
    let gCol = getGridCol(items.length)
    console.log(gCol)
    setTabControlClass(`grid gap-1 px-1 h-16 ${ gCol }`)
  }, [items])


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