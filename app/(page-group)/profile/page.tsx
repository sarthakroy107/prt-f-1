"use client"
/* eslint-disable react-hooks/rules-of-hooks */
import { useSession } from "next-auth/react"

const page = () => {
  const {data: session} = useSession();
  if(session && session.user) {
    return (
      <main>{session.user.email}</main>
    )
  }
  return (
    <main className="w-full">
        <div className="w-full py-2 sticky top-0 bg-black/30 backdrop-blur-md">
            <div className="font-semibold text-xl px-4 my-3">Home</div>
            <div className="flex">
                <div className="w-1/2 text-center py-3 font-semibold hover:bg-slate-200/10">For you</div>
                <div className="w-1/2 text-center py-3 font-semibold hover:bg-slate-200/10">Following</div>
            </div>
        </div>
        <div className="h-screen bg-white"></div>
    </main>
  )
}

export default page