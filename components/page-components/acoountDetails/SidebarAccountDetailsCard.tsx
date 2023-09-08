"use client"
import { gql, useMutation } from '@apollo/client'
import { useSuspenseQuery } from '@apollo/experimental-nextjs-app-support/ssr'
import Image from 'next/image'
import { BsThreeDots } from 'react-icons/bs'
import { useEffect, useState } from 'react'
import React from 'react'
import { signOut } from 'next-auth/react'
import { MdVerified } from 'react-icons/md'
import { useCookies } from 'next-client-cookies'

export const SidebarAccountDetailsCard = ({ email }: { email: string }) => {
    const cookie = useCookies();
    console.log(email)
    const query = gql`
        query Query($email: String!) {
            fetchUserDetailsWithEmail(email: $email) {
                name
                username
                profileImageUrl
                banner
                blue
                tweetCount
                createdAt
                followersCount
                followingCount
            }
        }
    `
    const { data }: { data: any } = useSuspenseQuery(query, { variables: { email }, context: { Headers: "Hello"}})

    console.log(data.fetchUserDetailsWithEmail);

    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleSignOut = () => {
        cookie.remove("token");
        signOut()
    }

    useEffect(()=> {
        const handleOutsideClick = (event:any) => {
            if (isModalOpen && !event.target.closest('.modal-content')) {
              setIsModalOpen(false)
            }
          };
      
          // Add event listener when the component mounts
          window.addEventListener('click', handleOutsideClick);
      
          // Remove event listener when the component unmounts
          return () => {
            window.removeEventListener('click', handleOutsideClick);
          };
    }, [isModalOpen])


    if (email === null || email === undefined) {
        return (
            <div>
                Email not found
            </div>
        )
    }

    return (
        <>
            {/* <Link href={'/profile'}> */}
            <div className='w-fit p-2 flex rounded-full items-center gap-3 hover:bg-slate-100/10 transition-all duration-200'>
                <Image className='rounded-full w-11 h-11 object-cover'
                    src={data.fetchUserDetailsWithEmail.profileImageUrl}
                    width={100}
                    height={100}
                    alt='ProfileImage'
                />
                <div className='text-sm'>
                    <div className='flex gap-1'>
                        {data.fetchUserDetailsWithEmail.name.length > 9 ? (<>{data.fetchUserDetailsWithEmail.name.substr(0,8) +  "..."}</>) : 
                        (<>{data.fetchUserDetailsWithEmail.name}</>)} {data.fetchUserDetailsWithEmail.blue ? (<><MdVerified className="text-blue-500"/></>) : (<></>)}
                    </div>
                    <p className='opacity-75 font-normal'>{data.fetchUserDetailsWithEmail.username}</p>
                </div>
                <div onClick={()=> setIsModalOpen(!isModalOpen)}
                    className='modal-content group p-[0.30rem] px-1 rounded-full hover:bg-slate-100/20 cursor-pointer hover:backdrop-blur-md transition-all duration-50'>
                    <BsThreeDots />
                </div>
                <div onClick={handleSignOut} className={`modal-content fixed h-12 w-32 bottom-24 left-96 ${isModalOpen ? "visible" : "invisible"}
              border border-white/75 flex justify-center items-center rounded-md transition-all duration-200 cursor-pointer 
              hover:bg-slate-100/10 backdrop-blur-lg`}>
                    Logout
                </div>
            </div>
            {/* </Link> */}
        </>
    )
}