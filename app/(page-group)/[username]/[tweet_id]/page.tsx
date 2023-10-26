"use client"
import { responseTweetDetailsType } from "@/services/typeDefs"
import { gql } from "@apollo/client"
import { useSuspenseQuery } from "@apollo/experimental-nextjs-app-support/ssr"
import { useParams } from "next/navigation"
import { useEffect, useState } from "react"
import { HiOutlineArrowSmallLeft } from "react-icons/hi2"
import MainTweetBody from "@/components/DetailedTweets/MainTweetBody"

import { useUserContext } from "@/lib/contextApi/UserContext"
import TweetReplies from "@/components/DetailedTweets/TweetReplies"

const TweetDetails = () => {
  const params = useParams()
  const [tweetDetails, setTweetDetails] = useState< responseTweetDetailsType | null >(null)

  const query = gql`query Query($tweetId: String!) {
    fetchSpecificTweet(tweetId: $tweetId) {
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
  const { data } = useSuspenseQuery(query, { variables: { tweetId: params.tweet_id } })

  useEffect(()=> {
    if(data !== null) {
      //@ts-ignore
      setTweetDetails(data?.fetchSpecificTweet)
      console.log(data)
    }
  }, [data])

  if(tweetDetails === null || tweetDetails === undefined) {
    return (
      <div>Loading...</div>
    )
  }

  return (
    <main className="w-full">
      <div className="h-[3.5rem] flex items-center px-3 gap-3 bg-black/75 backdrop-blur-sm sticky top-0 z-20">
        <div className="icon-hover">
          <HiOutlineArrowSmallLeft className="text-2xl"/>
        </div>
        <p className="text-xl font-bold">Post</p>
      </div>
      <MainTweetBody tweetDetails={tweetDetails} />
      <TweetReplies tweetId={tweetDetails._id} authorUsername={tweetDetails.author_username} />
    </main>
  )
}

export default TweetDetails