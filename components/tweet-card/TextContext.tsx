"use client"

import { fullUserDetailssType } from "@/services/typeDefs";
import { gql } from "@apollo/client";
import { useSuspenseQuery } from "@apollo/experimental-nextjs-app-support/ssr";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

type dataType = {
  fetchUserDetailsWithUsername: fullUserDetailssType;
}

//! Part-1: Base logic using regex------------------------->

const TextContext = ({text}: {text: string | null}) => {
  
  if(text === null) {
    return <div></div>
  }
  const getJSX = () => {
    const parts = text.split(/((?:#|@)[a-zA-Z0-9_-]+)/).filter((s) => s.length);
    return parts.map((part, index: number) => {
      if (part.startsWith("@")) {
        return <UserProfileModal key={index} username={part.slice(1, part.length)} />
      } else if (part.startsWith("#")) {
        return <span key={index} style={{ color: "green" }}>{part}</span>;
      } else {

        return part;
      }
    });
  };

  return <div className="px-2 flex gap-1">{getJSX()}</div>;

}



//!Part-2: Api call------------------------->

const UserProfileModal = ({username}: {username: string}) => {
  const [modalOpen, setModalOpen] = useState<boolean>(false)
  const [y, setY] = useState<number>(0)

  const [hoverTimeout, setHoverTimeout] = useState<NodeJS.Timeout | null>(null)

  const handleMouseEnter = (e: any) => {
    console.log("handleMouseEnter")
    setY(e.clientY)
    setHoverTimeout( setTimeout(() => {
      setModalOpen(true)
      console.log(modalOpen)
    }, 500))
    console.log(hoverTimeout)
  }

  const handleMouseLeave = (e: any) => {
    console.log("handleMouseLeave")
    console.log(hoverTimeout)
    if(hoverTimeout) {
      console.log("clearTimeout")
      clearTimeout(hoverTimeout)
    }
    setModalOpen(false)
  }

  const handleModalHover = () => {
    setModalOpen(true)
  }

  const handleModalOut = () => {
    setModalOpen(false)
  }

  return (
    <div className="relative">
      <p onMouseOver={handleMouseEnter} onMouseOut={handleMouseLeave} className="text-[#1d9bf0]">@{username}</p>
      {modalOpen && (
        <div onMouseOver={handleModalHover} onMouseOut={handleModalOut} onClick={(e)=>{e.preventDefault()}}
          className={`bg-black border border-blue-500/50 w-72 p-4 shadow-[0_3px_10px_rgb(0,0,0,0.2)] rounded-[0.95rem] absolute z-10 ${ y > 150 ? "-top-32" : "top-6"}`}>
            <AcoountDetailsModal username={username} />
          </div>)}
    </div>
  )
}

//! Part-3: Actual modal------------------------>
const AcoountDetailsModal = ({username}: {username: string}) => {
  console.log(username)

  const query = gql`
    query ExampleQuery($username: String!) {
      fetchUserDetailsWithUsername(username: $username) {
        id
        name
        email
        username
        profile_image
        banner
        blue
        bio
        tweet_count
        reply_count
        follower_count
        following_count
        createdAt
      }
    }
  `

  const { data }: { data: dataType } =  useSuspenseQuery(query, { variables: { username } })
  console.log(data)

  if(data === null || data === undefined) {
    return <div>Loading...</div>
  }
  return (
    <>
      <div className='w-full flex gap-x-4 mb-5'>
        <Link href={`/${data.fetchUserDetailsWithUsername.username}`}>
          <Image src={data.fetchUserDetailsWithUsername.profile_image} width={50} height={50} alt='image' className='h-14 w-14 rounded-full object-cover'/>
        </Link>
        <Link href={`/${data.fetchUserDetailsWithUsername.username}`}>
          <p className='text-lg font-bold'>{data.fetchUserDetailsWithUsername.name}</p>
          <p className='opacity-75'>@{data.fetchUserDetailsWithUsername.username}</p>
        </Link>
      </div>
      {
        data === null || data === undefined ? (<div>Loading</div>) : (
        <>
          {
            data.fetchUserDetailsWithUsername.bio !== null && data.fetchUserDetailsWithUsername.bio !== undefined && (
              <p className='w-full h-10'>
                {data.fetchUserDetailsWithUsername.bio.length > 45 ? data.fetchUserDetailsWithUsername.bio.slice(0, 45) + "..." : data.fetchUserDetailsWithUsername.bio}
              </p>
            )
          }
          <div className='flex gap-x-3 opacity-60'>
            <p>Followers: {data.fetchUserDetailsWithUsername.follower_count}</p>
            <p>Following: {data.fetchUserDetailsWithUsername.following_count}</p>
          </div>
        </>
        )
      }
    </>
  )
}
export default TextContext