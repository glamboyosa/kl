"use client";
import { Wand2, BrainCog, CornerRightDown, CornerUpRight } from "lucide-react";
import { useChat } from "ai/react";

import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { PropsWithChildren } from "react";
type ChatSkeleton = {
  from?: "user" | "assistant";
};
const Chat = () => {
  const { messages, input, handleInputChange, handleSubmit } = useChat({
    api: "/api/completions",
  });

  return (
    <div>
      <ChatSkeleton>
        <Wand2 />
        <form
          className="flex justify-center items-center gap-4"
          onSubmit={handleSubmit}
        >
          <textarea
            onChange={handleInputChange}
            value={input}
            className="border-none outline-none w-3/4"
            placeholder="Enter a prompt..."
          />
          <button
            type="submit"
            className="outline-none text-sm whitespace-nowrap border-none hover:bg-transparent text-black bg-transparent flex items-center gap-2"
          >
            <CornerUpRight />
            <span>Say Something</span>
          </button>
        </form>
      </ChatSkeleton>
      {messages.length > 0
        ? messages.map((message) => (
            <ChatSkeleton key={message.id}>
              <BrainCog fill={"#1212"} stroke="#f3f3f3" />
              <div className="p-3">
                <div className="mb-2">{message.content}</div>
                <span>
                  `${new Date(message.createdAt as Date).toLocaleTimeString()} $
                  {new Date(message.createdAt as Date).toLocaleDateString()}`
                </span>
              </div>
            </ChatSkeleton>
          ))
        : "No messages yet..."}
    </div>
  );
};

const ChatSkeleton = ({ children }: PropsWithChildren) => (
  <div className="flex shadow-fuller-shadow p-2 gap-6 mb-4 rounded-md items-center">
    {children}
  </div>
);
export default Chat;
