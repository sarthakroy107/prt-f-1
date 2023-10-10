/* eslint-disable react-hooks/rules-of-hooks */
"use client";
import Conversations from "@/components/message-page/Conversations";
import { conversationTypeDef } from "@/services/typeDefs";
import { gql } from "@apollo/client";
import { useSuspenseQuery } from "@apollo/experimental-nextjs-app-support/ssr";
import { ChangeEvent, useCallback, useEffect, useMemo, useState } from "react";
import { io } from "socket.io-client";
import { RiMailAddLine } from "react-icons/ri";
import debounce from "lodash.debounce";

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
  const { data } = useSuspenseQuery(query)
  const [conversations, setConversation] = useState<conversationTypeDef[] | null>(null)
  const [searchbarVisible, setSearchbarVisible] = useState<boolean>(true)
  const [searchString, setSearchString] = useState<string>("")
  
  let count = 0;
  socket.on("autocomplete_profile_search_results", (data: any) => {
    console.log(data)
  })
  const getResults = debounce((searchString: string) => {
    console.log(searchString)
    socket.emit("autocomplete_profile_search", searchString)
  }, 500)
  const debounceRequest = useCallback((searchString: string)=> {
    getResults(searchString)
  }, [])


  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    //console.log(e.target.value)
    setSearchString(e.target.value)
    debounceRequest(e.target.value)
  }

  useEffect(() => {
    //@ts-ignore
    if(data) setConversation(data.userChats);
  }, [data])

  if(!conversations) {
    return <div>Loading...</div>
  }

  return (
    <>
      <div className="w-full flex justify-between items-center bg-black backdrop-blur-sm p-4 px-9 text-3xl font-bold sticky top-0 z-10">
        <p>Messages</p>
        {
          searchbarVisible ? (
           <div className="relative">
              <input placeholder="Search" onChange={onChange} value={searchString}
              className="w-56 bg-[#212227] p-2 px-3 h-9 text-sm font-normal opacity-80 rounded-full outline-none"/>
              <div className="w-96 h-56 mt-3 bg-black  absolute rounded-xl -left-40 border border-[#1d9bf0]/80">
              </div>
           </div>
          ) : (
            <div onClick={() => setSearchbarVisible(true)}
            className="p-2 rounded-full hover:bg-slate-100/10 transition-all duration-75 cursor-pointer">
              <RiMailAddLine className="text-2xl"/>
            </div>
            )
        }
      </div>
      {
        conversations.map((conversation, index)=> (
          <Conversations key={index} conversation={conversation}/>
        ))
      }
    </>
  )
}

export default page