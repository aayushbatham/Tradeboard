// Header.js
import { AlignJustify } from "lucide-react";
import ImageAvatars from "./user-avatar";
import { CircleArrowDown, Search } from "lucide-react";

const Header = () => {
  return (
    <header className="flex items-center justify-between p-5 bg-white shadow-sm flex-1">
      {/* Search Bar */}
      <div className="relative w-1/3 ml-2 flex items-center gap-x-4 p-1">
        <div className="mr-2">
          <AlignJustify
            size={30}
            className="text-[#fdb480] filter saturate-150"
          />
        </div>
        <input
          type="text"
          placeholder=" Search ... "
          className="w-full px-12 py-2 rounded-3xl border bg-[#F3F2F2] border-gray-300 focus:outline-none focus:ring-offset-0"
        />
        <Search
          size={22}
          className="absolute top-1/2 left-20 transform -translate-y-1/2 text-gray-400"
        />
      </div>

      <div className="flex mr-9">
        {/* User Avatar */}
        <div className="flex items-center gap-x-1">
          <ImageAvatars />
          <div className="flex items-center">
            <p className=" px-3">Username</p>
            <CircleArrowDown className="text-[#FF9141] size-5" />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
