"use client"
import { formatTimeAgo } from '@/services/timeFormat'
import { chatObjectTypeDef } from '@/services/typeDefs'
import { gql } from '@apollo/client'
import { useSuspenseQuery } from '@apollo/experimental-nextjs-app-support/ssr'
import React, { useEffect, useState } from 'react'

const ChatsPage = ({ conversationId, userId }: { conversationId: string, userId: string }) => {
    const [chats, setChats] = useState<chatObjectTypeDef[] | null>(null)
    const query = gql`
        query ExampleQuery($conversationId: String!) {
            userChatMessages(conversationId: $conversationId) {
                _id
                sender_id
                text
                files
                created_at
            }
        }

    `
    const { data } = useSuspenseQuery(query, {
        variables: {
            conversationId
        }
    })

    useEffect(()=>{
        if(data) {
            //@ts-ignore
            setChats(data?.userChatMessages)
        }
        console.log(chats)
    }, [data])

    if(!chats) {
        return (
            <div>Loading...</div>
        )
    }

    return (
       <>
        {
            chats.map((chat, index) => (
                <div key={index}
                className={`w-full p-2 px-4 flex ${chat.sender_id === userId ? "justify-end": "justify-start"}`}>
                    <div className='w-fit'>
                        <p className={` w-fit max-w-5xl p-1.5 px-3 rounded-full ${chat.sender_id === userId ? "bg-[#1d9af1] rounded-br-md" : "bg-[#2f3237] rounded-bl-md"}`}>
                            {chat.text}
                        </p>
                        <p className={`w-full ${chat.sender_id === userId ? "text-end" : "text-start"} text-slate-200/75 text-sm py-0.5`}>{formatTimeAgo(chat.created_at)}</p>
                    </div>
                </div>
            ))
        }
       </>
    )
}

export default ChatsPage