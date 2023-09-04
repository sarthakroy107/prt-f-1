import SidebarLayout from "@/components/page-components/SidebarLayout";
import React from "react";

export default function Layout ({ children }: {children: React.ReactNode}) {
    return(
        <main className="w-2/3 flex">
            <div className={`w-[20%] py-7 flex flex-col text-xl font-semibold opacity-90 gap-3
            `}>
              <SidebarLayout/>
            </div>
            <div className='w-[50%] min-h-screen border border-white'>
              {children}
            </div>
        </main>
    )

}