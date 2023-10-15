import TweetInteractions from './TweetInteractions'
import { responseTweetDetailsType } from '@/services/typeDefs'
import Image from 'next/image'

const MainTweetBody = ({tweetDetails}:{tweetDetails: responseTweetDetailsType}) => {
  return (
    <>
          <div className="w-full h-2">
        <div className="h-2 w-[13.5%]  flex items-center justify-center">
          <div className="h-2 w-1 bg-[#323739]"></div>
          </div>
        <div className=" h-2 w-[86%]"></div>
      </div>
      <div className="px-5 w-full">
        <div className="flex items-center gap-x-3">
          <div className="h-12 w-12 rounded-full overflow-hidden">
            <Image
              src={tweetDetails.author_profile_image} 
              width={50} height={50} 
              alt="profile image"
              className=" object-cover h-12 w-12" 
              draggable={false}
            />
          </div>
          <div>
            <p className="font-bold">{tweetDetails.author_display_name}</p>
            <p className="text-gray-500">@{tweetDetails.author_username}</p>
          </div>
        </div>
        <div className="w-full  py-3">
          <p>{tweetDetails.text}</p>
          <div className={`w-full grid grid-cols-2 grid-rows-2 gap-1 rounded-2xl overflow-hidden
            ${ tweetDetails.files!.length > 0 ? "mt-3" : "" }`}>
              {
                tweetDetails.files!.map((image: string, index: number)=> (
                    <Image quality={100} key={index} className={`w-full object-cover 
                    ${index === 0 &&  tweetDetails.files!.length === 3? "row-span-2 h-full" : tweetDetails.files!.length === 2 ? "row-span-2 h-full" :
                    tweetDetails.files!.length === 1 ? "row-span-2 col-span-2 h-full" : "h-28"}`} 
                    src={image} width={200} height={200} alt="profile image"/>
                ))
              }
          </div>
        </div>
        <div className="w-full flex gap-x-2  text-[#70767a]">
          <p>
          {
            new Date(Number(tweetDetails.created_at)).toLocaleString([], { hour: '2-digit', minute: '2-digit', year: "numeric", month: "short", day: "numeric"}).split(",")[1]
          }
          </p>
          &middot;
          <p>
          {
            new Date(Number(tweetDetails.created_at)).toLocaleString([], { hour: '2-digit', minute: '2-digit', year: "numeric", month: "short", day: "numeric"}).split(",")[0]
          }
          </p>
          &middot;
          <p className="text-white font-semibold">{tweetDetails.views_count}</p>
          views
        </div>
        <TweetInteractions tweet={tweetDetails} />
      </div>
    </>
  )
}

export default MainTweetBody