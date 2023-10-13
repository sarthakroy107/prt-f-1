"use client";
import { conversationTypeDef } from "@/services/typeDefs";
import { ReactNode, createContext, useContext, useState } from "react";


export const UserContext = createContext<any>(null);

export default function UserContextProvider({children} : {children: ReactNode}): ReactNode {
    const [userDetais, setUserDetails] = useState(null);
    const [tweetModalActive, setTweetModalActive] = useState(false);
    const [conversationsContext, setConversationsContext] = useState<any[] | null>(null)
    
    return (
        <UserContext.Provider value={{userDetais, tweetModalActive, conversationsContext, setUserDetails, setTweetModalActive, setConversationsContext}}>
            {children}
        </UserContext.Provider>
    )
}

export function useUserContext() {
    const user =  useContext(UserContext);
    if(!user) throw new Error("useUserContext must be used within UserContextProvider or user is null");

    return user;
}