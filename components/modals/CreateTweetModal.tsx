/* eslint-disable react-hooks/exhaustive-deps */
"use client"
import { useContext, useEffect, useRef, useState } from 'react'
import { UserContext, useUserContext } from '@/lib/contextApi/UserContext'
import { useForm } from 'react-hook-form';
import { RxCross1 } from 'react-icons/rx'
import { gql, useMutation } from '@apollo/client';
import 'react-circular-progressbar/dist/styles.css';
import supabase from '@/lib/supabase';
import CreateTweet from '../DetailedTweets/CreateTweet';

type createTweetProps = {
  text: string
  files: string[]
  userId: string
}

const CreateTweetModal = () => {
  
  const { register, handleSubmit, watch } = useForm<createTweetProps>();
  const mutation = gql`
   mutation Mutation($text: String, $files: [String]) {
    createTweet(text: $text, files: $files) {
      _id
      in_reply_to_tweet_id
      text
      files
      author_id
      likes
      replies
      retweets
      quotetweets
      hastags
      private
      possibly_sensitive
      viewsCount
      createdAt
      updatedAt
      in_reply
      in_reply_to_user_id {
          _id
          bio
          blue
          name
          username
      }
    }
  }`

  const watchText: string = watch("text", "");
  
  const user = useUserContext();
  const { tweetModalActive, setTweetModalActive } = useContext(UserContext)
  console.log(user)
  
  const [ uploadImages, setUploadImages ] = useState<File[]>([]);
  const fileUploadRef = useRef<HTMLInputElement>(null);
  const [createTweet] = useMutation(mutation)

  const onSubmit = async (data: any) => {
    try {
      let filesArr: string[] = []
      if(uploadImages.length > 0) {
        for (const file of uploadImages) {
          try {
            const date: string = Date.now().toString();
            const { data } = await supabase.storage.
              from("project_images").  //@ts-ignore
              upload(`images/tweets/${file.name}-${date}`, file as File)
            console.log(data)
            filesArr.push(`https://gpdgnvimnjscaiqmhbqr.supabase.co/storage/v1/object/public/project_images/${data!.path}`)
          } catch (error) {
            console.log(error)
          }
        }
        data.files = filesArr
      }
      console.log(data)
      createTweet({
        variables: data
      })
      setTweetModalActive(false)
    } catch (error) {
      console.log(error)
    }
  }

  const handleOutsideClick = (event: any) => {
    if (tweetModalActive && !event.target.closest('.tweet-modal')) {
      setTweetModalActive(false);
    }
  };

  
  useEffect(() => {
    document.addEventListener('click', handleOutsideClick);
  
    return () => {
      document.removeEventListener('click', handleOutsideClick);
    };
  }, [tweetModalActive]);
   

  if(!user) {
    return (
      <div>Loading...</div>
    )
  }
  
  return (
    <div className="tweet-modal w-[30%] top-0 border border-white/50 px-4 pt-4 pb-2 mt-9 relative -left-16 rounded-xl h-fit bg-black text-white">
      <div onClick={() => { setTweetModalActive(false) }}
      className='p-1 hover:bg-slate-100/10 transition-all duration-75 w-fit h-fit mb-4 rounded-full cursor-pointer'>
        <RxCross1 className="font-semibold"/>
      </div>
      <CreateTweet in_reply={false} in_reply_to={null}/>
    </div>
  )
}

export default CreateTweetModal