"use client";
import { Wand2, BrainCog, CornerRightDown, CornerUpRight } from "lucide-react";
import { useChat } from "ai/react";

import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { PropsWithChildren } from "react";
import useModelFinetune from "@/lib/store/useModelFinetune";
type ChatSkeleton = {
  from?: "user" | "assistant";
};
const Chat = () => {
  const temperature = useModelFinetune((state) => state.temperature);
  const maxTokens = useModelFinetune((state) => state.maxTokens);
  const model = useModelFinetune((state) => state.model);

  const { messages, input, handleInputChange, handleSubmit } = useChat({
    api: "/api/completions",
    body: {
      temperature,
      model,
      maxTokens,
    },
  });

  return (
    <div className="basis-1/3 p-3 max-h-[75%] overflow-y-scroll">
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
              {message.role === "user" ? (
                <Wand2 />
              ) : (
                <BrainCog
                  width={50}
                  height={50}
                  fill={"#ffffff"}
                  stroke="#121212"
                />
              )}

              <div className="p-3">
                <div className="mb-2">{message.content}</div>
                <span>
                  {`${new Date(
                    message.createdAt as Date
                  ).toLocaleTimeString()} ${new Date(
                    message.createdAt as Date
                  ).toLocaleDateString()}`}
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
