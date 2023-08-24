import { AiFillHome } from 'react-icons/ai';
import { RiNotificationFill, RiBookmarkFill } from 'react-icons/ri'
import { CgProfile } from 'react-icons/cg'
import { IconType } from 'react-icons';

interface SidebarOptions {
    name: String,
    route: any,
    icon: IconType
}
export const sidebar_options: SidebarOptions[] =  [
    {name:"Home", route: "/home", icon: AiFillHome},
    {name:"Bookmarks", route: "/bookmarks", icon: RiBookmarkFill},
    {name:"Profile", route: "/profile", icon: CgProfile},
    {name:"Notification", route:"/notification", icon: RiNotificationFill},

];