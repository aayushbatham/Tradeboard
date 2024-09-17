// Header.js
import { AlignJustify } from "lucide-react";
import { CircleChevronDown, Search } from "lucide-react";
import Avatar from "@mui/material/Avatar";

const Header = () => {
  return (
    <header className="flex items-center justify-between p-7 bg-white shadow-sm flex-1">
      {/* Search Bar */}
      <div className="relative w-full ml-2 flex items-center gap-x-4 p-1">
        <div className="mr-3 ml-2 pl-4">
          <AlignJustify
            size={35}
            className="text-[#fdb480] filter saturate-150"
          />
        </div>
        <input
          type="text"
          placeholder=" Search ... "
          className="w-5/12 px-12 p-3 rounded-3xl border bg-[#F3F2F2] border-gray-300 focus:outline-none focus:ring-offset-0"
        />
        <div className="absolute ml-5">
          <Search
            size={22}
            className="absolute top-1/2 left-20 transform -translate-y-1/2 text-gray-400"
          />
        </div>
        <div className="flex mr-9 ml-auto">
          {/* User Avatar */}
          <div className="flex items-center gap-x-2 p-2.5">
            <Avatar alt="avatar" src="/vite.svg" />
            <p className=" px-3 gap-x-8 text-xl">Username</p>
            <CircleChevronDown className="text-[#FF9141]" size={28} />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
