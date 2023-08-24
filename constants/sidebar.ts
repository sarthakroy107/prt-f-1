import { AiFillHome } from 'react-icons/ai';
import { IconType } from 'react-icons';

interface SidebarOptions {
    name: String,
    route: any,
    icon: IconType
}
export const sidebar_options: SidebarOptions[] =  [
    {name:"Home", route: "/home", icon: AiFillHome},
    {name:"Bookmarks", route: "/bookmarks", icon: AiFillHome},
    {name:"Profile", route: "/profile", icon: AiFillHome},

];