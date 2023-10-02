"use client"
import { formatTimeAgo } from '@/services/timeFormat'
import { chatObjectTypeDef } from '@/services/typeDefs'
import { gql } from '@apollo/client'
import { useSuspenseQuery } from '@apollo/experimental-nextjs-app-support/ssr'
import Image from 'next/image'
import React, { use, useEffect, useRef, useState } from 'react'
import { Socket } from 'socket.io-client'

const ChatsPage = ({ conversationId, userId, socket }: { conversationId: string, userId: string, socket: Socket }) => {
    const dummy = useRef<HTMLSpanElement>(null)
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
        socket.on("receive_message", (data) => {
            console.log(data)
            //@ts-ignore
            setChats((prev) => [...prev, data]);
        })
    }, [socket])

    useEffect(()=>{
        if(data) {
            //@ts-ignore
            setChats(data?.userChatMessages)
        }
        console.log(chats)
    }, [data])

    useEffect(()=>{
        dummy?.current?.scrollIntoView({ behavior: 'smooth' })
    }, [chats])

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
                        <div className={` max-w-sm p-1.5 px-3 rounded-xl ${chat.sender_id === userId ? "bg-[#1d9af1] rounded-br-sm" : "bg-[#2f3237] rounded-bl-sm"}`}>
                            {chat.text}
                            {chat.files && chat.files.map((file, index) => (
                                <Image
                                    src={file}
                                    alt="Picture of the author"
                                    width={700}
                                    height={700}
                                    className="rounded-md object-cover py-1"
                                    key={index}
                                />
                            ))}
                            
                        </div>
                        <p className={`w-full ${chat.sender_id === userId ? "text-end" : "text-start"} text-slate-200/75 text-sm py-0.5`}>
                            {formatTimeAgo(chat.created_at)}
                        </p>
                    </div>
                </div>
            ))
            }
            {/* @ts-ignore */}
            <span ref={dummy}></span>
       </>
    )
}

export default ChatsPage;