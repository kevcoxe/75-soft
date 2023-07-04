"use client"

import { redirect } from 'next/navigation'

export default function Logout() {

  const handleSignOut = async () => {
    await fetch('/api/logout', { method: 'DELETE' })
    redirect('/')
  }

  return (
    <form action={handleSignOut}>
      <button type="submit" className='text-red-500 rounded-md'>Sign out</button>
    </form>
  )
}