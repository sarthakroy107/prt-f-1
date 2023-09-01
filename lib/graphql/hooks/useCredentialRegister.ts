import { gql } from "@apollo/client";
import { getClient } from "@/lib/graphql/client";

const mutation = gql`
  mutation Mutation($email: String!, $name: String!, $password: String!) {
    registerWithAuthentication(email: $email, name: $name, password: $password) {
        _id
        bio
        blue
        createdAt
        email
        name
        password
        token
    }
}
`

export const useCredentialRegister = async (email: string, name: string, password: string) => {
  console.log(email)
    const {data, errors} = await getClient().mutate({
      mutation, 
      variables:{
        email,
        name,
        password
      }
  })
    console.log(errors)
    return {
        data,
        errors
    }
}