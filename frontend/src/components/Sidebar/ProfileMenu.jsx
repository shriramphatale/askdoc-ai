import { Sparkles, CircleUserRound, CreditCard, Bell, LogOut, } from "lucide-react";
import {useAuthStore} from "../../store/useAuthStore"
import {useUIStore} from "../../store/useUIStore"

const ProfileMenu = () => {
    const { authUser, logout } = useAuthStore()
    const { closeUserMenu } = useUIStore()

    const handleLogout = async () => {
        await logout();
        closeUserMenu();
    }

  return (
    <div className="fixed left-3 sm:left-64 sm:ml-2 sm:bottom-3 bottom-18 z-50">
        <div className="w-60 bg-[#131316] border border-[#303030] rounded-xl shadow-2xl overflow-hidden">
        
        {/* User */}
        <div className="px-3 py-3 flex items-center gap-3 border-b border-[#303030]">
            <img
            src="https://github.com/shadcn.png"
            alt="profile"
            className="w-9 h-9 rounded-full"
            />

            <div>
            <p className="text-sm font-medium text-[#e5e5e5]">
                { authUser.fullName }
            </p>
            <p className="text-xs text-[#888]">
                { authUser.email }
            </p>
            </div>
        </div>

        {/* Options */}
        <div className="py-1.5">

            <button onClick={closeUserMenu} className="w-full px-3 py-2 flex items-center gap-3 text-sm text-[#ddd] hover:bg-[#242424]">
            <Sparkles size={17} />
            Upgrade to Pro
            </button>

            <button onClick={closeUserMenu} className="w-full px-3 py-2 flex items-center gap-3 text-sm text-[#ddd] hover:bg-[#242424]">
            <CircleUserRound size={17} />
            Account
            </button>

            <button onClick={closeUserMenu} className="w-full px-3 py-2 flex items-center gap-3 text-sm text-[#ddd] hover:bg-[#242424]">
            <CreditCard size={17} />
            Billing
            </button>

            <button onClick={closeUserMenu} className="w-full px-3 py-2 flex items-center gap-3 text-sm text-[#ddd] hover:bg-[#242424]">
            <Bell size={17} />
            Notifications
            </button>

        </div>

        {/* Logout */}
        <div className="border-t border-[#303030] py-1.5">
            <button onClick={ handleLogout } className="w-full px-3 py-2 flex items-center gap-3 text-sm text-[#ddd] hover:bg-[#242424]">
            <LogOut size={17} />
            Log out
            </button>
        </div>
        </div>
    </div>
  );
};

export default ProfileMenu;