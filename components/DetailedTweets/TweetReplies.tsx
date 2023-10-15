"use client"
import React from 'react'

const TweetReplies = ({ tweetId, authorUsername }: { tweetId: string, authorUsername: string }) => {
    console.log(tweetId, authorUsername)
  return (
    <div>{tweetId}</div>
  )
}

export default TweetReplies