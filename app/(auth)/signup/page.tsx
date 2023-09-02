/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react/no-unescaped-entities */
"use client"
import axios from 'axios';
import { signIn, useSession } from 'next-auth/react'
import Image from 'next/image'
import { useEffect, useRef, useState } from 'react';
import { ZodType, z } from 'zod';
import {useForm} from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod';
import UsernameCheck from '@/components/buttons/UsernameCheck';
import {FcGoogle} from 'react-icons/fc'
import {FaGithub} from "react-icons/fa"
export const dynamic = "force-dynamic";

type AuthObjFields = {
  email: string,
  password: string
  username: string
}
type formData = {
  name: string,
  username: string,
  email: string,
  password: string,
  confirmPassword: string
}

export default function Page() {

  const schema: ZodType<formData> = z.object({
    name: z.string().min(2).max(25),
    username: z.string().min(4).max(10),
    email: z.string().email(),
    password: z.string().min(6).max(20),
    confirmPassword: z.string().min(6).max(20),
    
    
  }).refine((data)=> data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"]
  });
  
  const { register, handleSubmit, getValues, watch } = useForm<formData>({resolver: zodResolver(schema)})
  
  const {data: session} = useSession();
  const [authObj, setAuthObj] = useState<AuthObjFields>({ email:"", password: "" , username: ""});
  const [usernameAvailable, setUsernameAvailable] = useState<boolean>(false);




  const handleGooglelogIn = () => {
    signIn("google",{
      callbackUrl:'/',
      redirect: true,
      username: authObj.username
      }
    )
  }

  const handleGithublogIn = () => {
    signIn("github",{
      callbackUrl:'/',
      redirect: true
      }
    )
  }

  const submitHandler = (data: formData) => {
    console.log(data)
    console.log(getValues("username"))
  }

  const getUsername = watch("username")

  useEffect(()=>{
    console.log(usernameAvailable)
  }, [usernameAvailable])
  
  return (
    <section className=''>
      <div className="grid grid-cols-1 lg:grid-cols-2 lg:gap-28 items-center max-h-screen">
        <div className="relative h-5/6 flex items-end px-4 pb-10 pt-60 sm:px-6 
        sm:pb-12 md:justify-center lg:px-8 lg:pb-10 bg-gradient-to-t from-black to-white/80 rounded-md">
          <div className="absolute inset-0  m-1 p-1">
            <Image
                width={400}
                height={400}
              className="h-full w-full rounded-md object-cover object-top"
              src="https://c4.wallpaperflare.com/wallpaper/189/710/393/otonari-no-tenshi-sama-shiina-mahiru-anime-girls-ai-art-blonde-hd-wallpaper-preview.jpg"
              alt=""
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent"></div>
          <div className="relative">
            <div className="w-full max-w-xl xl:mx-auto xl:w-full xl:max-w-xl xl:pr-24">
              <h3 className="text-4xl font-bold text-white">
                Kawaiiter
              </h3>
              <ul className="mt-10 grid grid-cols-1 gap-x-8 gap-y-4 sm:grid-cols-2">
                <li className="flex items-center space-x-3">
                  <div className="inline-flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-blue-500">
                    <svg
                      className="h-3.5 w-3.5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                  </div>
                  <span className="text-lg font-medium text-white"> Find what's happening </span>
                </li>
                <li className="flex items-center space-x-3">
                  <div className="inline-flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-blue-500">
                    <svg
                      className="h-3.5 w-3.5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                  </div>
                  <span className="text-lg font-medium text-white"> Connect and share </span>
                </li>
                <li className="flex items-center space-x-3">
                  <div className="inline-flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-blue-500">
                    <svg
                      className="h-3.5 w-3.5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                  </div>
                  <span className="text-lg font-medium text-white"> Free access </span>
                </li>
                <li className="flex items-center space-x-3">
                  <div className="inline-flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-blue-500">
                    <svg
                      className="h-3.5 w-3.5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                  </div>
                  <span className="text-lg font-medium text-white"> Get hot waifu pics </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-center px-4 py-10 sm:px-6 sm:py-16 lg:px-8 lg:py-12 max-h-screen">
          <div className="p-6 px-6 lg:p-12 lg:px-16 border border-white/60 rounded-md lg:w-[75%]">
            <h2 className="text-3xl font-bold leading-tight sm:text-4xl">Sign up</h2>
            <p className="mt-2 text-base text-gray-200">
              Already have an account?{' '}
              <a
                href="#"
                title=""
                className="font-medium text-black transition-all duration-200 hover:underline"
              >
                Sign In
              </a>
            </p>
            <form onSubmit={handleSubmit(submitHandler)}
            action="#" method="POST" className="mt-8">
              <div className={`flex flex-col gap-1 lg:px-5 p-3 backdrop-blur-lg ${usernameAvailable ? "bg-green-500/30" : "bg-slate-200/10"}
              rounded-md border border-transparent hover:border-white/20 transition-all duration-100`}>
                <label className='text-sm opacity-90'>Username</label>
                <div className='flex items-center gap-2'>
                  <input className='w-[75%] bg-black/75 border border-white/20 p-2 rounded-md lg:my-1'
                  type="text" placeholder='ex: @username' {...register("username", { required: true })} />
                  <UsernameCheck username={getUsername} setValue={setUsernameAvailable}/>
                </div>
              </div>
              <div className='border-b border-white/20 scale-105 my-4'></div>
              <div className = "flex flex-col my-1">
                <label className='hidden lg:block text-sm opacity-70'>Name</label>
                <input className=' bg-transparent border border-white/20 p-2 rounded-md my-1' 
                type="text" placeholder='Name' {...register("name")} />
              </div>
              <div className = "flex flex-col my-1">
                <label className='hidden lg:block text-sm opacity-70'>Email</label>
                <input className=' bg-transparent border border-white/20 p-2 rounded-md my-1' 
                type="text" placeholder='Email' {...register("email")} />
              </div>
              <div className='flex flex-col lg:flex-row gap-1 mb-3 lg:gap-4'>
                <div className = "flex flex-col lg:w-1/2">
                  <label className='hidden lg:block text-sm opacity-70'>Password</label>
                  <input className=' bg-transparent border border-white/20 p-2 rounded-md my-1' 
                  type="text" placeholder='Password' {...register("password")} />
                </div>
                <div className = "flex flex-col lg:w-1/2">
                  <label className='hidden lg:block text-sm opacity-70'>Confirm password</label>
                  <input className=' bg-transparent border border-white/20 p-2 rounded-md my-1'
                  type="text" placeholder='Confirm password' {...register("confirmPassword")}/>
                </div>
              </div>
              <button disabled={!usernameAvailable} className={`flex justify-center transition-all duration-200 ${usernameAvailable ? "opacity-100" : "opacity-30"}
              border border-white/50 text-white/80 p-2 rounded-md w-full`}>
                <input type="submit"/>
              </button>
            </form>
            <div className='flex justify-center items-center gap-1 my-1'>
              <div className='border-b w-[45%] border-white/30'></div>
              <div className= "opacity-75">Or</div>
              <div className='border-b w-[45%] border-white/30'></div>
            </div>
            <div className="mt-3 flex justify-center gap-4 items-center">
              <button disabled={!usernameAvailable} className={`flex gap-2 w-2/5 border border-white/20 h-12 p-1 px-2 rounded-full transition-all duration-200
              justify-center items-center hover:border-white/75 ${usernameAvailable ? "opacity-100": "opacity-30"}`}>
                <FcGoogle className=""/>Google
              </button>
              <button disabled={!usernameAvailable} className={`flex gap-2 w-2/5 border border-white/20 h-12 px-2 rounded-full transition-all duration-200
              justify-center items-center hover:border-white/75 ${usernameAvailable ? "opacity-100": "opacity-30"}`}>
                <FaGithub className=""/>Github
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
