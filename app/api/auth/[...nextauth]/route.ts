import NextAuth, { NextAuthOptions } from "next-auth"
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials"
import User from "@/mongoose_models/User";
import bcrypt from 'bcrypt';
import connect from "@/mongoose_models/config/mongo.config";
import { Session } from "inspector";

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

      name: 'credentials',
      credentials: {
        email: { label: "Username", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        console.log("BEFORE USER VERIFICATION")
        const user = await User.findOne({ email: credentials?.email })
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
    async session({ session, token }) {
      
      session.user.id = token.id
      const dbAccount = await User.findById(session.user.id);
      session.user.profileImageUrl = dbAccount.profileImageUrl;
      session.user.bio = dbAccount.bio;
      session.user.blue = dbAccount.blue;

      console.log(session.user)
      
      return session
    },
    async jwt({ token, account, user }) {
      // Persist the OAuth access_token and or the user id to the token right after signin
      if (account) {
      
        token.accessToken = account.access_token
        token.id = user.id
      }
      return token
    }
  },
}
const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }