"use client"

import SupabaseProviderWrapper from "@/app/components/client/SupabaseProviderWrapper"
import TabApp from "@/app/components/new/TabApp"

export default function TestPage () {


  return (
    <SupabaseProviderWrapper>
      <div className="container h-screen mx-auto max-w-xlg">
        <TabApp>
        </TabApp>
      </div>
    </SupabaseProviderWrapper>
  )
}