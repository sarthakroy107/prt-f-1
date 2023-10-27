"use client"
import Searchbar from './Searchbar'
import PaymentCard from './PaymentCard'
import { usePathname } from 'next/navigation'

const RightSidebar = () => {
    const pathname = usePathname()
  return (
    <div className="w-[30%] flex flex-col items-center">
      { pathname !== "/search" && (
        <div className='w-[90%]'>
          <Searchbar/>
        </div>
      ) }
      <PaymentCard/>
    </div>
  )
}

export default RightSidebar