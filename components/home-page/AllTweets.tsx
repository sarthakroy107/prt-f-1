/* eslint-disable react-hooks/exhaustive-deps */
"use client"
import TweetCard from "@/components/tweet-card/TweetCard"
import { gql } from "@apollo/client"
import { useSuspenseQuery } from "@apollo/experimental-nextjs-app-support/ssr"
import { useEffect, useState } from "react"

const Tweets = () => {
  const query = gql`
      query Query {
        fetchAllTweets {
            is_liked
            like_count
            _id   
            text
            created_at
            files
            views_count
            retweet_count
            quotetweet_count
            reply_count
            author_display_name
            author_profile_image
            author_username
            is_blue
        }
    }
  `
  const [tweetArr, setTweetArr] = useState(null);

  const { data }: { data: any } = useSuspenseQuery(query)

  console.log(data)

  useEffect(() => {

    if (data !== null) {
      console.log(data)
      setTweetArr(data.fetchAllTweets)
    }
    console.log(tweetArr)
  }, [data])

  if (tweetArr === null || tweetArr === undefined) {
    return (
      <>Loading...</>
    )
  }

  return (
    <>
      {
        //@ts-ignore
        tweetArr.map((tweet, index) => (
          <TweetCard key={index} tweet={tweet} start={true} end={true} />
        ))
      }
    </>
  )
}

export default Tweets