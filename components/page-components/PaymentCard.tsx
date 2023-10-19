"use client"

import { useUserContext } from "@/lib/contextApi/UserContext";
import { gql } from "@apollo/client";
import { useSuspenseQuery } from "@apollo/experimental-nextjs-app-support/ssr";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { MdVerified } from "react-icons/md";

type latestUser = {
    latest_user_dispalyname: string
    latest_user_username: string | null
    latest_user_profile_image: string
    latest_user_blue: string | null
    latest_blue_user_dispalyname: string
    latest_blue_user_username: string | null
    latest_blue_user_profile_image: string
    latest_blue_user_blue: string | null
}

type latestUSerCard = {
    latestJoinedUser: latestUser
}

const PaymentCard = () => {
    const user = useUserContext()

    const handlePayment = async (e: any) => {
        e.preventDefault();
        console.log("Payment")
        const { data }: { data: any } = await axios.post('http://localhost:8000/api/v1/payment',
        {
          priceId: 69420.00,
          username: user.username,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
        );
        console.log(data)
        window.location.assign(data.url)
    }

  return (
    <main className="mt-5">
        {
            user && user.blue && (
                <div className=" max-w-[20rem] bg-[#17191c] p-4 px-5 rounded-[1.2rem]">
                    <h3 className="font-bold text-xl">Subscribe to premium</h3>
                    <p className="opacity-75 py-1 font-semibold">Get access to all premium features and blue badge with premium.</p>
                    <button onClick={handlePayment} className='rounded-full w-fit p-2 px-5 mt-2 bg-[#1d9bf0] hover:bg-[#1d9bf0]/90 transition-all font-semibold'>
                        Subscribe
                    </button>
                </div>
            )
        }
        <AccountCard/>
    </main>
  )
}

const AccountCard = () => {

    const query = gql`
        query Query {
            latestJoinedUser {
                latest_user_dispalyname
                latest_user_username
                latest_user_profile_image
                latest_user_blue
                latest_blue_user_dispalyname
                latest_blue_user_username
                latest_blue_user_profile_image
                latest_blue_user_blue
            }
        }

    `
    const { data }: { data: latestUSerCard } = useSuspenseQuery(query)
    console.log(data)

    return (
        <div className="w-[20rem] bg-[#17191c] mt-5 p-5 rounded-[1.2rem]">
            {
               data.latestJoinedUser.latest_blue_user_username && (
                <>
                <h3 className="font-semibold text-xl mb-1">Newest blue user</h3>
                <Link href={`/${data.latestJoinedUser.latest_blue_user_username}`} className="flex gap-x-3 ml-1 px-3 p-2 w-56 rounded-full hover:bg-slate-50/10 transition-all">
                    <Image src={data.latestJoinedUser.latest_blue_user_profile_image} 
                        alt={"profile image"} 
                        width={50} 
                        height={50} 
                        className="h-12 w-12 rounded-full object-cover" 
                    />
                    <div>
                        <div className="flex gap-x-1 items-center">
                            <p className="font-semibold">
                                { data.latestJoinedUser.latest_blue_user_dispalyname.length > 15 ? data.latestJoinedUser.latest_user_dispalyname.slice(0,15) 
                                : data.latestJoinedUser.latest_blue_user_dispalyname }
                            </p>
                            {
                                data.latestJoinedUser.latest_user_blue && (<MdVerified className="text-[#3b82f6]"/>)
                            }
                        </div>
                        <p className="opacity-80">{data.latestJoinedUser.latest_blue_user_username}</p>
                    </div>
                </Link>
                </>
               )
            }
            {
               data.latestJoinedUser.latest_blue_user_username && (
                <>
                <h3 className="font-semibold text-xl my-1">Newest user</h3>
                <Link href={`${data.latestJoinedUser.latest_user_username}`} className="flex gap-x-3 ml-1 px-3 p-2 w-56 rounded-full hover:bg-slate-50/10 transition-all">
                    <Image src={data.latestJoinedUser.latest_user_profile_image} 
                        alt={"profile image"} 
                        width={50} 
                        height={50} 
                        className="h-12 w-12 rounded-full object-cover" 
                    />
                    <div>
                        <div className="flex gap-x-1 items-center">
                            <p className="font-semibold">
                                { data.latestJoinedUser.latest_user_dispalyname.length > 15 ? data.latestJoinedUser.latest_user_dispalyname.slice(0,15) 
                                : data.latestJoinedUser.latest_user_dispalyname }
                            </p>
                            {
                                data.latestJoinedUser.latest_user_blue && (<MdVerified className="text-[#3b82f6]"/>)
                            }
                        </div>
                        <p className="opacity-80">{data.latestJoinedUser.latest_user_username}</p>
                    </div>
                </Link>
                </>
               )
            }
        </div>
    )
}
export default PaymentCard