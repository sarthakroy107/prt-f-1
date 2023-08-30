/* eslint-disable react-hooks/rules-of-hooks */
import NextAuth, { NextAuthOptions } from "next-auth"
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials"
import User from "@/mongoose_models/User";
import bcrypt from 'bcrypt';
import connect from "@/mongoose_models/config/mongo.config";
import { gql } from "@apollo/client";
import { getClient } from "@/lib/graphql/client";
import { useUserLoginGQLServer } from "@/lib/graphql/hooks/userLogingql";


connect();

const query = gql`
  query Query($email: String!, $password: String!) {
    userLogin(email: $email, password: $password) {
      _id
      bio
      blue
      createdAt
      email
      name
      profileImageUrl
      token
      updatedAt
      password
    }
  }
`

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
        console.log(data.userLogin)
        //const user = await User.findOne({ email: credentials?.email })
        const user = data.userLogin;
        //console.log(user)
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
      session.user.token = token;
      return session;
    },
  },

}
const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }