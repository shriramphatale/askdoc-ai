import { useEffect, useRef } from "react";
import {useChatStore} from "../../store/useChatStore"
import { FileText } from "lucide-react";
import TypingMessage from './TypingMessage'

const ChatMessages = () => {
  const { messages, isAiMessageLoading, typingMessageId } = useChatStore();

  const scrollContainerRef = useRef(null);

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    requestAnimationFrame(() => {
      container.scrollTo({
      top: container.scrollHeight,
      behavior: "smooth",
    });
    });
  }, [messages, isAiMessageLoading]);

  return (
    <div ref={scrollContainerRef} className="h-full overflow-y-auto px-4 pt-24 pb-28 pdf-scrollbar">
        <div className="mx-auto max-w-3xl space-y-6">
          {messages.length === 0 ? (
            <div className="flex min-h-[60vh] items-center justify-center">
              <div className="flex max-w-md flex-col items-center text-center">

                {/* PDF Icon */}
                <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-xl border border-zinc-800 bg-zinc-900">
                  <FileText className="h-6 w-6 text-zinc-400" />
                </div>

                {/* Heading */}
                <h2 className="text-lg font-medium text-zinc-100">
                  Ask anything about your PDF
                </h2>

                {/* Description */}
                <p className="mt-2 text-sm leading-6 text-zinc-500">
                  Your document is ready. Ask a question to start a
                  conversation.
                </p>

                {/* Suggestions */}
                <div className="mt-6 flex w-full flex-wrap justify-center gap-2">
                  <div className="whitespace-nowrap rounded-lg border border-zinc-800 bg-zinc-900/60 px-2.5 py-2 text-[11px] text-zinc-400 sm:px-3 sm:text-xs">
                    Summarize this document
                  </div>

                  <div className="whitespace-nowrap rounded-lg border border-zinc-800 bg-zinc-900/60 px-2.5 py-2 text-[11px] text-zinc-400 sm:px-3 sm:text-xs">
                    What are the key points?
                  </div>

                  <div className="whitespace-nowrap rounded-lg border border-zinc-800 bg-zinc-900/60 px-2.5 py-2 text-[11px] text-zinc-400 sm:px-3 sm:text-xs">
                    Explain this document
                  </div>
                </div>
              </div>
            </div>
            ) : (
            messages.map((message) => (
              <div
                key={message._id}
                className={`flex ${
                  message.role === "user"
                    ? "justify-end"
                    : "justify-start"
                }`}>

                {message.role === "user" ? (
                  /* User Message */
                  <div className="max-w-[70%] rounded-lg bg-zinc-800/60 px-3 py-2 text-sm leading-6 text-zinc-200">
                    {message.content}
                  </div>
                  ) : (
                  /* Assistant Message */
                  <div className="max-w-[85%] text-sm leading-7 text-zinc-300">
                    {message._id === typingMessageId ? (
                      <TypingMessage content={message.content} 
                        onComplete={() => {useChatStore.setState({ typingMessageId: null });}}/>
                    ) : (
                      message.content
                    )}
                  </div>
                )}
              </div>
            ))
          )}
          {/* AI Loading Skeleton - left side, single line */}
          {isAiMessageLoading && (
            <div className="flex justify-start">
              <div className="h-3 w-48 animate-pulse rounded bg-zinc-800" />
            </div>
          )}
        </div>
      </div>
  )
}

export default ChatMessages