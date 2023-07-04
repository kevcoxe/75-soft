import Link from 'next/link'

export default async function LandingPage() {
  return (
    <div className='container h-screen mx-auto'>
      <div className='grid content-around h-full grid-cols-1 mx-4'>
        <h1 className="mb-16 text-center text-7xl">
          75 Soft
        </h1>

        <div className='flex flex-col gap-4'>
          <Link className='w-full px-4 py-2 text-center text-black bg-white rounded-md' href="/login">Login</Link>
          <Link className='w-full px-4 py-2 text-center text-black bg-white rounded-md' href="/signup">Sign up</Link>
        </div>
      </div>
    </div>
  )
}
