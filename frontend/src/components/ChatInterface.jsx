import ChatHeader from "./Chat/ChatHeader";
import ChatMessages from "./Chat/ChatMessages";
import ChatInput from "./Chat/ChatInput";

const sampleMessages = [
  {
    _id: "msg1",
    role: "user",
    content: "What is this document about?",
  },
  {
    _id: "msg2",
    role: "assistant",
    content:
      "This document provides an overview of artificial intelligence, including machine learning, its applications, and its impact on different industries.",
  },
  {
    _id: "msg3",
    role: "user",
    content: "What are the main points discussed in the document?",
  },
  {
    _id: "msg4",
    role: "assistant",
    content:
      "The main points include the fundamentals of AI, different machine learning approaches, real-world applications, benefits, challenges, and future possibilities.",
  },
  {
    _id: "msg5",
    role: "user",
    content: "Can you explain machine learning in simple terms?",
  },
  {
    _id: "msg6",
    role: "assistant",
    content:
      "Machine learning is a way of teaching computers to learn patterns from data and make predictions or decisions without being explicitly programmed for every situation.",
  },
];

function ChatInterface() {
  return (
    <div className="relative h-full min-full bg-[#09090b]">
      {/* Chat Header */}
      <ChatHeader/>

      {/* Messages */}
      <ChatMessages/>

      {/* Input */}
      <ChatInput/>
    </div>
  );
}

export default ChatInterface;

