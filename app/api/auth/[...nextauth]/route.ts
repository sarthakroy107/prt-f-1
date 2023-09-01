/* eslint-disable react-hooks/rules-of-hooks */
import NextAuth, { NextAuthOptions } from "next-auth"
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials"
import bcrypt from 'bcrypt';
import { gql } from "@apollo/client";
import { useUserLoginGQLServer } from "@/lib/graphql/hooks/userLogingql";
import axios from "axios";
import { useAuthenticatedLogin } from "@/lib/graphql/hooks/useAuthenticatedLogin";
import { useCredentialRegister } from "@/lib/graphql/hooks/useCredentialRegister";


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
    CredentialsProvider({

      name: 'credentials',
      credentials: {
        email: { label: "Username", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
        username: { label: "Username", type: "text" }
      },
      async authorize(credentials) {
        console.log("BEFORE USER VERIFICATION")
        console.log(credentials)
        if(credentials?.username === null) {
          const {data} = await useUserLoginGQLServer(credentials?.email as string, credentials?.password as string)
          const user = data.userLogin;
          return user
        }
        else {
          const {data} = await useCredentialRegister(credentials?.email!, credentials?.username!, credentials?.password!);
          const user = data.registerWithAuthentication;
          return user;
        }
        
        // const userData = await axios({
        //   method:'post',
        //   url:'http://localhost:8000/api/v1/login',
        //   data: {
        //     email: credentials?.email,
        //     password: credentials?.password
        //   }
        // })
        //console.log(userData)
        
        return null
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
      
      return {...token, ...user};
    },
    async session({ session, token, user }) {
      session.user.token = token.token;
      session.user.bio = token.bio;
      session.user.profileImageUrl = token.profileImageUrl;
      return session;
    },
    async signIn({user, account, profile, email, credentials}) {
      console.log("BEFORE USER VERIFICATION")
        
      if(account?.provider === 'google' || account?.provider === 'github') {
        console.log(profile?.email, profile?.name)
        const hello = await useAuthenticatedLogin(profile?.email!, profile?.name!)
        console.log(hello)
      }
        
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
      return true
    }
  },

}
const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }