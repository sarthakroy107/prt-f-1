import { gql } from "@apollo/client";
import { getClient } from "@/lib/graphql/client";

const mutation = gql`
  mutation Mutation($email: String!, $name: String!, $password: String!, $username: String!) {
    registerWithCredentialsAuthentication(email: $email, name: $name, password: $password, username: $username) {
      _id
      bio
      blue
      createdAt
      email
      name
      password
      token
      username
      profileImageUrl
    }
  }
`

export const useCredentialRegister = async (email: string, name: string, password: string, username: string) => {
  console.log("registerWithCredentialsAuthentication: ", email, name, password, username)
    const {data, errors} = await getClient().mutate({
      mutation, 
      variables:{
        email,
        name,
        password,
        username
      }
  })
    return {
        data,
        errors
    }
}