/* eslint-disable react-hooks/exhaustive-deps */
import TweetCard from "@/components/tweet-card/TweetCard"
import { gql } from "@apollo/client"
import { useSuspenseQuery } from "@apollo/experimental-nextjs-app-support/ssr"
import { use, useEffect, useState } from "react"
const Replies = () => {

  const query = gql`
    query FetchUserReplies {
      fetchUserReplies {
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
  const { data }: {data: any} = useSuspenseQuery(query)
  console.log(data)

  const [tweetArr, setTweetArr] = useState<any>(null);

  useEffect(()=>{

    if(data !== null) {
      setTweetArr(data.fetchUserReplies)
    }
    console.log(tweetArr)
  }, [data])
  
  if(tweetArr === null || tweetArr === undefined) {
    return (
      <>Loading...</>
    )
  }

  return (
    <main>
      {
        tweetArr.map((replies: any, index: number)=>(
          <div className="border-b border-white/25" key={index}>
            {
              replies.map((reply: any, index: number)=>(
                  <TweetCard key={index} tweet={reply}/>
              ))
            }
          </div>
        ))
      }
    </main>
  )
}

export default Replies