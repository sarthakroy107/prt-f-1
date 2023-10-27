"use client"
import { responseTweetDetailsType } from '@/services/typeDefs'
import { gql, useSuspenseQuery } from '@apollo/client'
import TweetCard from '../tweet-card/TweetCard'
import { useEffect, useState } from 'react'

type graphqlQueryType = {
    fetchSearchData: responseTweetDetailsType[]
}

const SearchTweets = ({query}: {query: string }) => {

    const gqlQuery = gql`
        query FetchSearchData($q: String!, $s: String) {
            fetchSearchData(q: $q, s: $s) {
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
                is_blue
            }
        }
    `
    const [tweetArr, setTweetArr] = useState<responseTweetDetailsType[] | null>(null);

    console.log(query);
    const { data }: { data: graphqlQueryType, fetchMore: any} = useSuspenseQuery(gqlQuery, {
        variables: {
            q: query,
            s: "latest"
        }
    })
    useEffect(()=>{
        if(data !== null) {
            setTweetArr(data.fetchSearchData)
        }
    
    }, [data])
 
    if(tweetArr === null || tweetArr === undefined) {
        return <div>Loading...</div>
    }
    
  return (
    <>
    {
        data && data.fetchSearchData.map((tweet, index)=> (
            <TweetCard key={index} tweet={tweet} start={true} end={true}/>
        ))
    }
    </>
    
  )
}

export default SearchTweets