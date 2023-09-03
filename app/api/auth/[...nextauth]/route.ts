/* eslint-disable react-hooks/rules-of-hooks */
import NextAuth, { NextAuthOptions } from "next-auth"
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import SpotifyProvider from "next-auth/providers/spotify";
import CredentialsProvider from "next-auth/providers/credentials"
import { useUserLoginGQLServer } from "@/lib/graphql/hooks/userLogingql";
import { useAuthenticatedLogin } from "@/lib/graphql/hooks/useAuthenticatedLogin";
import { useCredentialRegister } from "@/lib/graphql/hooks/useCredentialRegister";
import { getCookies } from 'next-client-cookies/server';
import { useAmp } from "next/amp";
import { useAuthenticatedProviderRegister } from "@/lib/graphql/hooks/useAuthenticatedProviderRegister";


export const authOptions: NextAuthOptions = {

  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
    }),

    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string
    }),

    SpotifyProvider({
      authorization: 'https://accounts.spotify.com/authorize?scope=user-read-email,playlist-read-private',
      clientId: process.env.SPOTIFY_CLIENT_ID as string,
      clientSecret: process.env.SPOTIFY_CLIENT_SECRET as string
    }),

    CredentialsProvider({

      name: 'credentials',
      credentials: {
        email: { label: "Username", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
        username: { label: "Username", type: "text" },
        name: { label: "Name", type: "text" }
      },
      async authorize(credentials) {
        console.log("BEFORE USER VERIFICATION")
        console.log(credentials)

        if((credentials?.username === null || credentials?.username === undefined) 
        && (credentials?.name === null || credentials?.name === undefined)) {
          console.log("Logging with user credentials")
          const {data} = await useUserLoginGQLServer(credentials?.email as string, credentials?.password as string)
          console.log("Data: ", data)
          const user = data.userLogin;
          return user
        }
        else {
          try {
            console.log("Creating user with credentials")
            const {data} = await useCredentialRegister(credentials?.email!, credentials?.name!, credentials?.password!, credentials?.username!);
            const newUser = data.registerWithCredentialsAuthentication;
            console.log(newUser)
            return newUser;

          } catch (error) {
            console.log(error)
            return null
          }
        }        
      }
    })
  ],

  secret: process.env.SECRET,

  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60 // 30 days
  },

  callbacks: {
    async jwt({ token, user }) {
      
      console.log("JWT user: ", user)
      return {...token, ...user};
    },
    async session({ session, token, user }) {
      session.user.token = token.token;
      session.user.bio = token.bio;
      session.user.profileImageUrl = token.profileImageUrl;
      return session;
    },
    async signIn({user, account, profile, email, credentials}) {

      console.log("User: ", user);
      console.log("Account: ", account);
      console.log("Profile", profile);
      console.log("Email: ", email);
      console.log("Credentials", credentials);
      console.log("User: ", user);
      console.log("Account: ", account);
      console.log("Profile", profile);
      console.log("Email: ", email);
      console.log("Credentials", credentials);

      const cookies = getCookies();
      const username = cookies.get('username')
      console.log("Username: ", username)

      if(account?.provider === 'google' || account?.provider === 'github' || account?.provider === 'spotify') {

        console.log(user?.email, user?.name);

        if(username !== undefined && username !== null && username.length > 0) {
          console.log("Creating user in NextAuth");
          const newUser = await useAuthenticatedProviderRegister(user?.email!, user.name!, username);
          console.log(newUser)
        }
        else {
          const hello = await useAuthenticatedLogin(profile?.email!, profile?.name!)
          console.log(hello)
        }

        cookies.remove('username')
      }
        
      return true
    }
  },

}
const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }