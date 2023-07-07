"use client"

import SupabaseProviderWrapper from "@/app/components/client/SupabaseProviderWrapper"
import App from "@/app/components/client/App"

export default function MainPage () {
  return (
    <SupabaseProviderWrapper>
      <App>
      </App>
    </SupabaseProviderWrapper>
  )
}