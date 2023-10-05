"use client"
import React, { useContext, useEffect, useRef, useState } from 'react'
import { useUserContext } from '@/lib/contextApi/UserContext'
import Image from 'next/image';
import { useForm } from 'react-hook-form';
import { BsEmojiSmile } from 'react-icons/bs';
import { LiaImageSolid } from 'react-icons/lia';
import { MdOutlineGifBox } from 'react-icons/md';
import { RxCross1 } from 'react-icons/rx'

type createTweetProps = {
  text: string
  files: string[]
  userId: string
}

const CreateTweetModal = () => {
  const user = useUserContext();
  const { register, handleSubmit, watch, setValue } = useForm();
  const [uploadImages, setUploadImages] = useState<File[]>([]);
  const fileUploadRef = useRef<HTMLInputElement>(null)

  useEffect(()=>{

  }, [uploadImages])

  if( !user || !user.userDetais) {
    return (
      <div>Loading...</div>
    )
  }
  
  return (
    <div className='w-[30%] top-0 border border-white/50 px-4 pt-4 pb-2 mt-9 relative -left-16 rounded-xl h-fit bg-black text-white'>
      <div className='p-1 hover:bg-slate-100/10 transition-all duration-75 w-fit h-fit mb-4 rounded-full cursor-pointer'>
        <RxCross1 className="font-semibold"/>
      </div>
      <div className='flex gap-4 w-full'>
        <Image
          src={user.userDetais.profileImageUrl}
          width={60}
          height={60}
          className='rounded-full h-10 w-[7%] object-cover' 
          alt='profile image'
        />
        <form className='w-[85%]'>
          <textarea placeholder='What is happening?!' className='w-full bg-transparent h-56 font-normal text-md outline-none'></textarea>
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
              <div className='absolute top-0 right-0 p-1 rounded-full bg-black/30 transition-all duration-75 w-fit h-fit mb-4 mr-1 mt-1 cursor-pointer'>
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
        <button className='px-3 p-1 rounded-full h-fit bg-[#1d9af1]'>
          Post
        </button>
      </div>
    </div>
  )
}

export default CreateTweetModal