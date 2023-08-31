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
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        console.log("BEFORE USER VERIFICATION")
        

        const {data} = await useUserLoginGQLServer(credentials?.email as string, credentials?.password as string)
        const userData = await axios({
          method:'post',
          url:'http://localhost:8000/api/v1/login',
          data: {
            email: credentials?.email,
            password: credentials?.password
          }
        })
        console.log(userData)
        
        const user = data.userLogin;
        
        if (await bcrypt.compare(credentials?.password as string, user?.password)) {
          return user
        }
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
        
      if(account?.provider === 'google') {
        // console.log(user?.email)
        const hello = await useAuthenticatedLogin(user?.email!)
        console.log(hello)
      }
        
      // console.log("User: ", user);
      // console.log("Account: ", account);
      // console.log("Profile", profile);
      // console.log("Email: ", email);
      // console.log("Credentials", credentials);
      // console.log("User: ", user);
      // console.log("Account: ", account);
      // console.log("Profile", profile);
      // console.log("Email: ", email);
      // console.log("Credentials", credentials);
      return true
    }
  },

}
const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }