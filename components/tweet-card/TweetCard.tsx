"use client"
import React, { useState } from 'react'
import Image from 'next/image'
import { FaRegCommentAlt, FaRegHeart, FaHeart } from 'react-icons/fa'
import { FaRetweet } from 'react-icons/fa6'
import { VscListFlat } from 'react-icons/vsc'
import axios from 'axios'
import { useCookies } from 'next-client-cookies'

interface tweetDetailsType {
  isLiked: boolean
  likeCount: number
}

const TweetCard = ({tweet}: {tweet: any}) => {
  console.log(tweet);
  const [tweetDetails, setTweetDetails] = useState<tweetDetailsType>({
    isLiked: tweet.isLiked,
    likeCount: tweet.likeCount
  });
  const cookie = useCookies();
  const token = cookie.get("token")
  console.log(token)
  const likeHandler = async () => {
    if(tweetDetails.isLiked) {
      try {
        setTweetDetails({
          ...tweetDetails,
          isLiked: false,
          likeCount: tweetDetails.likeCount-1,
        })
        const response = await axios({
          method: 'put',
          url: "http://localhost:8000/api/v1/unlike-tweet",
          data: {
            tweetId: tweet._id
          },
          headers: { 
            Authorization: `Bearer ${token}` 
          },
        });
      } catch (error) {
        setTweetDetails({
          ...tweetDetails,
          isLiked: true,
          likeCount: tweetDetails.likeCount+1,
        })
        console.log(error)
      }
    }
    else {
      try {
        setTweetDetails({
          ...tweetDetails,
          isLiked: true,
          likeCount: tweetDetails.likeCount+1,
        })
        await axios({
          method: 'put',
          url: "http://localhost:8000/api/v1/like-tweet",
          data: {
            tweetId: tweet._id
          },
          headers: { 
            Authorization: `Bearer ${token}` 
          },
        })
      } catch (error) {
        setTweetDetails({
          ...tweetDetails,
          isLiked: false,
          likeCount: tweetDetails.likeCount-1,
        })
        console.log(error)
      }
    }
  }

  return (
    <div className="w-full border-b border-white/25 flex ">
        <div className="p-3 w-[13%]">
          <Image className="w-12 h-12 object-cover rounded-full" src={tweet.author.profileImageUrl} width={200} height={200} alt="profile image"/>
        </div>
        <div className="w-[87%] py-2">
          <div className="text-slate-500/75 font-medium">
            <span className="font-semibold text-white">{tweet.author.name}</span> @{tweet.author.username}
          </div>
          <div>
            {tweet.body}
          </div>
          <div className={`w-5/6 grid grid-cols-2 grid-rows-2 gap-1 rounded-2xl overflow-hidden
          ${ tweet.files.length > 0 ? "mt-3" : "" }`}>
            {
                tweet.files.map((image: string, index: number)=> (
                    <Image quality={100} key={index} className={`w-full object-cover 
                    ${index === 0 &&  tweet.files.length === 3? "row-span-2 h-full" : tweet.files.length === 2 ? "row-span-2 h-full" :
                    tweet.files.length === 1 ? "row-span-2 col-span-2 h-full" : "h-28"}`} 
                    src={image} width={200} height={200} alt="profile image"/>
                ))
            }
          </div>
          <div className='w-full mt-3 flex'>
           <div className='w-1/4'>
                <div className='w-fit hover:bg-[#1c9bf1ff]/10 hover:text-[#1c9bf1ff] transition-all duration-100 rounded-full p-2'>
                    <FaRegCommentAlt className="text-lg text-slate-300/40"/>
                </div>
            </div>
            <div className='w-1/4'>
                <div className='w-fit hover:bg-[#01bb7cff]/10 hover:text-[#01bb7cff] transition-all duration-150 rounded-full p-2'>
                    <FaRetweet className="text-lg text-slate-300/40"/>
                </div>
            </div>
            <div className='w-1/4'>
                <div onClick={likeHandler}
                className={`w-fit hover:bg-[#f91880ff]/10 hover:text-[#f91880ff] transition-all duration-100 rounded-full p-2 flex gap-2`}>
                    {
                      tweetDetails.isLiked ? (<FaHeart className="text-[#f91880ff]"/>) : (<FaRegHeart className={`text-lg text-slate-300/40`}/>)
                    }
                    
                    <p className={`relative -top-1 opacity-80 ${tweetDetails.isLiked ? "text-[#f91880ff]" : ""}`}>{tweetDetails.likeCount}</p>
                </div>
            </div>
            <div className='w-1/4'>
              <div className='w-fit hover:bg-[#01bb7cff]/10 hover:text-[#01bb7cff] transition-all duration-150 rounded-full p-2'>
                  <VscListFlat className="text-lg text-slate-300/40 -rotate-90"/>
              </div>
            </div>
          </div>
        </div>
    </div>
  )
}

export default TweetCard