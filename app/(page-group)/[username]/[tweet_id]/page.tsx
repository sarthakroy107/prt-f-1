"use client"
import { responseTweetDetailsType } from "@/services/typeDefs"
import { gql } from "@apollo/client"
import { useSuspenseQuery } from "@apollo/experimental-nextjs-app-support/ssr"
import { useParams } from "next/navigation"
import { useEffect, useState } from "react"
import Image from "next/image"
import { HiOutlineArrowSmallLeft } from "react-icons/hi2"
import TweetInteractions from "@/components/buttons/TweetInteractions"

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
      <div className="h-[3.5rem] flex items-center px-3 gap-3 bg-black/75 backdrop-blur-sm sticky top-0">
        <div className="icon-hover">
          <HiOutlineArrowSmallLeft className="text-2xl"/>
        </div>
        <p className="text-xl font-bold">Post</p>
      </div>
      <div className="w-full h-2">
        <div className="h-2 w-[13.5%]  flex items-center justify-center">
          <div className="h-2 w-1 bg-[#323739]"></div>
          </div>
        <div className=" h-2 w-[86%]"></div>
      </div>
      <div className="px-5 w-full">
        <div className="flex items-center gap-x-3">
          <div className="h-12 w-12 rounded-full overflow-hidden">
            <Image 
              src={tweetDetails.author_profile_image} 
              width={50} height={50} 
              alt="profile image"
              className=" object-cover h-12 w-12" 
              draggable={false}
            />
          </div>
          <div>
            <p className="font-bold">{tweetDetails.author_display_name}</p>
            <p className="text-gray-500">@{tweetDetails.author_username}</p>
          </div>
        </div>
        <div className="w-full  py-3">
          <p>{tweetDetails.text}</p>
          <div className={`w-full grid grid-cols-2 grid-rows-2 gap-1 rounded-2xl overflow-hidden
            ${ tweetDetails.files!.length > 0 ? "mt-3" : "" }`}>
              {
                tweetDetails.files!.map((image: string, index: number)=> (
                    <Image quality={100} key={index} className={`w-full object-cover 
                    ${index === 0 &&  tweetDetails.files!.length === 3? "row-span-2 h-full" : tweetDetails.files!.length === 2 ? "row-span-2 h-full" :
                    tweetDetails.files!.length === 1 ? "row-span-2 col-span-2 h-full" : "h-28"}`} 
                    src={image} width={200} height={200} alt="profile image"/>
                ))
              }
          </div>
        </div>
        <div className="w-full flex gap-x-2  text-[#70767a]">
          <p>
          {
            new Date(Number(tweetDetails.created_at)).toLocaleString([], { hour: '2-digit', minute: '2-digit', year: "numeric", month: "short", day: "numeric"}).split(",")[1]
          }
          </p>
          &middot;
          <p>
          {
            new Date(Number(tweetDetails.created_at)).toLocaleString([], { hour: '2-digit', minute: '2-digit', year: "numeric", month: "short", day: "numeric"}).split(",")[0]
          }
          </p>
          &middot;
          <p className="text-white font-semibold">{tweetDetails.views_count}</p>
          views
        </div>
        <TweetInteractions tweet={tweetDetails} />
      </div>
    </main>
  )
}

export default TweetDetails