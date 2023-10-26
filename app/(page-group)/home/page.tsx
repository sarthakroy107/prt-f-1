"use client"
import AllTweets from "@/components/home-page/AllTweets"
import FollowingTweet from "@/components/home-page/FollowingTweet"
import { useState } from "react"

const Page = () => {
    const [option, setOption] = useState("all")
  return (
    <main className="">
        <section className="w-full border-b border-white/20 sticky top-0 z-20">
            <h2 className="font-bold text-xl p-2 px-3 bg-black/80 backdrop-blur-sm">Home</h2>
            <div className="w-full flex">
                <div className="header-card w-1/2 bg-black/80 backdrop-blur-sm" onClick={()=> setOption("all")}>
                    <div>
                        For you
                        <div className={`w-full h-[0.20rem] mt-2 ${option === "all" ? "bg-blue-500" : ""} rounded-md`}></div>
                    </div>
                </div>
                <div className="header-card w-1/2 bg-black/80 backdrop-blur-sm" onClick={()=> setOption("following")}>
                   <div>
                        Following
                        <div className={`w-full h-[0.20rem] mt-2 ${option === 'following' ? "bg-blue-500" : ""} rounded-md`}></div>
                   </div>
                </div>
            </div>
        </section>
        {
            option === "all" ? (<AllTweets/>) : (<FollowingTweet/>)
        }
    </main>
  )
}

export default Page