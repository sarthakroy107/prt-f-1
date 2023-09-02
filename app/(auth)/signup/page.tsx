/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react/no-unescaped-entities */
"use client"
import axios from 'axios';
import { signIn, useSession } from 'next-auth/react'
import Image from 'next/image'
import { useEffect, useState } from 'react';
import { ZodType, z } from 'zod';
import {useForm} from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod';
import UsernameCheck from '@/components/buttons/UsernameCheck';
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
  const [authObj, setAuthObj] = useState<AuthObjFields>({ email:"", password: "" , username: ""})
  const [usernameDetail, setUsernameDetail] = useState<string>("")



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


  
  return (
    <section className=''>
      <div className="grid grid-cols-1 lg:grid-cols-2 lg:gap-28 items-center">
        <div className="relative h-5/6 flex items-end px-4 pb-10 pt-60 sm:px-6 sm:pb-16 md:justify-center lg:px-8 lg:pb-24 bg-gradient-to-t from-black to-white/80 rounded-md">
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
        <div className="flex items-center justify-center px-4 py-10 sm:px-6 sm:py-16 lg:px-8 lg:py-24">
          <div className="p-6 px-6 lg:p-12 lg:px-16 border border-white/60 rounded-md w-[75%]">
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
              <div className='flex flex-col gap-1 px-5 p-3 bg-slate-200/10 backdrop-blur-lg duration-150
              rounded-md border border-transparent hover:border-white/20'>
                <label className='text-sm opacity-90'>Username</label>
                <div className='flex items-center gap-2'>
                  <input className='w-[75%] bg-black/75 border border-white/20 p-2 rounded-md my-1'
                  type="text" placeholder='ex: @username' {...register("username", { required: true })} />
                  <UsernameCheck username={getUsername} />
                </div>
              </div>
              <div className='border-b border-white/20 scale-105 my-4'></div>
              <div className = "flex flex-col my-1">
                <label className='text-sm opacity-70'>Name</label>
                <input className=' bg-transparent border border-white/20 p-2 rounded-md my-1' 
                type="text" placeholder='Name' {...register("name")} />
              </div>
              <div className = "flex flex-col my-1">
                <label className='text-sm opacity-70'>Email</label>
                <input className=' bg-transparent border border-white/20 p-2 rounded-md my-1' 
                type="text" placeholder='Email' {...register("email")} />
              </div>
              <div className='flex flex-col lg:flex-row gap-4'>
                <div className = "flex flex-col my-1 w-1/2">
                  <label className='text-sm opacity-70'>Password</label>
                  <input className=' bg-transparent border border-white/20 p-2 rounded-md my-1' 
                  type="text" placeholder='Password' {...register("password")} />
                </div>
                <div className = "flex flex-col my-1 w-1/2">
                  <label className='text-sm opacity-70'>Confirm password</label>
                  <input className=' bg-transparent border border-white/20 p-2 rounded-md my-1'
                  type="text" placeholder='Confirm password' {...register("confirmPassword")}/>
                </div>
              </div>
              <div className='flex justify-center border border-white/50 text-white/80 p-2 rounded-md'>
                  <input type="submit"/>
                </div>
            </form>
            <div className="mt-3 space-y-3">
              <button onClick={handleGooglelogIn}
                type="button"
                className="relative inline-flex w-full items-center justify-center rounded-md border border-gray-400 bg-white px-3.5 py-2.5 font-semibold text-gray-700 transition-all duration-200 hover:bg-gray-100 hover:text-black focus:bg-gray-100 focus:text-black focus:outline-none"
              >
                <span className="mr-2 inline-block">
                  <svg
                    className="h-6 w-6 text-rose-500"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M20.283 10.356h-8.327v3.451h4.792c-.446 2.193-2.313 3.453-4.792 3.453a5.27 5.27 0 0 1-5.279-5.28 5.27 5.27 0 0 1 5.279-5.279c1.259 0 2.397.447 3.29 1.178l2.6-2.599c-1.584-1.381-3.615-2.233-5.89-2.233a8.908 8.908 0 0 0-8.934 8.934 8.907 8.907 0 0 0 8.934 8.934c4.467 0 8.529-3.249 8.529-8.934 0-.528-.081-1.097-.202-1.625z"></path>
                  </svg>
                </span>
                Sign up with Google
              </button>
              <button onClick={handleGithublogIn}
                type="button"
                className="relative inline-flex w-full items-center justify-center rounded-md border border-gray-400 bg-white px-3.5 py-2.5 font-semibold text-gray-700 transition-all duration-200 hover:bg-gray-100 hover:text-black focus:bg-gray-100 focus:text-black focus:outline-none"
              >
                <span className="mr-2 inline-block">
                  <svg
                    className="h-6 w-6 text-[#2563EB]"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M13.397 20.997v-8.196h2.765l.411-3.209h-3.176V7.548c0-.926.258-1.56 1.587-1.56h1.684V3.127A22.336 22.336 0 0 0 14.201 3c-2.444 0-4.122 1.492-4.122 4.231v2.355H7.332v3.209h2.753v8.202h3.312z"></path>
                  </svg>
                </span>
                Sign up with Github
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
