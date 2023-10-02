"use client"
import { chat_sender_TypeDef } from "@/services/typeDefs"
import { gql } from "@apollo/client"
import { useSuspenseQuery } from "@apollo/experimental-nextjs-app-support/ssr"
import { useParams } from "next/navigation"
import { ChangeEvent, useEffect, useRef, useState } from "react"
import { HiOutlineArrowSmallLeft } from "react-icons/hi2"
import { LiaImageSolid } from 'react-icons/lia'
import { MdOutlineGifBox } from 'react-icons/md'
import { BsEmojiSmile } from 'react-icons/bs'
import { BiSend } from 'react-icons/bi'
import { io } from "socket.io-client"
import { useForm } from "react-hook-form"
import   Image from "next/image"
import   ChatsPage from "@/components/message-page/ChatsPage"
import supabase from "@/lib/supabase"

interface chatInput {
  text: string | null
  files: string[] | null
  conversationId: string
  senderId: string
}


const Page = () => {

  const params = useParams()
  const fileInputRef = useRef<HTMLInputElement>(null)
  const { register, handleSubmit, watch, setValue } = useForm<chatInput>()
  const [conversation, setConversation] = useState<chat_sender_TypeDef | null>(null)
  const [inputFiles, setInputFiles] = useState<File[] | File | null>(null)

  const watchText = watch("text")
  const watchFiles = watch("files")

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

  const socket  = io("http://localhost:8000")

  const onSubmit = async (data: chatInput) => {
    
    try {
      if(conversation != null) {
        let filesArr: string[] = [];
        if(inputFiles != null) {
          try {
            const date: string = Date.now().toString();
            const { data } = await supabase.storage.
            from("project_images").  //@ts-ignore
            upload(`images/${conversation.conversation_id}/${inputFiles.name}-${date}`, inputFiles as File)
            console.log(data)
            filesArr.push(`https://gpdgnvimnjscaiqmhbqr.supabase.co/storage/v1/object/public/project_images/${data!.path}`)
          } catch (error) {
            console.log("Error in supabase fileupload: " + error)
          }
        }
        data.conversationId = conversation.conversation_id
        data.senderId = conversation.from_user_id
        data.files = filesArr;
        console.log(data)
        socket.emit("send_message", data)
        setValue("text", "")
        data.files = null
      }
      else {
        throw new Error("conversation is null")
      }
    } catch (error) {
      console.log(error)
    }
  }


  useEffect(()=>{
    if(data) {
      //@ts-ignore
      setConversation(data?.specificUserConversationDetails!)
      socket.emit("join_room", conversation?.conversation_id )
      
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
      <ChatsPage userId={conversation.from_user_id} conversationId={conversation.conversation_id} socket={socket}/>
    </div>
    <form onSubmit={handleSubmit(onSubmit)}
    className="sticky bottom-0 border-t border-white/30 h-[7%] gap-x-1 flex items-center px-8">
      <div onClick={() => {fileInputRef.current?.click(); console.log("clicked")}}
      className="group p-2 rounded-full hover:bg-[#1d9af1]/20 transition-all duration-150">
        <input 
          accept=".jpg .jpeg .png .gif .webp"
          onChange={(e: ChangeEvent<HTMLInputElement>) => {if(e.target.files) {setInputFiles(e.target.files[0] as File); console.log(e.target.files[0])}}}
          type="file" 
          className="hidden" 
          ref={fileInputRef}/>
        <LiaImageSolid className="h-6 w-6 text-[#1d9af1] transition-all duration-150"/>
      </div>
      
      <div className="group p-2 rounded-full hover:bg-[#1d9af1]/20 transition-all duration-150">
        <MdOutlineGifBox className="h-6 w-6 text-[#1d9af1] transition-all duration-150"/>
      </div>
      <div className="group p-2 rounded-full hover:bg-[#1d9af1]/20 transition-all duration-150">
        <BsEmojiSmile className="h-5 w-5 text-[#1d9af1] transition-all duration-150"/>
      </div>
      <input {...register("text")}
      type="text" 
      placeholder="Start a new message"
      className="rounded-full p-2 px-4 bg-[#202327] outline-none w-2/3 mx-4"
      />
      <button disabled={(watchText == null || watchText == "") && watchFiles == null}
      className={`group p-2 rounded-full transition-all duration-150 ${(watchText == null || watchText == "") && watchFiles == null ? "" : "hover:bg-[#1d9af1]/20"}`}>
        <BiSend className={`h-6 w-6 transition-all duration-150 ${(watchText == null || watchText == "") && watchFiles == null ? "text-slate-100/50" : "text-[#1d9af1]"}`}/>
      </button>
    </form>
   </main>
  )
}

export default Page