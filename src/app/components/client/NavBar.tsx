"use client"

import Link from "next/link"
import Logout from "@/app/components/client/Logout"

export default function NavBar() {
  return (
    <div className="grid justify-between grid-cols-3 my-4 text-center">
      <Link className="col-span-1 mx-1 border border-white rounded-md" href="/">Home</Link>
      <Link className="col-span-1 mx-1 border border-white rounded-md" href="/scoreBoard">Score Board</Link>
      <div className="col-span-1 mx-1 border border-white rounded-md">
        <Logout />
      </div>
    </div>
  )
}