"use client"
import { chatDetailsTypeDef } from "@/services/typeDefs"
import { gql } from "@apollo/client"
import { useSuspenseQuery } from "@apollo/experimental-nextjs-app-support/ssr"
import Image from "next/image"
import { useParams } from "next/navigation"
import { useEffect, useState } from "react"
import { HiOutlineArrowSmallLeft } from "react-icons/hi2"


const Page = () => {

  const params = useParams()
  const [conversation, setConversation] = useState<chatDetailsTypeDef | null>(null)
  const query = gql`
    query Query($conversationId: String!) {
      userChatMessages(conversationId: $conversationId) {
        conversation_id
        to_user_id
        to_user_display_name
        to_user_profile_image
        to_user_blue
        to_user_username
        from_user_id
        chats {
          _id
          sender_id
          text
          files
          created_at
        }
      }
    }
  `
  const { data } = useSuspenseQuery(query, {
    variables: {
      conversationId: params.id
      }
    })

  
  

  useEffect(()=>{
    if(data) {
      //@ts-ignore
      setConversation(data.userChatMessages)
    }
    console.log(conversation)
  }, [data])

  if(!conversation) {
    return (
      <p>Loadiing...</p>
    )
  }

  return (
   <main className="h-screen">
    <div className="w-full sticky top-0 z-10 border-b border-gray-200/40 p-3 flex gap-4 items-center bg-black/40 h-[7%]">
      <div className="p-2 hover:bg-slate-50/20 rounded-full transition-all duration-150 cursor-pointer">
        <HiOutlineArrowSmallLeft className="text-2xl font-medium"/>
      </div>
      <div>
        <Image
          src={conversation.to_user_profile_image}
          width={100}
          height={100}
          className="rounded-full w-12 h-12 object-cover"
          draggable={false}
          alt="profile image"
        />
      </div>
      <div className="">
        <p className="text-xl font-semibold">{conversation.to_user_display_name}</p>
        <p className="text-sm text-slate-100/50">@{conversation.to_user_username}</p>
      </div>
    </div>
    <div className="h-[86%] overflow-auto"></div>
    <div className="sticky bottom-0 border-t border-white/50 h-[7%]">
      
    </div>
   </main>
  )
}

export default Page