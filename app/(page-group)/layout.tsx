import PaymentCard from "@/components/page-components/PaymentCard";
import Searchbar from "@/components/page-components/Searchbar";
import SidebarLayout from "@/components/page-components/SidebarLayout";
import React from "react";

export default function Layout ({ children }: {children: React.ReactNode}) {
    return(
        <main className="w-2/3 flex">
            <div className={`w-[20%] flex flex-col text-xl font-semibold gap-3 sticky top-0 h-screen z-20`}>
              <SidebarLayout/>
            </div>
            <div className='w-[50%] min-h-screen border-l border-r border-white/25'>
              {children}
            </div>
            <div className="w-[30%] flex flex-col items-center">
              <Searchbar/>
              <PaymentCard/>
            </div>
        </main>
    )

}