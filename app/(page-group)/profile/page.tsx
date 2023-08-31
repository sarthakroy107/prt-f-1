/* eslint-disable react-hooks/rules-of-hooks */
"use client"

import { useSession } from "next-auth/react"

const page = () => {
  const {data: session, status} = useSession()

  return (
    <div>{JSON.stringify(session)}  {status}</div>
  )
}

export default page