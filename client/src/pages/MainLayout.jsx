import { Outlet } from "react-router-dom";
import Header from "../components/header";
import { NavigationSidebar } from "../components/navigation/navigation-sidebar";

const MainLayout = () => {
  return (
    <div className="h-full w-screen flex">
      <div className="hidden md:flex h-full w-[270px] z-30 flex-col fixed inset-y-0">
        <NavigationSidebar />
      </div>
      <main className="flex-1 md:ml-[270px] bg-white h-full">
        <Header />
        <div className="h-full bg-white">
          <Outlet className />
        </div>
      </main>
    </div>
  );
};

export default MainLayout;
