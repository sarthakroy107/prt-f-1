/* eslint-disable react-hooks/rules-of-hooks */
"use client"

import ProfileDetailsWithUsername from "@/components/page-components/prifilePageComponents/ProfileDetailsWithUsername";
import { useSession } from "next-auth/react"
import { redirect, usePathname } from "next/navigation";

const page = () => {
  const {data: session, status} = useSession();
  const pathname = usePathname();
  const username = pathname.split('/')[1]
  console.log(username)
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
        status === "authenticated" ? (<ProfileDetailsWithUsername username={username} />) : status === "loading" ? (<>Loading...</>) : (<>Unauthorized</>)
      }
    </section>
  )
}

export default page