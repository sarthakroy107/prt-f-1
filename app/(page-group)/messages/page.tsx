/* eslint-disable react-hooks/rules-of-hooks */
"use client";
import Conversations from "@/components/message-page/Conversations";
import { autocomplete_search_results, conversationTypeDef } from "@/services/typeDefs";
import { gql } from "@apollo/client";
import { useSuspenseQuery } from "@apollo/experimental-nextjs-app-support/ssr";
import { ChangeEvent, useCallback, useEffect, useState } from "react";
import { io } from "socket.io-client";
import { RiMailAddLine } from "react-icons/ri";
import debounce from "lodash.debounce";
import SeachAndHoverAccount from "@/components/modals/SeachAndHoverAccount";
import { UserContext, useUserContext } from "@/lib/contextApi/UserContext";


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
  const [searchAutoResults, setAutoSearchResults] = useState<autocomplete_search_results[] | null>(null)

  const user = useUserContext();
  
  socket.on("autocomplete_profile_search_results", (data: autocomplete_search_results[] | null) => {
    if(data !== null ) setAutoSearchResults(data);
  })
  const getResults = debounce((searchString: string) => {
    console.log(searchString)
    if(searchString.length > 2) {
      socket.emit("autocomplete_profile_search", {searchString})
    }
  }, 500)
  const debounceRequest = useCallback((searchString: string)=> {
    getResults(searchString)
  }, [])


  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchString(e.target.value)
    debounceRequest(e.target.value)
  }

  useEffect(() => {
    if(data) {
      //@ts-ignore
      setConversation(data.userChats);
    }
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
              {
                searchString.length > 2 ? (
                  <div className="w-80 max-h-64 mt-3 bg-black  absolute rounded-xl -left-24 border border-[#1d9bf0]/80 overflow-auto">
                    {
                      searchAutoResults && searchAutoResults.length > 0 ?  searchAutoResults.map((result, index) => (
                        <SeachAndHoverAccount key={index} details={result} messagePage={true}/>
                      )) : (
                        <div className="w-full h-full flex justify-center items-center py-1">
                          <i className="text-white/75 text-lg">No results found</i>
                        </div>
                      )
                    }
                  </div>
                ) : null
              }
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