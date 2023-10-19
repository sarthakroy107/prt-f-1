"use client"

import { autocomplete_search_results } from "@/services/typeDefs"
import { gql } from "@apollo/client"
import { useSuspenseQuery } from "@apollo/experimental-nextjs-app-support/ssr"
import debounce from "lodash.debounce"
import { ChangeEvent, useCallback, useState } from "react"
import { BiSearch } from "react-icons/bi"
import { FaRegTimesCircle } from "react-icons/fa"
import SearchAndHoverAccount from "../modals/SeachAndHoverAccount"

type graphqlQueryType = {
  autoCompleteUser: autocomplete_search_results[]
}

const query = gql`
  query ExampleQuery($searchString: String!) {
    autoCompleteUser(searchString: $searchString) {
      _id
      name
      username
      profileImageUrl
      blue
    }
  }
`

const Searchbar = () => {

  const [searchString, setSearchString] = useState<string>("")

  const { data, fetchMore }: {data: graphqlQueryType | null, fetchMore: any} = useSuspenseQuery(query, {
    variables: {
      searchString
    }
  })
  const getResults = debounce((searchString: string) => {
    console.log(searchString)
    if(searchString.length > 2) {
      fetchMore({
        variables: {
          searchString
        }
      })
    }
  }, 500)

  const debounceRequest = useCallback((searchString: string)=> {
    getResults(searchString)
  }, [])

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchString(e.target.value)
    debounceRequest(e.target.value)
  }

  return (
    <div  className="p-2 py-4 bg-black sticky top-0 z-10">
      <div className="group w-[20rem] rounded-full bg-[#212326] flex items-center gap-x-2 focus-within:border focus-within:border-[#1f9af0] p-2 px-4 relative">
        <BiSearch className="opacity-60 text-2xl group-focus-within:text-[#1f9af0] group-focus-within:opacity-100"/>
        <input value={searchString} onChange={onChange} type="text" className="bg-transparent w-4/5 outline-none" placeholder="Search"/>
        {
          searchString.length > 0 && (
            <FaRegTimesCircle onClick={(e: any)=> {setSearchString(""); e.target.value = ""}} className="text-xl hover:cursor-pointer text-[#1f9af0]"/>
          )
        }
      </div>
      {
        searchString.length > 2 && (
          <div className="w-full bg-black py-1 min-h-56 absolute top-[4.5rem] z-10 shadow-[0_3px_10px_rgb(255,255,255,0.2)] rounded-md overflow-hidden">
            {
              data && data.autoCompleteUser && data.autoCompleteUser.map((user: autocomplete_search_results, index: number) => (
                <SearchAndHoverAccount key={index} details={user} messagePage={false}/>
              ))
            }
          </div>
        )
      }
    </div>
  )
}

export default Searchbar