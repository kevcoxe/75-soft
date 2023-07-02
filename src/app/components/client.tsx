"use client"
import { useUser } from '@auth0/nextjs-auth0/client';
import Image from 'next/image';
import Link from 'next/link';
import { ReactNode } from 'react';

export default function Client({ children }: { children: ReactNode}) {
  const { user, error, isLoading } = useUser();
  if (isLoading) return <div>Loading...</div>
  if (error) return <div>Error: {error.message}</div>
  return (
    <main>
      {user ? (
        <div className='flex flex-col gap-2'>
          <div className="grid items-center p-4 justify-items-end">
            <div className="flex">
              <Image
                className='rounded-full'
                src={user?.picture || ""}
                width={50}
                height={50}
                alt="Picture of the author"
                
              />
              <div className="px-4 my-auto">
                <Link
                  className='px-4 py-2 font-extrabold transition rounded-md hover:ring-2 ring-white ring-offset-1'
                  href="/api/auth/logout"
                >Logout</Link>
              </div>
            </div>
          </div>

          <div className="flex">
            { children }
          </div>

        </div>
      ) : (
        <a href="/api/auth/login">Login</a>
      )}
    </main>
  )
}