"use client"
import { formatTimeAgo } from "@/services/timeFormat"
import { conversationTypeDef } from "@/services/typeDefs"
import Image from "next/image"
import Link from "next/link"

const Conversations = ({conversation}: {conversation: conversationTypeDef}) => {
  return (
    <Link href={`/messages/${conversation.conversation_id}`}>
      <div className="w-full border-b border-white/20 p-3 flex hover:bg-slate-50/10 transition-all duration-200 cursor-pointer">
        <div className="w-[15%] px-1">
            <Image
            width={150}
            height={150}
            src={conversation.to_user_profile_image}
            alt="profile_image"
            className="rounded-full w-16 h-16 object-cover"
            />
        </div>
        <div>
           <div className="flex gap-2">
            <p className="text-xl font-semibold">{conversation.to_user_display_name}</p>
            <p className="relative -top-2 text-2xl font-bold text-slate-100/30">.</p>
            <p className="text-lg text-slate-100/50 font-light">{formatTimeAgo(conversation.latest_message_date)}</p>
           </div>
           <p>
            {
              conversation.latest_message_text !== null ? conversation.latest_message_text : "Message received"
            }
           </p>
        </div>
      </div>
    </Link>
  )
}

export default Conversations