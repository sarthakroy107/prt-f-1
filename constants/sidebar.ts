import { AiFillHome } from 'react-icons/ai';
import { RiNotificationFill, RiBookmarkFill } from 'react-icons/ri'
import { CgProfile } from 'react-icons/cg'
import { IconType } from 'react-icons';
import { FaUserGroup } from 'react-icons/fa6'
import { FiMail } from 'react-icons/fi'

interface SidebarOptions {
    name: String,
    route: any,
    icon: IconType
}
export const sidebar_options: SidebarOptions[] =  [
    {name:"Home", route: "/home", icon: AiFillHome},
    {name:"Notification", route:"/notification", icon: RiNotificationFill},
    {name:"Messages", route: "/messages", icon: FiMail},
    {name:"Bookmarks", route: "/bookmarks", icon: RiBookmarkFill},
    {name:"Communities", route: "/communities", icon: FaUserGroup},
    {name:"Profile", route: "/profile", icon: CgProfile},

];