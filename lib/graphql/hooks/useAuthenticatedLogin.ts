import { gql } from "@apollo/client";
import { getClient } from "@/lib/graphql/client";

const mutation = gql`
  mutation AuthWidhAuthenticatedProvider($email: String!) {
    authWidhAuthenticatedProvider(email: $email) {
      _id
      bio
      blue
      createdAt
      email
      name
      password
      profileImageUrl
      token
      updatedAt
    }
  }
`

export const useAuthenticatedLogin = async (email: string) => {
  console.log(email)
    const {data, errors} = await getClient().mutate({
      mutation, 
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