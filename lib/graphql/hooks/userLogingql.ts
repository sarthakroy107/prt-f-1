import { gql } from "@apollo/client";
import { getClient } from "@/lib/graphql/client";

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

export const useUserLoginGQLServer = async (email: string, password: string) => {
    const {data, errors} = await getClient().query({
        query, 
        variables:{
          email, password
        }
    })
    return {
        data,
        errors
    }
}