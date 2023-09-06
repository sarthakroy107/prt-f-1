/* eslint-disable react-hooks/rules-of-hooks */
"use client"
import {sidebar_options} from '@/constants/sidebar'
import Link from 'next/link'
import Image from 'next/image'
import { IconType } from 'react-icons'
import { usePathname } from 'next/navigation'
import { signOut, useSession } from 'next-auth/react'
import { useDispatch } from 'react-redux'
import { turnNull } from '@/redux/slices/account'
import { AppDispatch } from '@/redux/store'
import { SidebarAccountDetailsCard } from './acoountDetails/SidebarAccountDetailsCard'


const SidebarLayout = () => {
    const image = "https://pbs.twimg.com/profile_images/1658306244577472513/up-Oc-FT_400x400.jpg"
    const pathname = usePathname();
    console.log(pathname);

    const { data: session } = useSession()
    const dispatch = useDispatch<AppDispatch>();

    const handleSignOut = () => {
      dispatch(turnNull());
      signOut();
    }

  return (
    <main className=' h-full flex flex-col justify-between gap-2 py-7 sticky top-7'>
      <div className='flex flex-col gap-2'>
        <Image className='rounded-full'
          src={image}
          width={69} 
          height={69}
          alt='Image'
        />
        {
          sidebar_options.map((op, index) => {
            const IconComponent: IconType = op.icon
            return (
              <div key={index}>
                <Link href={op.route} className={`w-fit flex gap-3 p-3 px-5 rounded-full backdrop-blur-sm  hover:bg-slate-300/20
                border border-transparent hover:border-white/20 transition-all duration-75
                  ${pathname == op.route ? "bg-slate-300/25" : ""}`}>
                    <IconComponent className='relative top-1'/>
                    <p className=''>{op.name}</p>
                </Link>
              </div>
            )
          })
        }
        <div className='w-fit mt-6 p-3 px-20 rounded-full bg-[#1d9bf0ff] cursor-pointer hover:bg-[#0D8BDF] transition-all duration-150'>
          Post
        </div>
      </div>
      <div className=''>
        {
          session?.user !== null && session?.user !== undefined ? (<SidebarAccountDetailsCard email={session?.user?.email}/>) : 
          (<Link href={"/login"}><div>Login</div></Link>)
        }
      </div>
    </main>
  )
}

export default SidebarLayout