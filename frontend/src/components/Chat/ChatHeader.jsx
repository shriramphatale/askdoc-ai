import { FileText, ExternalLink } from "lucide-react";
import { useDocumentStore } from "../../store/useDocumentStore"

const ChatHeader = () => {
    const { selectedDocument } = useDocumentStore();

    return (
        <div className="absolute top-3 left-0 right-0 z-20 flex justify-center px-4">
            <div className="flex items-center gap-2 rounded-full border border-white/10 bg-zinc-900/80 px-3 py-1.5 shadow-lg shadow-black/20 backdrop-blur-xl">
                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-white/10">
                    <FileText size={12} />
                </div>

                <div className="max-w-[160px] truncate text-xs text-zinc-300">
                    {selectedDocument?.title || "demo.pdf"}
                </div>

                {/* Mobile / Tablet */}
                <button
                    className="
                    flex items-center gap-1
                    rounded-full
                    bg-white px-2.5 py-1
                    text-[11px] font-medium
                    text-black
                    lg:hidden
                    "
                >
                    <ExternalLink size={12} />
                    Open PDF
                </button>
            </div>
        </div>
  )
}

export default ChatHeader