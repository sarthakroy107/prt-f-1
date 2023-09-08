"use client";

import {
  ApolloClient,
  ApolloLink,
  HttpLink,
} from "@apollo/client";
import {
  ApolloNextAppProvider,
  NextSSRApolloClient,
  NextSSRInMemoryCache,
  SSRMultipartLink,
} from "@apollo/experimental-nextjs-app-support/ssr";
import { useSession } from "next-auth/react";
import { useCookies } from "next-client-cookies";

export function ApolloWrapper({ children }: React.PropsWithChildren) {

    const cookie = useCookies();
    const token = cookie.get("token");
    console.log(token)
    const {data: session} = useSession();
    console.log(session?.user.token)
    
    function makeClient() {
      const httpLink = new HttpLink({
          uri: "http://localhost:8000/graphql",
          headers: {
            Authorization: token as string,
          },
      });
      return new NextSSRApolloClient({
        cache: new NextSSRInMemoryCache(),
        link:
          typeof window === "undefined"
            ? ApolloLink.from([
                new SSRMultipartLink({
                  stripDefer: true,
                }),
                httpLink,
              ])
            : httpLink,
      });
    }

    return (
      <ApolloNextAppProvider makeClient={makeClient}>
        {children}
      </ApolloNextAppProvider>
    );
  }