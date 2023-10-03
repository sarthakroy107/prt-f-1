import React, { useContext } from 'react'
import { UserContext } from '@/lib/contextApi/UserContext';

const CreateTweetModal = () => {
  //@ts-ignore
  const { user } = useContext(UserContext);

  console.log(user)
  return (
    <div className='w-[30%] top-0 border border-white/50 p-7 h-fit mt-9 relative -left-16 rounded-lg bg-black text-white'>
        
    </div>
  )
}

export default CreateTweetModal