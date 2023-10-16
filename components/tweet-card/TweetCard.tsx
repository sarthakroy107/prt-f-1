"use client"
import React, { useState } from 'react'
import Image from 'next/image'
import TweetInteractions from '../DetailedTweets/TweetInteractions'
import { formatTimeAgo } from '@/services/timeFormat'
import { responseTweetDetailsType } from '@/services/typeDefs'
import Link from 'next/link'
import { redirect } from 'next/navigation'

const TweetCard = ({ tweet, start, end }: {tweet: responseTweetDetailsType, start: boolean, end:boolean}) => {
  console.log(tweet, start, end)

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
          <div className='flex gap-x-2 pl-2'>
            <p className='font-semibold'>{tweet.author_display_name}</p>
            <p className='opacity-80'>@{tweet.author_username}</p>
            &middot;
            <p className='opacity-60'>{formatTimeAgo(tweet.created_at)}</p>
          </div>
          <p className='min-h-6 pl-2'>{tweet.text}</p>
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

export default TweetCard