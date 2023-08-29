'use client'
import { data } from "autoprefixer";
import { getServerSession } from "next-auth";
/* eslint-disable react-hooks/rules-of-hooks */
import { getSession, useSession } from "next-auth/react"

const page = () => {
  const {data: session} = useSession();
  console.log(session);
  return (
    <main>
      
    </main>
  )
}

export default page