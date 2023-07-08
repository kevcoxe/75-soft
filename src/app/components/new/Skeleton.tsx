"use client"

export default function Skeleton() {
  return (
    <>
    { true && (
      <div className="grid content-around h-screen grid-cols-1">
        <div className={`content-around flex flex-col gap-1`}>
          <h1 className="mb-16 text-center text-7xl">
            75 Soft
          </h1>
          <div className="flex flex-col gap-1 mb-4">
            <div className="flex flex-col p-4 m-2 border border-black rounded-lg animate-pulse">
              <div className="grid items-center grid-cols-6">
                {/* <div className="flex col-span-6">
                  <div className="w-24 h-24 rounded-full bg-slate-800"></div>
                </div> */}
                <div className="flex flex-col col-span-6">
                  <div className="py-8 my-2 bg-slate-500 rounded-xl"></div>
                  {/* <div className="py-8 my-2 rounded-xl bg-slate-800"></div>
                  <div className="py-8 my-2 rounded-xl bg-slate-800"></div>
                  <div className="py-8 my-2 rounded-xl bg-slate-800"></div> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )}
    { false && (
    <div className="flex flex-col p-4 m-2 border rounded-lg animate-pulse border-slate-800">
      <div className="grid items-center grid-cols-6">
        {/* <div className="flex col-span-6">
          <div className="w-24 h-24 rounded-full bg-slate-800"></div>
        </div> */}
        <div className="flex flex-col col-span-6">
          <div className="py-8 my-2 rounded-xl bg-slate-800"></div>
          {/* <div className="py-8 my-2 rounded-xl bg-slate-800"></div>
          <div className="py-8 my-2 rounded-xl bg-slate-800"></div>
          <div className="py-8 my-2 rounded-xl bg-slate-800"></div> */}
        </div>
      </div>
    </div>
      
    )}
    </>
  )
}