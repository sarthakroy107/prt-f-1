/* eslint-disable react-hooks/exhaustive-deps */
"use client"
import React, { useContext, useEffect, useRef, useState } from 'react'
import { UserContext, useUserContext } from '@/lib/contextApi/UserContext'
import Image from 'next/image';
import { useForm } from 'react-hook-form';
import { BsEmojiSmile } from 'react-icons/bs';
import { LiaImageSolid } from 'react-icons/lia';
import { MdOutlineGifBox } from 'react-icons/md';
import { RxCross1 } from 'react-icons/rx'
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import supabase from '@/lib/supabase';
import { gql, useMutation } from '@apollo/client';

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
      setTweetModalActive(false)
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
      <div className='flex gap-4 w-full'>
        <Image
          src={user.profileImageUrl}
          width={60}
          height={60}
          className='rounded-full h-10 w-[7%] object-cover' 
          alt='profile image'
        />
        
        <form className='w-[85%]'>
          <textarea 
            placeholder='What is happening?!' 
            className='w-full bg-transparent h-56 font-normal text-md outline-none' 
            {...register("text")}
          />
        </form>
      </div>
      {uploadImages && uploadImages.length > 0 && (
        <div className={`grid w-full gap-2 mb-2 ${uploadImages.length === 1 ? "grid-cols-1" : uploadImages.length === 2 ? "grid-cols-2" : uploadImages.length === 3 ? "grid-cols-2" : "grid-cols-2"}`}>
          {uploadImages && Array.isArray(uploadImages) && uploadImages.map((image, index) => (
            <div key={index} className={`relative ${uploadImages.length === 1 ? "row-span-2 col-span-2 h-80" : uploadImages.length === 2 ? "row-span-2 h-80" : uploadImages.length === 3 && index === 0 ? "row-span-2 h-80" : "col-span-1 h-40"}`}>
              <Image
                src={URL.createObjectURL(image)}
                width={100}
                height={100}
                quality={100}
                className={`rounded-[12px] object-cover w-full h-full`}
                alt='image'
              />
              <div className='tweet-modal absolute top-0 right-0 p-1 rounded-full bg-black/30 transition-all duration-75 w-fit h-fit mb-4 mr-1 mt-1 cursor-pointer'>
                <RxCross1 onClick = {() => {
                  setUploadImages(uploadImages.filter((_, i) => i !== index))
                }}
                className="font-semibold"/>
              </div>
            </div>
          ))}
        </div>
      )}
      <hr className='opacity-30 m-1 mr-3' />
      <div className='w-full flex items-center justify-between'>
        <div className='flex items-center m-1'>
          <div onClick={() => { fileUploadRef.current?.click(); console.log("clicked") }}
          className="group p-2 rounded-full hover:bg-[#1d9af1]/20 transition-all duration-150 cursor-pointer">
            <LiaImageSolid className="h-6 w-6 text-[#1d9af1] transition-all duration-150" />
            <input 
              type="file" 
              multiple 
              ref={fileUploadRef} 
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => 
                {
                  if(e.target.files) {
                    let fileArray: File[] = [...uploadImages];
                    for( const file of e.target.files) {
                      if(uploadImages.length < 4 && fileArray.length < 4) fileArray.push(file);;
                    }
                    console.log(fileArray);
                    setUploadImages(fileArray);
                  }
                }}
              className='hidden'
            />
          </div>
          <div className="group p-2 rounded-full hover:bg-[#1d9af1]/20 transition-all duration-150 cursor-pointer">
            <MdOutlineGifBox className="h-6 w-6 text-[#1d9af1] transition-all duration-150" />
          </div>
          <div className="group p-2 rounded-full hover:bg-[#1d9af1]/20 transition-all duration-150 cursor-pointer">
            <BsEmojiSmile className="h-5 w-5 text-[#1d9af1] transition-all duration-150" />
          </div>
        </div>
        <div className='flex gap-3 items-center'>
        <div  className='w-7 h-7'>
          <CircularProgressbar value={watchText.length} maxValue={180} 
            text={`${watchText.length <160 ? "" : watchText.length > 180 ? `-${watchText.length - 180}` : `${180 - watchText.length}`}`} 
            styles={buildStyles({
              textSize: '36px',
              pathColor: `${watchText.length <= 160 ? '#1d9af1' : watchText.length > 180 ? '#f5212f' : '#ffd501'}`,
              textColor: `${watchText.length <= 160 ? '#1d9af1' : watchText.length > 180 ? '#f5212f' : '#ffd501'}`,
              trailColor: '#d6d6d6',
              pathTransitionDuration: 0.2,
              backgroundColor: '#3e98c7',
            })} 
          />
        </div>
        <button onClick={handleSubmit(onSubmit)}
          disabled={(watchText === null || watchText === "") && uploadImages.length == 0}
          className={`px-3 p-1 rounded-full h-fit transition-all ${(watchText === null || watchText === "") && uploadImages.length == 0 ? "bg-[#1d9af1] opacity-60" : "bg-[#1d9af1]"}`}>
            Post
          </button>
        </div>
      </div>
    </div>
  )
}

export default CreateTweetModal