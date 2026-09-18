import { useEffect, useState } from "react";
import { useChatStore } from '../../store/useChatStore'
import { MoreHorizontal, Trash2 } from "lucide-react";



const RecentChats = () => {
    const {recentChats, isRecentChatsLoading, getMessages, deleteConversation} = useChatStore()
    const [selectedId, setSelectedId] = useState(null);
    const [openMenuId, setOpenMenuId] = useState(null);

    const handleSelect = (id) => {
        setSelectedId(id);
        getMessages(id)
    };
    const handleDelete = (chatId) => {
        deleteConversation(chatId)
    };

    useEffect(() => { //close three dot menu on click outside
        const handleClickOutside = () => {
            setOpenMenuId(null);
        };

        if (openMenuId) {
            document.addEventListener("click", handleClickOutside);
        }

        return () => {
            document.removeEventListener("click", handleClickOutside);
        };
    }, [openMenuId]);

  return (
    <div className="flex-1 flex flex-col px-3 min-h-0 overflow-hidden">
        <div className="px-2 pb-1.5 pt-1 shrink-0">
            <span className="text-xs font-medium text-zinc-400">Recents</span>
        </div>

        <div className="flex-1 overflow-y-auto space-y-0.5 pr-1 custom-scrollbar">
            {isRecentChatsLoading ? (
                Array.from({ length: 8 }).map((_, index) => (
                <div key={index} className="w-full px-2.5 py-1.5">
                    <div className={`h-6 rounded-lg bg-zinc-800/60 animate-pulse ${
                        index % 2 === 0 ? "w-4/5" : "w-3/5"
                    }`}
                    />
                </div>
                ))
            )
            :(recentChats.map((chat) => {
                const isSelected = selectedId === chat._id;
                return (
                    <div
                        key={chat._id}
                        className={`group relative w-full rounded-lg ${
                            isSelected ? "bg-zinc-800/80" : "hover:bg-zinc-800/40"
                        }`}
                        >
                        {/* Chat button */}
                        <button
                            type="button"
                            onClick={() => handleSelect(chat._id)}
                            className={`w-full text-left px-2.5 py-1.5 pr-9 rounded-lg text-sm transition-colors truncate block cursor-pointer select-none ${
                            isSelected
                                ? "text-zinc-100 font-medium"
                                : "text-zinc-400 hover:text-zinc-200"
                            }`}
                            title={chat.title}>
                            {chat.title}
                        </button>

                        {/* Three dots */}
                        <button
                            type="button"
                            onClick={(e) => {
                                e.stopPropagation();
                                setOpenMenuId(
                                    openMenuId === chat._id ? null : chat._id
                                );
                            }}
                            className="absolute right-1.5 top-1/2 -translate-y-1/2
                            p-1 rounded-md
                            text-zinc-500 hover:text-zinc-200
                            hover:bg-zinc-700/70
                            opacity-100
                            md:opacity-0 md:group-hover:opacity-100
                            transition-opacity cursor-pointer">
                            <MoreHorizontal size={16} />
                        </button>

                        {/* Dropdown */}
                        {openMenuId === chat._id && (
                            <div className="absolute right-1 top-8 z-50 w-28 rounded-lg border border-zinc-700 bg-zinc-900 shadow-xl p-1">
                                <button
                                    type="button"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handleDelete(chat._id);
                                        setOpenMenuId(null);
                                    }}
                                    className="w-full flex items-center gap-2 px-2.5 py-1.5 rounded-md text-sm text-red-400 hover:bg-red-500/10 hover:text-red-300 cursor-pointer">
                                    <Trash2 size={14} />
                                    Delete
                                </button>
                            </div>
                        )}
                    </div>
                );
            }))}
        </div>
    </div>
  )
}

export default RecentChats