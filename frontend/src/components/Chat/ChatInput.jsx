import { Send } from "lucide-react";
import { useState } from "react"
import { useDocumentStore } from "../../store/useDocumentStore"
import { useChatStore } from "../../store/useChatStore"

const ChatInput = () => {
    const [content, setContent] = useState("");
    const { selectedDocument } = useDocumentStore();
    const {isMessageLoading, sendMessage} = useChatStore();

    const handleSendMessage = async () => {
        if (!content.trim() || isMessageLoading) return;
        const message = content;
        setContent("");

        await sendMessage(selectedDocument._id, message)
    }

    const handleKeyDown = (e) => {
        if(e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        handleSendMessage();
        }
    }
  return (
    <div className="absolute bottom-0 left-0 right-0 px-4 pb-5">
        <div className="mx-auto max-w-3xl">
          <div
            className="
              flex items-center
              rounded-full
              border border-zinc-700/70
              bg-zinc-900/95
              px-5 py-2
              backdrop-blur-xl
              shadow-[0_8px_30px_rgba(0,0,0,0.25)]
              transition-all duration-200
            ">
            <input
              type="text"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              disabled={isMessageLoading}
              onKeyDown={handleKeyDown}
              placeholder="Ask something about this document..."
              className="
                flex-1
                bg-transparent
                py-2
                text-sm
                text-zinc-100
                outline-none
                placeholder:text-zinc-500
              "
            />

            <button
              type="button"
              disabled={!content.trim() || isMessageLoading}
              onClick={handleSendMessage}
              className="
                ml-2
                flex h-9 w-9
                shrink-0
                items-center justify-center
                rounded-full
                text-zinc-400
                transition-all duration-200
                hover:text-white
                hover:bg-white/5
                active:scale-90
              "
            >
              <Send
                size={18}
                strokeWidth={1.8}
              />
            </button>
          </div>
        </div>
    </div>
  )
}

export default ChatInput