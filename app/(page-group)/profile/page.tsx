/* eslint-disable react-hooks/rules-of-hooks */
"use client"

import ProfileDetails from "@/components/page-components/prifilePageComponents/ProfileDetails";
import { useSession } from "next-auth/react"
import { redirect } from "next/navigation";

const page = () => {
  const {data: session, status} = useSession();
  console.log(session)
  if(status === "unauthenticated") {
    redirect('/login')
  }
  
  return (
    <>
      <section className="bg-white/5 sticky top-0 backdrop-blur-xlflex gap-2" >
        {
          status === "authenticated" ? (<ProfileDetails email={session?.user?.email} />) : status === "loading" ? (<>Loading...</>) : (<>Unauthorized</>)
        }
      </section>
      <section>
        
      </section>
    </>
  )
}

export default page