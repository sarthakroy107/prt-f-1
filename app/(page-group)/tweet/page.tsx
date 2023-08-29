import { getClient } from "../../../lib/graphql/client";

import { gql } from "@apollo/client";

// const query = gql`
//     query {
//         characters {
//             results {
//                 id
//                 name
//                 image
//             }
//         }
//     }
// `
const query = gql`
    query Query {
    fetchUsers {
        _id
        bio
        blue
        createdAt
        email
        likes
        name
        password
        profileImageUrl
        updatedAt
    }
}
`

export default async function Page() {
    const {loading, data} = await getClient().query({ query })
    console.log(data)
    if(loading) return <main>Loading..</main>
    return <main className="text-white">{data.fetchUsers[0].email}</main>;
}