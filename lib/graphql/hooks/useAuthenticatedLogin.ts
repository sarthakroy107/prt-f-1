import { gql } from "@apollo/client";
import { getClient } from "@/lib/graphql/client";

const mutation = gql`
  mutation Mutation($email: String!, $name: String!) {
    authWidhAuthenticatedProvider(email: $email, name: $name) {
      _id
      bio
      blue
      createdAt
      email
      name
    }
  }

`

export const useAuthenticatedLogin = async (email: string, name: string) => {
  console.log(email)
    const {data, errors} = await getClient().mutate({
      mutation, 
      variables:{
        email,
        name
      }
  })
    console.log(errors)
    return {
        data,
        errors
    }
}