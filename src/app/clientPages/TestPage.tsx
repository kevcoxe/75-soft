"use client"

import SupabaseProviderWrapper from "@/app/components/client/SupabaseProviderWrapper"
import App from "@/app/components/new/App"

export default function TestPage () {
  return (
    <SupabaseProviderWrapper>
      <App>
      </App>
    </SupabaseProviderWrapper>
  )
}