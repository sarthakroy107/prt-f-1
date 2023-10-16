"use client"
import TweetDetails from '@/app/(page-group)/[username]/[tweet_id]/page'
import { responseTweetDetailsType } from '@/services/typeDefs'
import { gql } from '@apollo/client'
import { useSuspenseQuery } from '@apollo/experimental-nextjs-app-support/ssr'
import Image from 'next/image'
import { useParams } from 'next/navigation'
import { stringify } from 'querystring'
import React, { use, useEffect } from 'react'
import TweetCard from '../tweet-card/TweetCard'
import TweetInteractions from './TweetInteractions'
import { formatTimeAgo } from '@/services/timeFormat'

type TweetRepliesType = {
  fetchRepliesForSpecifivTweet: any
}

const TweetReplies = ({ tweetId, authorUsername }: { tweetId: string, authorUsername: string }) => {
  console.log(tweetId, authorUsername)
  const query = gql`
      query Query($tweetId: String!, $offset: Int!) {
        fetchRepliesForSpecifivTweet(tweetId: $tweetId, offset: $offset) {
          _id
          author_display_name
          author_username
          author_profile_image
          text
          files
          is_liked
          like_count
          is_retweeted
          retweet_count
          quotetweet_count
          reply_count
          is_sensitive
          in_reply
          in_reply_to_tweet_id
          in_reply_to_user_id
          in_reply_to_username
          created_at
          updated_at
          views_count
          is_following
          is_bookmarked
          bookmark_count
        }
      }
  `
  const params = useParams();
  console.log(params)
  const { data }: { data: TweetRepliesType} = useSuspenseQuery(query, {
    variables: { tweetId: params.tweet_id, offset: 0 },
  })

  useEffect(() => { 
    console.log(data.fetchRepliesForSpecifivTweet)
  }, [data])

  if(data === null || data === undefined || data.fetchRepliesForSpecifivTweet === null || data.fetchRepliesForSpecifivTweet === undefined) {
    return <div>Loading...</div>
  }

  return (
    <div>
      {
        data.fetchRepliesForSpecifivTweet.map((reply_arr: responseTweetDetailsType[], index: number) => (
          <>
            {
              reply_arr.map((reply: responseTweetDetailsType, index: number) => (
                <Replies key={ index } reply_details={ reply } start={ index === 0 ? true : false} end={index === (reply_arr.length -1) ? true : false } />
              ))
            }
          </>
        ))
      }
    </div>
  )
}


const Replies = ({ reply_details, start, end }: { reply_details: responseTweetDetailsType, start: boolean, end: boolean }) => {
  return (
    <>
      <div className={`flex w-full `}>
        <div className='flex justify-center w-[12.3%]'> <section className={` h-2 w-1 ${!start ? "bg-[#323739]" : ""}`}></section></div>
        <div className='w-[87.7%]'></div>
      </div>
      <div className={`w-full grid grid-cols-10 auto-rows-fr px-2 ${end ? "border-b border-white/20 pb-1" : ""}`}>
        <div className='h-full relative flex justify-center'>
          <Image src={reply_details.author_profile_image} width={50} height={50} alt='img' className='h-12 w-12 rounded-full object-cover absolute z-0'/>
          <div className={`h-full ${!end ? "bg-[#323739] w-1" : ""}`}></div>
        </div>
        <div className='col-span-9'>
          <div className='flex gap-x-2 pl-2'>
            <p className='font-semibold'>{reply_details.author_display_name}</p>
            <p className='opacity-80'>@{reply_details.author_username}</p>
            &middot;
            <p className='opacity-60'>{formatTimeAgo(reply_details.created_at)}</p>
          </div>
          <p className='min-h-6 pl-2'>{reply_details.text}</p>
          <TweetInteractions tweet={reply_details} detailed={false} />
        </div>
      </div>
    </>
  )
}
export default TweetReplies