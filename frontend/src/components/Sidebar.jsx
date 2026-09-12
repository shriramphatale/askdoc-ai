import UserProfile from "./Sidebar/UserProfile";
import RecentChats from "./Sidebar/RecentChats";
import UploadDocument from "./Sidebar/UploadDocument";
import SidebarToggle from "./Sidebar/SidebarToggle";
import BrandHeader from "./Sidebar/BrandHeader";
import {useDocumentStore} from "../store/useDocumentStore";

const Sidebar = () => {
  const {isSidebarOpen} = useDocumentStore()
  return (
    <>
      {/* Sidebar Toggle & Mobile Backdrop */}
      <SidebarToggle />

      {/* Sidebar Panel */}
      <div className={`shrink-0 overflow-hidden transition-[width] duration-300 ease-in-out
      ${isSidebarOpen ? "lg:w-64" : "lg:w-0"}
      `}>
        <aside
          className={`fixed lg:relative top-0 left-0 z-40
        flex flex-col w-64 h-screen
        bg-[#0C0C0E] border-r border-zinc-800/70
        select-none overflow-hidden
        transition-transform duration-300 ease-in-out
        ${isSidebarOpen
          ? "translate-x-0"
          : "-translate-x-full"
        }
      `}
        >
          {/* Top brand header: AskDoc.ai */}
          <BrandHeader />

          {/* Upload Document Button: below brand, white background with dark text */}
          <UploadDocument />
          {/* Recents Section */}
          <RecentChats />

          {/* Profile container */}
          <UserProfile />
        </aside>
      </div>
    </>
  );
};

export default Sidebar;