"use client"

import {sidebar_options} from '@/constants/sidebar'
import Link from 'next/link'
import Image from 'next/image'
import {AiFillHome} from 'react-icons/ai'
import { IconType } from 'react-icons'
import ReduxProvider from '@/redux/provider'
import { usePathname } from 'next/navigation'
const SidebarLayout = () => {
    const image = "https://pbs.twimg.com/profile_images/1658306244577472513/up-Oc-FT_400x400.jpg"
    const pathname = usePathname();
    console.log(pathname);


  return (
    <main className='sticky top-4 flex flex-col gap-2'>
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
                      <Link href={op.route} className={`w-fit flex gap-3 p-3 px-5 rounded-full backdrop-blur-sm  hover:bg-slate-300/25 
                      ${pathname == op.route ? "bg-slate-300/25" : ""}`}>
                        <IconComponent className='relative top-1'/>
                        {op.name}
                      </Link>
                    </div>
                )
            })
        }
    </main>
  )
}

export default SidebarLayout