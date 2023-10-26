"use client"
import { useEffect } from 'react'
import { responseTweetDetailsType } from '@/services/typeDefs'
import { gql } from '@apollo/client'
import { useSuspenseQuery } from '@apollo/experimental-nextjs-app-support/ssr'
import { useParams } from 'next/navigation'
import TweetCard from '../tweet-card/TweetCard'
import CreateTweet from './CreateTweet'

type TweetRepliesType = {
  fetchRepliesForSpecifivTweet: any
}

const TweetReplies = ({ tweetId, authorUsername }: { tweetId: string, authorUsername: string }) => {
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
  //console.log(params)
  const { data }: { data: TweetRepliesType } = useSuspenseQuery(query, {
    variables: { tweetId: params.tweet_id, offset: 0 },
  })

  useEffect(() => {
    
  }, [data])

  if (data === null || data === undefined || data.fetchRepliesForSpecifivTweet === null || data.fetchRepliesForSpecifivTweet === undefined) {
    return <div>Loading...</div>
  }

  return (
    <div>
      <div className='px-5 py-1 border-b border-white/30'>
        <CreateTweet in_reply={true} in_reply_to={params.tweet_id as string}/>
      </div>
      {
        data.fetchRepliesForSpecifivTweet.map((reply_arr: responseTweetDetailsType[], index: number) => (
          <>
            {
              reply_arr.map((reply: responseTweetDetailsType, index: number) => (
                <TweetCard key={index} tweet={reply} start={index === 0 ? true : false} end={index === (reply_arr.length - 1) ? true : false} />
              ))
            }
          </>
        ))
      }
    </div>
  )
}
export default TweetReplies