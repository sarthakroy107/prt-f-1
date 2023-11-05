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
    in_reply: boolean
    in_reply_to: string | null
}

const CreateTweet = ({ in_reply, in_reply_to }: { in_reply: boolean, in_reply_to: string | null }) => {

    const { register, handleSubmit, watch, setValue } = useForm<createTweetProps>();
    const mutation = gql`
        mutation Mutation($text: String, $files: [String], $in_reply: Boolean, $in_reply_to: String) {
            createTweet(text: $text, files: $files, in_reply: $in_reply, in_reply_to: $in_reply_to) {
                _id           
                author_display_name
                author_username
                author_profile_image
                text
                files
                is_liked
                like_count
                is_retweeted
                retweet_count
                quotetweet_count
                reply_count
                is_sensitive
                in_reply
                in_reply_to_tweet_id
                in_reply_to_user_id
                in_reply_to_username
                created_at
                updated_at
                views_count
                is_following
                is_bookmarked
                bookmark_count
                is_blue
            }
        }
    `

    const watchText: string = watch("text", "");
    const [inputActive, setInputActive] = useState<boolean>(false)

    const user = useUserContext();
    const { tweetModalActive, setTweetModalActive } = useContext(UserContext)
    //console.log(user)

    const [uploadImages, setUploadImages] = useState<File[]>([]);
    const fileUploadRef = useRef<HTMLInputElement>(null);
    const [createTweet] = useMutation(mutation)

    const onSubmit = async (data: any) => {
        try {
            let filesArr: string[] = []
            if (uploadImages.length > 0) {
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
            }
            data.files = filesArr
            if(in_reply && in_reply_to !== null) {
                data.in_reply = true
                data.in_reply_to = in_reply_to
            }
            else {
                data.in_reply = false
                data.in_reply_to = null
            }
            console.log(data)
            const newReply = await createTweet({
                variables: data
            })
            console.log(newReply)
            setTweetModalActive(false);
            setInputActive(false);
            setValue("text", "");
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


    if (!user) {
        return (
            <div>Loading...</div>
        )
    }

    return (
        <>
            <div className='flex gap-4 w-full'>
                <Image
                    src={user.profile_image}
                    width={60}
                    height={60}
                    className='rounded-full h-10 w-[7%] object-cover'
                    alt='profile image'
                />
                <form className='w-[85%] mt-1'>
                    <textarea onClick={()=> setInputActive(true)}
                        placeholder={`${in_reply ? "Tweet your reply" : "What's happening?"}`}
                        className={`w-full bg-transparent font-normal text-md resize-y outline-none ${in_reply ? "" : "h-56"}`}
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
                                <RxCross1 onClick={() => {
                                    setUploadImages(uploadImages.filter((_, i) => i !== index))
                                }}
                                    className="font-semibold" />
                            </div>
                        </div>
                    ))}
                </div>
            )}
            {!in_reply && <hr className='opacity-30 m-1 mr-3' />}
            {
                (!in_reply || inputActive) && (
                    <div className='w-full flex items-center justify-between'>
                        <div className='flex items-center m-1'>
                            <div onClick={() => { fileUploadRef.current?.click(); console.log("clicked") }}
                                className="group p-2 rounded-full hover:bg-[#1d9af1]/20 transition-all duration-150 cursor-pointer">
                                <LiaImageSolid className="h-6 w-6 text-[#1d9af1] transition-all duration-150" />
                                <input
                                    type="file"
                                    multiple
                                    ref={fileUploadRef}
                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                        if (e.target.files) {
                                            let fileArray: File[] = [...uploadImages];
                                            for (const file of e.target.files) {
                                                if (uploadImages.length < 4 && fileArray.length < 4) fileArray.push(file);;
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
                            <div className='w-7 h-7'>
                                <CircularProgressbar value={watchText.length} maxValue={180}
                                    text={`${watchText.length < 160 ? "" : watchText.length > 180 ? `-${watchText.length - 180}` : `${180 - watchText.length}`}`}
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
                )
            }
        </>
    )
}

export default CreateTweet