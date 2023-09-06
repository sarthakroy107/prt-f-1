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

export function ApolloWrapper({ children }: React.PropsWithChildren) {

    const {data: session} = useSession();
    console.log(session)
    
    function makeClient() {
      const httpLink = new HttpLink({
          uri: "http://localhost:8000/graphql",
          headers: {
            Authorization: "Bearer my-access-token",
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