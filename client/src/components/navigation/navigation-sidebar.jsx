import { useNavigate, useLocation } from "react-router-dom";
import clsx from "clsx";
import * as Separator from "@radix-ui/react-separator";
import {
  LayoutDashboard,
  ChartNoAxesColumnIncreasing,
  Wallet,
  UserRoundPlus,
  HandCoins,
  Crown,
  Settings,
  LogOut,
} from "lucide-react";

const sidebarItems = [
  { id: "", name: "Home" },
  { id: "leaderboard", name: "Leaderboard" },
  { id: "pastwinners", name: "Past Winners" },
  { id: "wallet", name: "Wallets" },
  { id: "subscription", name: "Subscription" },
  { id: "referral", name: "Referral Program" },
  { id: "settings", name: "Settings" },
  { id: "logout", name: "Logout" },
];

const iconMap = {
  "": <LayoutDashboard strokeWidth={1.5} />,
  leaderboard: <ChartNoAxesColumnIncreasing strokeWidth={1.5} />,
  wallet: <Wallet strokeWidth={1.5} />,
  subscription: <HandCoins strokeWidth={1.5} />,
  referral: <UserRoundPlus strokeWidth={1.5} />,
  pastwinners: <Crown strokeWidth={1.5} />,
  settings: <Settings strokeWidth={1.5} />,
  logout: <LogOut strokeWidth={1.5} />,
};

export const NavigationSidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Extract the current item id from the pathname
  const currentPath = location.pathname.split("/").pop();

  const handleClick = (id) => {
    navigate(`/${id}`);
  };

  return (
    <div className="flex flex-col w-full bg-white px-5 border-r-2 h-full pt-20">
      {sidebarItems.map((item) => (
        <button
          key={item.id}
          onClick={() => handleClick(item.id)}
          className={clsx(
            "relative flex items-center p-3 pt-4 mb-4 ml-2 mr-2 rounded-md transition-colors hover:bg-[#FF9141] hover:text-white group",
            currentPath === item.id && "bg-[#FF9141] text-white"
          )}
        >
          {/* Indicator bar for selected state */}
          <div
            className={clsx(
              "absolute left-0 top-0 h-full -ml-7 bg-[#FF9141] rounded-r-full transition-all",
              currentPath === item.id
                ? "w-[5px] transform scale-y-100"
                : "w-0 transform scale-y-0",
              "transition-transform duration-300 ease-in-out"
            )}
          />

          {/* Item name */}
          <div
            className={clsx(
              "ml-2 text-gray-800 group-hover:text-white flex gap-x-2",
              currentPath === item.id && "text-white"
            )}
          >
            <div className="mr-2">{iconMap[item.id]}</div>
            <div>{item.name}</div>
          </div>
        </button>
      ))}
      <Separator.Root />
    </div>
  );
};
