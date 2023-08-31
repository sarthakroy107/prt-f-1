import NextAuth from "next-auth/next";

declare module 'next-auth' {
    interface Session {
        user: {
            id: string;
            profileImageUrl: string;
            bio: string;
            blue: boolean;
            token: string;
            createdAt: string;
            bannerUrl: string;
            bio: string
        } & Session['user']
    }
}