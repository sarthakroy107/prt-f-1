"use client"
import { responseTweetDetailsType } from "@/services/typeDefs"
import { gql, useMutation } from "@apollo/client"
import { useEffect, useState } from "react"
import { FaRegCommentAlt, FaRegHeart, FaHeart, FaRetweet } from "react-icons/fa"
import { GoBookmark, GoBookmarkFill } from "react-icons/go"
import { LuShare } from "react-icons/lu"
import { VscListFlat } from "react-icons/vsc"
import { PiPencilSimpleLineBold } from "react-icons/pi"

const TweetInteractions = ({ tweet, detailed }: { tweet: responseTweetDetailsType, detailed: boolean }) => {
    console.log(tweet)
    const [tweetDetails, setTweetDetails] = useState<responseTweetDetailsType>(tweet)

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
    const mutationRetweetTweet = gql`
    mutation Mutation($tweetId: String!) {
       retweetTweet(tweetId: $tweetId)
    }
    `
    const mutationUndoRetweetTweet = gql`
        mutation Mutation($tweetId: String!) {
            unretweetTweet(tweetId: $tweetId)
        }

    `
    const [unlikeTweet] = useMutation(mutationUnlikeTweet);
    const [likeTweet] = useMutation(mutationLikeTweet);
    const [unbookmarkTweet] = useMutation(mutationUnbookmarkTweet);
    const [bookmarkTweet] = useMutation(mutationBookmarkTweet);
    const [retweetTweet] = useMutation(mutationRetweetTweet);
    const [undoRetweetTweet] = useMutation(mutationUndoRetweetTweet);
    const [retweetModal, setRetweetModal] = useState<boolean>(false);
    const [y, setY] = useState<number>(0);

    const handleLike = async (e: any) => {
        e.preventDefault()

        if (tweetDetails.is_liked) {
            setTweetDetails({ ...tweetDetails, is_liked: false, like_count: tweetDetails.like_count - 1 })
            try {
                unlikeTweet({ variables: { tweetId: tweetDetails._id } })
            } catch (error) {
                setTweetDetails({ ...tweetDetails, is_liked: true, like_count: tweetDetails.like_count + 1 })
            }
        }
        else {
            setTweetDetails({ ...tweetDetails, is_liked: true, like_count: tweetDetails.like_count + 1 })
            try {
                likeTweet({ variables: { tweetId: tweetDetails._id } })
            } catch (error) {
                setTweetDetails({ ...tweetDetails, is_liked: false, like_count: tweetDetails.like_count - 1 })
            }
        }
    }

    const handleBookmark = async (e: any) => {
        e.preventDefault()

        if (tweetDetails.is_bookmarked) {
            setTweetDetails({ ...tweetDetails, is_bookmarked: false, bookmark_count: tweetDetails.bookmark_count - 1 })
            try {
                unbookmarkTweet({ variables: { tweetId: tweetDetails._id } })
            } catch (error) {
                setTweetDetails({ ...tweetDetails, is_bookmarked: true, bookmark_count: tweetDetails.bookmark_count + 1 })
            }
        }
        else {
            setTweetDetails({ ...tweetDetails, is_bookmarked: true, bookmark_count: tweetDetails.bookmark_count + 1 })
            try {
                bookmarkTweet({ variables: { tweetId: tweetDetails._id } })
            } catch (error) {
                setTweetDetails({ ...tweetDetails, is_bookmarked: false, bookmark_count: tweetDetails.bookmark_count - 1 })
            }
        }
    }

    const handleRetweet = async (e: any) => {
        e.preventDefault()

        if(tweetDetails.is_retweeted) {
            setTweetDetails({ ...tweetDetails, is_retweeted: false, retweet_count: tweetDetails.retweet_count - 1 });
            setRetweetModal(false);
            try {
                await undoRetweetTweet({ variables: { tweetId: tweetDetails._id } })
            } catch (error) {
                setTweetDetails({ ...tweetDetails, is_retweeted: true, retweet_count: tweetDetails.retweet_count + 1 })
            }
        }
        else {
            setTweetDetails({ ...tweetDetails, is_retweeted: true, retweet_count: tweetDetails.retweet_count + 1 });
            setRetweetModal(false);
            try {
                await retweetTweet({ variables: { tweetId: tweetDetails._id } })
            } catch (error) {
                setTweetDetails({ ...tweetDetails, is_retweeted: false, retweet_count: tweetDetails.retweet_count - 1 })
            }
        }
    }

    const handleRetweetModal = (e: any) => {
        e.preventDefault()
        setY(e.clientY)
        setRetweetModal(true)
    }

    useEffect(()=> {
        const handleOutsideClick = (event: any) => {
            if (retweetModal && !event.target.closest('.retweet-modal-content')) {
                setRetweetModal(false)
            }
        };
        window.addEventListener('click', handleOutsideClick);

        return () => {
            window.removeEventListener('click', handleOutsideClick);
        };
    }, [retweetModal])

    return (
        <div className={`w-full flex items-center justify-between ${detailed ? "px-3 border-y border-white/20 py-1 my-2" : ""}`}>
            <div className="relative w-4/5 flex justify-between items-center">
                <div className="flex items-center hover:text-[#1c9bf1ff]">
                    <div className="icon-hover group">
                        <FaRegCommentAlt className={`text-lg opacity-75`} />
                    </div>
                    &nbsp;
                    <p className={`group-hover:text-[#1c9bf1ff]`}>{tweetDetails.reply_count}</p>
                </div>
                <div className="retweet-modal-content flex items-center group-hover:text-[#01bb7cff]">
                    <div className="icon-hover hover:bg-[#01bb7cff]/10 relative" onClick={handleRetweetModal}>
                        <FaRetweet className={`text-xl opacity-75 hover:text-[#01bb7cff] group-hover:opacity-100 
                        transition-all ${tweetDetails.is_retweeted ? "text-[#01bb7cff]" : ""}`} />
                    </div>
                    &nbsp;
                    <p className={`group-hover:text-[#01bb7cff]`}>{tweetDetails.retweet_count + tweetDetails.quotetweet_count}</p>
                </div>
                {
                    retweetModal && 
                    <div className={`retweet-modal-content absolute left-28 shadow-[0_3px_10px_rgb(255,255,255,0.2)] border border-white/20
                     bg-black z-10 rounded-xl ${ y > 150 ? "-top-12" : "top-2"}`}>
                        <div onClick={handleRetweet} className="px-3 pt-3 p-1 hover:bg-white/5 transition-all duration-75 cursor-pointer flex gap-x-2 items-center">
                            <FaRetweet/> {tweetDetails.is_retweeted ? "Undo Retweet" : "Retweet"}
                        </div>
                        <div className="px-3 pb-3 p-1 hover:bg-white/5 transition-all duration-75 cursor-pointer flex gap-x-2 items-center">
                            <PiPencilSimpleLineBold/> Quote
                        </div>
                    </div>
                }
                <div className="flex items-center hover:text-[#f91880ff]">
                    <div className="icon-hover group hover:bg-[#f91880ff]/10">
                        {
                            tweetDetails.is_liked ? <FaHeart onClick={handleLike} className={`text-xl text-[#f91880ff]`} /> :
                            <FaRegHeart onClick={handleLike} className={`text-xl opacity-75`} />
                        }
                    </div>
                    &nbsp;
                    <p className={`group-hover:text-[#f91880ff]`}>{tweetDetails.like_count}</p>
                </div>
                {
                    detailed ? (
                        <div className="flex items-center group">
                            <div className="icon-hover hover:text-[#1c9bf1ff]">
                                {
                                    tweetDetails.is_bookmarked ? <GoBookmarkFill onClick={handleBookmark} className={`text-xl text-[#1c9bf1ff]`} /> :
                                    <GoBookmark onClick={handleBookmark} className={`text-xl opacity-75`} />
                                }
                            </div>
                            &nbsp;
                            <p className={`group-hover:text-[#1c9bf1ff]`}>{tweetDetails.bookmark_count}</p>
                        </div>
                    ):
                    (
                        <div className="flex items-center group">
                            <div className="icon-hover hover:text-[#1c9bf1ff]">
                                <VscListFlat className={`text-lg text-slate-300/50 -rotate-90`} />
                            </div>
                            &nbsp;
                            <p>{tweetDetails.views_count}</p>
                        </div>
                    )
                }
            </div>
            <div className="icon-hover">
                <LuShare className={`text-xl`} />
            </div>
        </div>
    )
}

export default TweetInteractions