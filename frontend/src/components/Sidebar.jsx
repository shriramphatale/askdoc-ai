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

      {/* Sidebar Panel: exact same design, width, styling and layout across desktop and mobile */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-40 flex flex-col w-64 h-screen bg-[#0C0C0E] border-r border-zinc-800/70 select-none transition-transform duration-300 ease-in-out ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
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
    </>
  );
};

export default Sidebar;