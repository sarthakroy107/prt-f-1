"use client";
import { ReactNode, createContext, useContext, useState } from "react";


export const UserContext = createContext<any>(null);

export default function UserContextProvider({children} : {children: ReactNode}): ReactNode {
    const [userDetais, setUserDetails] = useState(null);
    const [tweetModalActive, setTweetModalActive] = useState(false);
    
    return (
        <UserContext.Provider value={{userDetais, tweetModalActive, setUserDetails, setTweetModalActive}}>
            {children}
        </UserContext.Provider>
    )
}

export function useUserContext() {
    const user =  useContext(UserContext);
    if(!user) throw new Error("useUserContext must be used within UserContextProvider or user is null");

    return user;
}