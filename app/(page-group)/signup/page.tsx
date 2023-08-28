"use client"
import { useSession } from 'next-auth/react'
import React from 'react'

const page = () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const {data: session } = useSession();
  
  if(session && session.user) {
    return (
      <div>USer signed in</div>
    )
  }
  
  return (
    <main className='w-full h-screen'>
      sfjoosfufbnvou
    </main>
  )
}

export default page