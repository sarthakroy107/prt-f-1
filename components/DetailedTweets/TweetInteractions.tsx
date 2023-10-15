"use client"

import { responseTweetDetailsType } from "@/services/typeDefs"
import { gql, useMutation } from "@apollo/client"
import { useState } from "react"
import { FaRegCommentAlt, FaRegHeart, FaHeart, FaRetweet } from "react-icons/fa"
import { GoBookmark, GoBookmarkFill } from "react-icons/go"
import { LuShare } from "react-icons/lu"

const TweetInteractions = ({tweet}: {tweet: responseTweetDetailsType}) => {
  const [tweetDetails, setTweetDetails] = useState< responseTweetDetailsType>(tweet)

  const mutationUnlikeTweet = gql`
    mutation Mutation($tweetId: String!) {
        unlikeTweet(tweetId: $tweetId)
    }
  `
  const mutationLikeTweet = gql`
    mutation Mutation($tweetId: String!) {
        likeTweet(tweetId: $tweetId)
    }
  `
  const mutationUnbookmarkTweet = gql`
    mutation Mutation($tweetId: String!) {
        unbookmarkTweet(tweetId: $tweetId)
    }
  `
  const mutationBookmarkTweet = gql`
    mutation Mutation($tweetId: String!) {
        bookmarkTweet(tweetId: $tweetId)
    }
  `
  const [unlikeTweet]     = useMutation(mutationUnlikeTweet)
  const [likeTweet]       = useMutation(mutationLikeTweet)
  const [unbookmarkTweet] = useMutation(mutationUnbookmarkTweet)
  const [bookmarkTweet]   = useMutation(mutationBookmarkTweet)    

  const handleLike = async () => {

    if(tweetDetails.is_liked) {
        setTweetDetails({...tweetDetails, is_liked: false, like_count: tweetDetails.like_count - 1})
        try {
            unlikeTweet({ variables: { tweetId: tweetDetails._id } })
        } catch (error) {
            setTweetDetails({...tweetDetails, is_liked: true, like_count: tweetDetails.like_count + 1})
        }
    }
    else {
        setTweetDetails({...tweetDetails, is_liked: true, like_count: tweetDetails.like_count + 1})
        try {
            likeTweet({ variables: { tweetId: tweetDetails._id } })
        } catch (error) {
            setTweetDetails({...tweetDetails, is_liked: false, like_count: tweetDetails.like_count - 1})
        }
    }
  }

  const handleBookmark = async () => {
    
        if(tweetDetails.is_bookmarked) {
            setTweetDetails({...tweetDetails, is_bookmarked: false, bookmark_count: tweetDetails.bookmark_count - 1})
            try {
                unbookmarkTweet({ variables: { tweetId: tweetDetails._id } })
            } catch (error) {
                setTweetDetails({...tweetDetails, is_bookmarked: true, bookmark_count: tweetDetails.bookmark_count + 1})
            }
        }
        else {
            setTweetDetails({...tweetDetails, is_bookmarked: true, bookmark_count: tweetDetails.bookmark_count + 1})
            try {
                bookmarkTweet({ variables: { tweetId: tweetDetails._id } })
            } catch (error) {
                setTweetDetails({...tweetDetails, is_bookmarked: false, bookmark_count: tweetDetails.bookmark_count - 1})
            }
        }
  }

  return (
    <div className="w-full border-y border-white/20 py-1 my-2 flex px-3 items-center justify-between">
        <div className="w-4/5 flex justify-between items-center">
            <div className="flex items-center hover:text-[#1c9bf1ff]">
                <div className="icon-hover group">
                    <FaRegCommentAlt className={`text-lg`}/>
                </div>
                &nbsp;
                <p className={`group-hover:text-[#1c9bf1ff]`}>{tweetDetails.reply_count}</p>
            </div>
            <div className="flex items-center group hover:text-[#01bb7cff]">
                <div className="icon-hover hover:bg-[#01bb7cff]/10">
                    <FaRetweet className={`text-xl`}/>
                </div>
                &nbsp;
                <p className={`group-hover:text-[#01bb7cff]`}>{tweetDetails.retweet_count + tweetDetails.quotetweet_count}</p>
            </div>
            <div className="flex items-center hover:text-[#f91880ff]">
                <div className="icon-hover group hover:bg-[#f91880ff]/10">
                    {
                        tweetDetails.is_liked ? 
                        <FaHeart onClick={handleLike} className={`text-xl text-[#f91880ff]`}/> :
                        <FaRegHeart onClick={handleLike} className={`text-xl`}/>
                    }
                </div>
                &nbsp;
                <p className={`group-hover:text-[#f91880ff]`}>{tweetDetails.like_count}</p>
            </div>
            <div className="flex items-center group">
                <div className="icon-hover hover:text-[#1c9bf1ff]">
                    {
                        tweetDetails.is_bookmarked ? 
                        <GoBookmarkFill onClick={handleBookmark} className={`text-xl text-[#1c9bf1ff]`}/> :
                        <GoBookmark onClick={handleBookmark} className={`text-xl`}/>
                    }
                </div>
                &nbsp;
                <p className={`group-hover:text-[#1c9bf1ff]`}>{tweetDetails.bookmark_count}</p>
            </div>
        </div>
        <div className="icon-hover">
            <LuShare className={`text-xl`}/>
        </div>
    </div>
  )
}


export default TweetInteractions