import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import {AiFillHome} from 'react-icons/ai'
import { IconType } from 'react-icons'
import ReduxProvider from '@/redux/provider'
import NextAuthProviders from './_lib/nextAuthProvider/provider'
import { ApolloWrapper } from '@/lib/graphql/apollo-wrapper'
import { ClientCookiesProvider } from './_lib/client-cookie-provider/provider'
import { cookies } from 'next/headers';

const inter = Inter({ subsets: ['latin'] })

const image = "https://pbs.twimg.com/profile_images/1658306244577472513/up-Oc-FT_400x400.jpg"


export const metadata: Metadata = {
  icons: {
    icon: image
  },
  title: 'Kawaitter',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className='w-full min-h-screen flex justify-center items-center'>
        <NextAuthProviders>
          <ClientCookiesProvider value={cookies().getAll()}>
            <ApolloWrapper>
              <ReduxProvider>
                {children}
              </ReduxProvider>
            </ApolloWrapper>
          </ClientCookiesProvider>
        </NextAuthProviders>
      </body>
    </html>
  )
}