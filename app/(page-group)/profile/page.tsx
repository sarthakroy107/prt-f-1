/* eslint-disable react-hooks/rules-of-hooks */
"use client";

export const dynamic = "force-dynamic";

import { gql } from "@apollo/client";
import { useSuspenseQuery } from "@apollo/experimental-nextjs-app-support/ssr";

const query = gql`
  query {
  fetchUsers {
    _id
    bio
    blue
    createdAt
    email
    name
    token
  }
}
`

export default function PollPage() {
  const { data } = useSuspenseQuery(query);

  return <div>{JSON.stringify(data)}</div>;
};