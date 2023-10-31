"use client"
import { HiOutlineArrowSmallLeft } from 'react-icons/hi2'
import { HiOutlineDotsHorizontal } from 'react-icons/hi'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import SearchPeople from '@/components/page-components/SearchPeople'
import Searchbar from '@/components/page-components/Searchbar'
import SearchTopTweets from '@/components/page-components/SearchTopTweets'
import SearchMediaTweets from '@/components/page-components/SearchMediaTweets'
import SearchLatestTweets from '@/components/page-components/SearchLatestTweets'

const Page = ({ searchParams }: { searchParams: any}) => {
  const router = useRouter();

  useEffect(()=>{

  }, [searchParams])

  return (
    <div>
      <div className='w-full flex gap-x-2 items-center justify-center'>
        <div className='icon-hover'>
          <HiOutlineArrowSmallLeft className="text-2xl"/>
        </div>
        <div className='w-4/5'><Searchbar text={searchParams.q}/></div>
        <div className='icon-hover'>
          <HiOutlineDotsHorizontal className="text-2xl"/>
        </div>
      </div>
      <div className='border-b border-white/30 w-full flex justify-around font-semibold'>
        <div onClick={()=>router.push(`/search?q=${searchParams.q}&s=top`)} className=' cursor-pointer'>
          <div>
            Top
            <div className={`w-full h-[0.20rem] mt-2 rounded-md ${ searchParams.s === "top"? "bg-blue-500" : ""}`}></div>
          </div>
        </div>
        <div onClick={()=>router.push(`/search?q=${searchParams.q}&s=latest`)} className=' cursor-pointer'>
          <div>
            Latest
            <div className={`w-full h-[0.20rem] mt-2 rounded-md ${ searchParams.s === "latest" ? "bg-blue-500" : ""}`}></div>
          </div>
        </div>
        <div onClick={()=>router.push(`/search?q=${searchParams.q}&s=people`)} className=' cursor-pointer'>
          <div>
            People
            <div className={`w-full h-[0.20rem] mt-2 rounded-md ${ searchParams.s === "people" ? "bg-blue-500" : ""}`}></div>
          </div>
        </div>
        <div onClick={()=>router.push(`/search?q=${searchParams.q}&s=media`)} className=' cursor-pointer'>
          <div>
            Media
            <div className={`w-full h-[0.20rem] mt-2 rounded-md ${ searchParams.s === "media" ? "bg-blue-500" : ""}`}></div>
          </div>
        </div>
      </div>
      {
        searchParams.s === "people" ? <SearchPeople query={searchParams.q}/> : 
        searchParams.s === "Media"  ? <SearchMediaTweets query={searchParams.q}/> : 
        searchParams.s === "latest" ? <SearchLatestTweets query={searchParams.q}/> : 
        <SearchTopTweets query={searchParams.q}/>
      }
    </div>
  )
}

export default Page