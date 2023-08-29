import NextAuth, { NextAuthOptions } from "next-auth"
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials"
import User from "@/mongoose_models/User";
import bcrypt from 'bcrypt';
import connect from "@/mongoose_models/config/mongo.config";

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
  // jwt: {
  //   secret: process.env.NEXT_AUTH_JWT_SECRET
  // },
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60 // 30 days
  },
  // callbacks: {
  //   async session({ session, token }) {
      
  //     session.user.id = token.id
  //     const dbAccount = await User.findById(session.user.id);
  //     session.user.profileImageUrl = dbAccount.profileImageUrl;
  //     session.user.bio = dbAccount.bio;
  //     session.user.blue = dbAccount.blue;
  //     session.user.token = token.accessToken

  //     //console.log(session.user)
      
  //     return session
  //   },
  //   async jwt({ token, account, user }) {
  //     // Persist the OAuth access_token and or the user id to the token right after signin
  //     console.log("Account: ", account)
  //     if (account) {
  //       token.accessToken = account.access_token
  //       console.log("Access token", token.accessToken)
  //       token.id = user.id
  //     }
  //     return token
  //   }
  // },
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