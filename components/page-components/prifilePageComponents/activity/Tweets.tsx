/* eslint-disable react-hooks/exhaustive-deps */
"use client"
import TweetCard from "@/components/tweet-card/TweetCard"
import { gql } from "@apollo/client"
import { useSuspenseQuery } from "@apollo/experimental-nextjs-app-support/ssr"
import { useEffect, useState } from "react"

const Tweets = () => {
    const query = gql`
      query Query {
        fetchUserTweets {
        is_liked
        like_count
        _id   
        text
        created_at
        files
        views_count
        retweet_count
        reply_count
        author_display_name
        author_profile_image
        author_username
      }
    }
  `
    const [tweetArr, setTweetArr] = useState(null);

    const { data }: {data: any} = useSuspenseQuery(query)

    console.log(data)

    useEffect(()=>{

      if(data !== null) {
        setTweetArr(data.fetchUserTweets)
      }
      console.log(tweetArr)
    }, [data])
    
  if(tweetArr === null || tweetArr === undefined) {
    return (
      <>Loading...</>
    )
  }
  
  return (
   <>
    {
      //@ts-ignore
      tweetArr.map((tweet, index)=> (
        <div className="border-b border-white/25" key={index}><TweetCard tweet={tweet}/></div>
      ))
    }
   </>
  )
}

export default Tweets