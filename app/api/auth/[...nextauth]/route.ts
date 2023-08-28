import NextAuth, { NextAuthOptions } from "next-auth"
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials"
import User from "@/mongoose_models/User";
import bcrypt from 'bcrypt';
import connect from "@/mongoose_models/config/db";

connect();

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
        
        name: 'Credentials',
        credentials: {
          email: { label: "Username", type: "text", placeholder: "jsmith" },
          password: { label: "Password", type: "password" }
        },
        async authorize(credentials) {
          console.log("BEFORE USER VERIFICATION")
          const user = await User.findOne({email: credentials?.email})
          console.log(user)
          if(await bcrypt.compare(credentials?.password as string, user?.password)) {
            return user
          }
          return null
        }
      })
  ],
}
const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }