import NextAuth from "next-auth/next";

declare module 'next-auth' {
    interface Session {
        user: {
            id: string;
            profileImageUrl: string;
            bio: string;
            blue: boolean;
        } & Session['user']
    }
}