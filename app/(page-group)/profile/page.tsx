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

  if(status === "loading") {
    return(
      <div>Loading...</div>
    )
  }

  return (
    <section className="flex gap-2 pb-2" >
      {
        status === "authenticated" ? (<ProfileDetails email={session?.user?.email} />) : status === "loading" ? (<>Loading...</>) : (<>Unauthorized</>)
      }
    </section>
  )
}

export default page