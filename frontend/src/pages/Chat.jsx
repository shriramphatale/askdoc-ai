import Sidebar from "../components/Sidebar";
import ProfileMenu from "../components/Sidebar/ProfileMenu";
import {useUIStore} from "../store/useUIStore";

const Chat = () => {
  const { isUserMenuOpen, closeUserMenu } = useUIStore();
  return (
    <div className="relative flex h-screen w-screen overflow-hidden bg-[#09090B] text-[#FAFAFA]">
      <Sidebar />
      { isUserMenuOpen && ( 
        <> 
          <div className="fixed inset-0 z-40" onClick={closeUserMenu}/> <ProfileMenu /> 
        </>
      ) }
    </div>
  );
};

export default Chat;