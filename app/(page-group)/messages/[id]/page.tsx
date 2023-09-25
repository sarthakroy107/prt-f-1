"use client"
import { chat_sender_TypeDef } from "@/services/typeDefs"
import { gql } from "@apollo/client"
import { useSuspenseQuery } from "@apollo/experimental-nextjs-app-support/ssr"
import Image from "next/image"
import { useParams } from "next/navigation"
import { useEffect, useState } from "react"
import { HiOutlineArrowSmallLeft } from "react-icons/hi2"
import { LiaImageSolid } from 'react-icons/lia'
import { MdOutlineGifBox } from 'react-icons/md'
import { BsEmojiSmile } from 'react-icons/bs'
import { BiSend } from 'react-icons/bi'
import ChatsPage from "@/components/message-page/ChatsPage"


const Page = () => {

  const params = useParams()
  const [conversation, setConversation] = useState<chat_sender_TypeDef | null>(null)
  const query = gql`
    query Query($conversationId: String!) {
      specificUserConversationDetails(conversationId: $conversationId) {
        conversation_id
        to_user_id
        to_user_display_name
        to_user_profile_image
        to_user_blue
        to_user_username
        from_user_id
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
      setConversation(data?.specificUserConversationDetails!)
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
        <p className="text-xl font-semibold hover:underline cursor-pointer">{conversation.to_user_display_name}</p>
        <p className="text-sm text-slate-100/50">@{conversation.to_user_username}</p>
      </div>
    </div>
    <div className="h-[86%] overflow-auto scrollbar-hide text-white">
      <ChatsPage userId={conversation.from_user_id} conversationId={conversation.conversation_id}/>
    </div>
    <div className="sticky bottom-0 border-t border-white/30 h-[7%] gap-x-1 flex items-center px-8">
      <div className="group p-2 rounded-full hover:bg-[#1d9af1]/20 transition-all duration-150">
        <LiaImageSolid className="h-6 w-6 text-[#1d9af1] transition-all duration-150"/>
      </div>
      <div className="group p-2 rounded-full hover:bg-[#1d9af1]/20 transition-all duration-150">
        <MdOutlineGifBox className="h-6 w-6 text-[#1d9af1] transition-all duration-150"/>
      </div>
      <div className="group p-2 rounded-full hover:bg-[#1d9af1]/20 transition-all duration-150">
        <BsEmojiSmile className="h-5 w-5 text-[#1d9af1] transition-all duration-150"/>
      </div>
      <input 
      type="text" 
      placeholder="Start a new message"
      className="rounded-full p-2 px-4 bg-[#202327] outline-none w-2/3 mx-4"
      />
      <div className="group p-2 rounded-full hover:bg-[#1d9af1]/20 transition-all duration-150">
        <BiSend className="h-6 w-6 text-[#1d9af1] transition-all duration-150"/>
      </div>
    </div>
   </main>
  )
}

export default Page