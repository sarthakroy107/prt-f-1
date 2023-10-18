/* eslint-disable react-hooks/rules-of-hooks */
"use client"

import { sidebar_options } from '@/constants/sidebar'
import { IconType } from 'react-icons'
import { usePathname } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { SidebarAccountDetailsCard } from './acoountDetails/SidebarAccountDetailsCard'
import { useContext } from 'react'
import { UserContext } from '@/lib/contextApi/UserContext'
import Link from 'next/link'
import Image from 'next/image'
import CreateTweetModal from '../modals/CreateTweetModal'
import axios from 'axios'


const SidebarLayout = () => {
  const image = "https://pbs.twimg.com/profile_images/1658306244577472513/up-Oc-FT_400x400.jpg"
  const pathname = usePathname();

  const { data: session } = useSession()
  const { tweetModalActive, setTweetModalActive } = useContext(UserContext)

  const handlePayment = async (e: any) => {
    e.preventDefault();
    console.log("Payment")
    const { data } = await axios.post('http://localhost:8000/api/v1/payment',
    {
      priceId: 69420.00,
    },
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
    );
    console.log(data)
    window.location.assign(data.url)
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
        <div onClick={() => setTweetModalActive(true)}
        className='w-fit mt-6 p-3 px-20 rounded-full bg-[#1d9bf0ff] cursor-pointer hover:bg-[#0D8BDF] transition-all duration-150'>
          Post
        </div>
        {/* <button onClick={handlePayment} className='border border-white/40 w-fit p-2'>
          Payment
        </button> */}
      </div>
      <div>
        {
          session?.user !== null && session?.user !== undefined ? (<SidebarAccountDetailsCard email={session?.user?.email}/>) : 
          (<Link href={"/login"}><div>Login</div></Link>)
        }
      </div>
      {tweetModalActive && (
        <div className='fixed left-0 w-full h-screen top-0 bg-slate-100/20 z-20 flex justify-center'>
          <CreateTweetModal/>
        </div>
      )}
    </main>
  )
}

export default SidebarLayout;