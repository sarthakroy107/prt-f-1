import { autocomplete_search_results } from "@/services/typeDefs";
import Image from "next/image";
import Link from "next/link";

type SearchAndHoverAccountProps = {
  details: autocomplete_search_results;
  messagePage: boolean;
};

const SearchAndHoverAccount = ({ details, messagePage }: SearchAndHoverAccountProps) => {
  let link;
  if(messagePage) {
    link = `/messages/${details.username}`
  }else {
    link = `/${details.username}`
  }
  return (
    <Link href={link} className="w-full flex gap-x-4 items-center px-4 hover:bg-slate-50/10 p-3 cursor-pointer">
        <Image 
            src={details.profileImageUrl} 
            width={50} 
            height={50} 
            alt="profile image" 
            className="rounded-full h-12 w-12 object-cover"
        />
        <div>
            <p className="text-white text-lg font-semibold">{details.name}</p>
            <p className="text-slate-100 text-sm font-medium text-opacity-70">{details.username}</p>
        </div>
    </Link>
  );
};

export default SearchAndHoverAccount;
