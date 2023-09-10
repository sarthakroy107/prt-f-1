/* eslint-disable react-hooks/exhaustive-deps */
import TweetCard from "@/components/tweet-card/TweetCard"
import { gql } from "@apollo/client"
import { useSuspenseQuery } from "@apollo/experimental-nextjs-app-support/ssr"
import Image from "next/image"
import { useEffect, useState } from "react"

const Tweets = () => {
    const query = gql`
      query Query {
        fetchUserTweets {
          _id
          author {
            _id
            blue
            name
            profileImageUrl
            username
          }
          body
          files
          viewsCount
        }
      }
    `
    const [tweetArr, setTweetArr] = useState(null);
    const { data }: {data: any} = useSuspenseQuery(query)
    console.log(data)
    useEffect(()=>{

      if(data !== null) {
       if(data !== null) {
        setTweetArr(data.fetchUserTweets)
       }
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
       <TweetCard key={index} tweet={tweet}/>
      ))
    }
   </>
  )
}

export default Tweets