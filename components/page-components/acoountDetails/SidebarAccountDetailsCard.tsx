"use client"
import { useContext, useEffect, useState } from 'react'
import { gql } from '@apollo/client'
import { useSuspenseQuery } from '@apollo/experimental-nextjs-app-support/ssr'
import { BsThreeDots } from 'react-icons/bs'
import { signOut } from 'next-auth/react'
import { MdVerified } from 'react-icons/md'
import { useCookies } from 'next-client-cookies'
import { UserContext } from '@/lib/contextApi/UserContext'
import Image from 'next/image'

export const SidebarAccountDetailsCard = ({ email }: { email: string }) => {

    const { setUserDetails } = useContext(UserContext);

    const cookie = useCookies();
    
    const query = gql`
        query Query($email: String!) {
            fetchUserDetailsWithEmail(email: $email) {
                name
                username
                profile_image
                banner
                blue
                tweet_count
                createdAt
                follower_count
                following_count
            }
        }
    `

    const { data }: { data: any } = useSuspenseQuery(query, { variables: { email }, context: { Headers: "Hello" } })

    //console.log(data.fetchUserDetailsWithEmail);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [user, setUser] = useState<any>(null)

    const handleSignOut = () => {
        cookie.remove("token");
        signOut()
    }

    useEffect(() => {
        const handleOutsideClick = (event: any) => {
            if (isModalOpen && !event.target.closest('.modal-content')) {
                setIsModalOpen(false)
            }
        };
        window.addEventListener('click', handleOutsideClick);

        return () => {
            window.removeEventListener('click', handleOutsideClick);
        };
    }, [isModalOpen])

    useEffect(() => {
        if (data !== undefined || data !== null) {
            setUser(data.fetchUserDetailsWithEmail)
            setUserDetails(data.fetchUserDetailsWithEmail)
        }
    }, [data])


    if (email === null || email === undefined) {
        return (
            <div>
                Email not found
            </div>
        )
    }

    if (data === undefined || data === null) {
        return (
            <div className='p-7 bg-white'>
                Loading...
            </div>
        )
    }
    //console.log(user)

    return (
        <>
            {/* <Link href={'/profile'}> */}
            <div className='w-fit p-2 flex rounded-full items-center gap-3 hover:bg-slate-100/10 transition-all duration-200'>
                <Image className='rounded-full w-11 h-11 object-cover'
                    src={data.fetchUserDetailsWithEmail.profile_image}
                    width={100}
                    height={100}
                    alt='ProfileImage'
                />
                <div className='text-sm'>
                    <div className='flex gap-1'>
                        {data.fetchUserDetailsWithEmail.name.length > 9 ? (<>{data.fetchUserDetailsWithEmail.name.substr(0, 8) + "..."}</>) :
                            (<>{data.fetchUserDetailsWithEmail.name}</>)} {data.fetchUserDetailsWithEmail.blue ? (<><MdVerified className="text-blue-500" /></>) : (<></>)}
                    </div>
                    <p className='opacity-75 font-normal'>{data.fetchUserDetailsWithEmail.username}</p>
                </div>
                <div onClick={() => setIsModalOpen(!isModalOpen)}
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