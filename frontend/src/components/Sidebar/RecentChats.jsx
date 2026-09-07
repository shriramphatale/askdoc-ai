import { useState } from "react";

const Chats = [
  { id: "1", title: "Q4 2025 Financial Summary" },
  { id: "2", title: "Employment Agreement Review" },
  { id: "3", title: "System Architecture Proposal" },
  { id: "4", title: "Product Roadmap & Priorities" },
  { id: "5", title: "Compliance & Security Guide" },
  { id: "6", title: "Customer Feedback Synthesis" },
];

const RecentChats = (activeChatId, onSelectChat) => {
    const [selectedId, setSelectedId] = useState(activeChatId || (Chats[0] ? Chats[0].id : "1"));

    const handleSelect = (id) => {
        setSelectedId(id);
        if (onSelectChat) {
            onSelectChat(id);
        }
    };

  return (
    <div className="flex-1 flex flex-col px-3 min-h-0 overflow-hidden">
        <div className="px-2 pb-1.5 pt-1 shrink-0">
            <span className="text-xs font-medium text-zinc-400">Recents</span>
        </div>

        <div className="flex-1 overflow-y-auto space-y-0.5 pr-1 custom-scrollbar">
            {Chats.map((chat) => {
                const isSelected = selectedId === chat.id;
                return (
                <button
                    key={chat.id}
                    type="button"
                    onClick={() => handleSelect(chat.id)}
                    className={`w-full text-left px-2.5 py-1.5 rounded-lg text-sm transition-colors truncate block cursor-pointer select-none ${
                    isSelected
                        ? "bg-zinc-800/80 text-zinc-100 font-medium"
                        : "text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/40"
                    }`}
                    title={chat.title}
                >
                    {chat.title}
                </button>
                );
            })}
        </div>
    </div>
  )
}

export default RecentChats