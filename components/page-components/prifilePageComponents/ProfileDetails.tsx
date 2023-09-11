import { options } from '@/constants/profile-activity'
import { gql } from '@apollo/client'
import { useSuspenseQuery } from '@apollo/experimental-nextjs-app-support/ssr'
import Image from 'next/image'
import { useState } from 'react'
import { HiOutlineArrowSmallLeft } from 'react-icons/hi2'
import { LuCalendarDays } from 'react-icons/lu'
import Tweets from './activity/Tweets'
import Replies from './activity/Replies'
import Retweet from './activity/Retweet'

const ProfileDetails = ({email}:{email: string}) => {

  const query = gql`
    query Query($email: String!) {
      fetchUserDetailsWithEmail(email: $email) {
        name
        username
        profileImageUrl
        banner
        blue
        tweetCount
        createdAt
        followersCount
        followingCount
      }
    }
  `
  const { data }: { data: any } = useSuspenseQuery(query, { variables: { email } })
  console.log(data)

  const [opt, setOpt] = useState(1)

  const newDate = new Date(Number(data.fetchUserDetailsWithEmail.createdAt))
  console.log(newDate)

  return (
    <main className='w-full'>
      <div className='flex gap-3 items-center w-full p-2 sticky top-0 bg-black/70 backdrop-blur-md z-10'>
        <div className="p-1 rounded-full hover:bg-slate-100/10 w-fit transition-all duration-100 cursor-pointer">
          <HiOutlineArrowSmallLeft className="text-2xl"/>
        </div>
        <div className=''>
          <p className='font-semibold'>{data.fetchUserDetailsWithEmail.name}</p>
          <p className='text-sm opacity-70'>{data.fetchUserDetailsWithEmail.tweetCount} Tweets</p>
        </div>
      </div>
      <Image 
      src={data.fetchUserDetailsWithEmail.banner}
      className='h-fit w-full object-cover'
      height={750}
      width={600}
      alt='Banner'
      />
      <div className='w-full h-24 p-3 px-7 flex justify-between bg-slate-300/5'>
        <Image 
        src={data.fetchUserDetailsWithEmail.profileImageUrl}
        className='rounded-full w-36 h-36 object-cover relative top-[-4.5rem]'
        height={200}
        width={200}
        style={{
          border: "4px solid #000",
          objectFit: "cover",
        }}
        alt='Banner'
        />
        <div className='p-2 px-4 border border-slate-300/50 rounded-full h-fit'>
          Edit profile
        </div>
      </div>
      <div className='min-h-28 px-7 bg-slate-300/5'>
        <p className='text-xl font-semibold'>{data.fetchUserDetailsWithEmail.name}</p>
        <p className='opacity-75'>@{data.fetchUserDetailsWithEmail.username}</p>
        <p className='text-sm opacity-50 mt-1 flex'>
          <LuCalendarDays className="relative top-[0.20rem]"/> &nbsp; Joined &nbsp;
          {
            new Date(Number(data.fetchUserDetailsWithEmail.createdAt)).toLocaleString('en-GB', {
              hour12: false,
            }).split(",")[0]
          }
        </p>
        <div className='flex gap-7 mt-1 pb-1'>
          <div className='flex hover:underline opacity-70 text-white/50'>
            <p className='font-semibold opacity-100 text-white'>{data.fetchUserDetailsWithEmail.followingCount}</p> &nbsp; following
          </div>
          <div className='flex hover:underline opacity-70 text-white/50'>
            <p className='font-semibold opacity-100 text-white'>{data.fetchUserDetailsWithEmail.followersCount}</p> &nbsp; following
          </div>
        </div>
      </div>
      <section>
        <div className="flex w-full justify-around font-medium border-b border-white/20">
          {
            options.map((option, index)=>(
              <div onClick={()=> setOpt(option.id)}
              className="hover:bg-slate-100/20 w-full pt-2 transition-all duration-5s0 flex justify-center 
              bg-slate-300/5 text-slate-300/75 cursor-pointer" key={index}>
                <p>
                  {option.name}
                  <div className={`w-full h-[0.20rem] mt-2 ${opt === option.id ? "bg-blue-500" : ""} rounded-md`}></div>
                </p>
              </div>
            ))
          }
        </div>
        <div className="w-full">
          {
            opt === 1 ? (<Tweets/>) : opt === 2 ? (<Replies/>) : (<Retweet/>)
          }
        </div>
      </section>
    </main>
  )
}

export default ProfileDetails