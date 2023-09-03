import { gql } from "@apollo/client";
import { getClient } from "@/lib/graphql/client";

const mutation = gql`
  mutation Mutation($email: String!, $name: String!, $username: String!) {
  registerWidhAuthenticatedProvider(email: $email, name: $name, username: $username) {
    _id
    bio
    blue
    createdAt
    email
    name
    token
    username
  }
}
`

export const useAuthenticatedProviderRegister = async (email: string, name: string, username: string) => {
  console.log(email, name, username)
    const {data, errors} = await getClient().mutate({
      mutation, 
      variables:{
        email,
        name,
        username
      }
  })
    console.log(errors)
    return {
        data,
        errors
    }
}