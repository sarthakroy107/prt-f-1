// import { ApolloClient, InMemoryCache, ApolloProvider, HttpLink, gql } from '@apollo/client';
// import {
//   NextSSRInMemoryCache,
//   NextSSRApolloClient,
// } from "@apollo/experimental-nextjs-app-support/ssr";
// import { registerApolloClient } from "@apollo/experimental-nextjs-app-support/rsc";

// export const { getClient } = registerApolloClient(() => {
//   return new NextSSRApolloClient({
//     cache: new NextSSRInMemoryCache(),
//     link: new HttpLink({
//       uri: "https://main--spacex-l4uc6p.apollographos.net/graphql",
//     }),
//   });
// });

import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";
import {
  NextSSRInMemoryCache,
  NextSSRApolloClient,
} from "@apollo/experimental-nextjs-app-support/ssr";
import { registerApolloClient } from "@apollo/experimental-nextjs-app-support/rsc";

export const { getClient } = registerApolloClient(() => {
  return new NextSSRApolloClient({
    cache: new NextSSRInMemoryCache(),
    link: new HttpLink({
      // https://studio.apollographql.com/public/spacex-l4uc6p/
      uri: "http://localhost:8000/graphql",
      // you can disable result caching here if you want to
      // (this does not work if you are rendering your page with `export const dynamic = "force-static"`)
      // fetchOptions: { cache: "no-store" },
    }),
  });
});

// let client: ApolloClient<any> | null = null

// export const getClient = () => {
//   if(!client || typeof window === undefined) {
//     client = new ApolloClient({
//       link: new HttpLink({
//         uri: "http://localhost:8000/graphql"
//       }),
//       cache: new InMemoryCache

//     });
//   }

//   return client;
// }

// import { withApollo } from "next-apollo";
// import { ApolloClient, InMemoryCache } from "@apollo/client";

// const apolloClient = new ApolloClient({
//   uri: "https://api.graph.cool/simple/v1/cixmkt2ul01q00122mksg82pn",
//   cache: new InMemoryCache(),
// });

// export default withApollo(apolloClient);


// import { ApolloClient, InMemoryCache } from "@apollo/client";

// const client = new ApolloClient({
//     uri: "http://localhost:8000/graphql",
//     cache: new InMemoryCache(),
// });

// export default client;