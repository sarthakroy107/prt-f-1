/* eslint-disable react-hooks/rules-of-hooks */
"use client";
import Conversations from "@/components/message-page/Conversations";
import { conversationTypeDef } from "@/services/typeDefs";
import { gql } from "@apollo/client";
import { useSuspenseQuery } from "@apollo/experimental-nextjs-app-support/ssr";
import { useEffect, useState } from "react";
import { io } from "socket.io-client";

const socket = io("http://localhost:8000")


const page = () => {

  const query = gql`
    query Query {
      userChats {
        conversation_id
        to_user_id
        to_user_display_name
        to_user_profile_image
        to_user_blue
        to_user_username
        from_user_id
        latest_message_text
        latest_message_files
        latest_message_date
      }
    }
  `
  const [conversations, setConversation] = useState<conversationTypeDef | null>(null)

  const { data } = useSuspenseQuery(query)
  //@ts-ignore
  console.log(conversations)

  useEffect(() => {
    //@ts-ignore
    if(data) setConversation(data.userChats);
  }, [data])

  if(!conversations) {
    return <div>Loading...</div>
  }

  return (
    <>
      <div className="w-full bg-black  backdrop-blur-sm p-4 px-9 text-3xl font-bold sticky top-0 z-10">
        Messages
      </div>
      <Conversations conversation={conversations}/>
    </>
  )
}

export default page