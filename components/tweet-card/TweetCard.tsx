"use client"
import { useState } from 'react'
import { formatTimeAgo } from '@/services/timeFormat'
import { responseTweetDetailsType } from '@/services/typeDefs'
import { gql } from '@apollo/client'
import { useSuspenseQuery } from '@apollo/experimental-nextjs-app-support/ssr'
import Image from 'next/image'
import Link from 'next/link'
import TweetInteractions from '../DetailedTweets/TweetInteractions'
import { MdVerified } from 'react-icons/md'
import TextContext from './TextContext'

type extraUserDetailsType = {
  extraUserDetails: {
    bio: string | null;
    followingCount: number;
    followersCount: number;
  }
}

const TweetCard = ({ tweet, start, end }: {tweet: responseTweetDetailsType, start: boolean, end:boolean}) => {
  
  const [modalOpen, setModalOpen] = useState<boolean>(false)
  const [y, setY] = useState<number>(0)

  const handleMouseEnter = (e: any) => {
    setY(e.clientY)
    setModalOpen(true)
  }

  const handleMouseLeave = (e: any) => {
    setModalOpen(false)
  }

  const handleModalHover = () => {
    setModalOpen(true)
  }

  const handleModalOut = () => {
    setModalOpen(false)
  }


  return (
    <Link href={`/${tweet.author_username}/${tweet._id}`} className='hover:bg-white/5 transition-all'>
      <div className={`flex w-full `}>
        <div className='flex justify-center w-[12.3%]'> <section className={` h-2 w-1 ${!start ? "bg-[#323739]" : ""}`}></section></div>
        <div className='w-[87.7%]'></div>
      </div>
      <div className={`w-full grid grid-cols-10 auto-rows-fr px-2 ${end ? "border-b border-white/20 pb-1" : ""}`}>
        <div className='h-full relative flex justify-center'>
          <Link href={`/${tweet.author_username}`} className='absolute w-12 h-12'>
            <Image src={tweet.author_profile_image} width={50} height={50} alt='img' className='h-12 w-12 rounded-full object-cover absolute z-0'/>
          </Link>
          <div className={`h-full ${!end ? "bg-[#323739] w-1" : ""}`}></div>
        </div>
        <div className='col-span-9'>
          <div className='flex gap-x-2 pl-2 relative'>
            {modalOpen && (
            <div onMouseOver={handleModalHover} onMouseOut={handleModalOut} onClick={(e)=>{e.preventDefault()}}
            className={`bg-black border border-blue-500/50 w-72 p-4 shadow-[0_3px_10px_rgb(0,0,0,0.2)] rounded-[0.95rem] absolute z-10 ${ y > 150 ? "-top-44" : "top-6"}`}>
              <AcoountDetailsModal tweet={tweet} />
            </div>)}
            <p onMouseOver={handleMouseEnter} onMouseOut={handleMouseLeave} className='font-semibold h-3'>{tweet.author_display_name}</p>
            { tweet.is_blue && (<MdVerified className='mt-1 text-[#3b82f6]'/>)}
            <p className='opacity-80'>@{tweet.author_username}</p>
            &middot;
            <p className='opacity-60'>{formatTimeAgo(tweet.created_at)}</p>
          </div>
          {
            <TextContext text={tweet.text} />
          }
          {
            tweet.files && tweet.files.length > 0 && (
              <div onClick={(e)=>{e.preventDefault(); console.log("image click")}} className={`grid w-[90%] my-2 gap-2 mb-2 ${tweet.files.length === 1 ? "grid-cols-1" : tweet.files.length === 2 ? "grid-cols-2" : tweet.files.length === 3 ? "grid-cols-2" : "grid-cols-2"}`}>
                {tweet.files && tweet.files.map((image: string, index: number) => (
                  <div key={index} className={`relative ${tweet.files.length === 1 ? "row-span-2 col-span-2 h-80" : tweet.files.length === 2 ? "row-span-2 h-80" : tweet.files.length === 3 && index === 0 ? "row-span-2 h-80" : "col-span-1 h-40"}`}>
                    <Image
                      src={image}
                      width={100}
                      height={100}
                      quality={100}
                      className={`rounded-[12px] object-cover w-full h-full`}
                      alt='image'
                    />
                  </div>
                ))}
              </div>
            )
          }
          <TweetInteractions tweet={tweet} detailed={false} />
        </div>
      </div>
    </Link>
  )
}

const AcoountDetailsModal = ({tweet}: {tweet: responseTweetDetailsType}) => {

  const query = gql`
    query Query($username: String!) {
      extraUserDetails(username: $username) {
        bio
        followersCount
        followingCount
      }
    }
  `
  const { data }: { data: extraUserDetailsType | undefined | null } =  useSuspenseQuery(query, { variables: { username: tweet.author_username } })

  //console.log(data)

  if(data === null || data === undefined) {
    return <div>Loading...</div>
  }
  return (
    <>
      <div className='w-full flex gap-x-4 mb-5'>
        <Link href={`/${tweet.author_username}`}>
          <Image src={tweet.author_profile_image} width={50} height={50} alt='image' className='h-14 w-14 rounded-full object-cover'/>
        </Link>
        <Link href={`/${tweet.author_username}`}>
          <p className='text-lg font-bold'>{tweet.author_display_name}</p>
          <p className='opacity-75'>@{tweet.author_username}</p>
        </Link>
      </div>
      {
        data === null || data === undefined ? (<div>Loading</div>) : (
        <>
          {
            data.extraUserDetails.bio !== null && (
              <p className='w-full h-10'>
                {data.extraUserDetails.bio.length > 45 ? data.extraUserDetails.bio.slice(0, 45) + "..." : data.extraUserDetails.bio}
              </p>
            )
          }
          <div className='flex gap-x-3 opacity-60'>
            <p>Followers: {data.extraUserDetails.followersCount}</p>
            <p>Following: {data.extraUserDetails.followingCount}</p>
          </div>
        </>
        )
      }
    </>
  )
}

export default TweetCard