import { gql } from "@apollo/client";
import { getClient } from "@/lib/graphql/client";

const query = gql`
  query Query($email: String!) {
    loginWidhAuthenticatedProvider(email: $email) {
      _id
      name
      email
      password
      username
      profileImageUrl
      bio
      blue
      createdAt
      updatedAt
      token
    }
  }

`

export const useAuthenticatedLogin = async (email: string) => {
  console.log(email)
    const {data, errors} = await getClient().query({
      query, 
      variables:{
        email
      }
  })
    console.log(errors)
    return {
        data,
        errors
    }
}