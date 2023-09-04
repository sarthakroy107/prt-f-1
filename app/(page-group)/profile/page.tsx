/* eslint-disable react-hooks/rules-of-hooks */
"use client"

import { fetchUserDetails } from "@/redux/slices/account"
import { AppDispatch } from "@/redux/store"
import { useSession } from "next-auth/react"
import { useDispatch } from "react-redux"

const page = () => {
  const {data: session, status} = useSession()
  
  return (
    <>
      <div>{JSON.stringify(session)}  {status}</div>
    </>
  )
}

export default page