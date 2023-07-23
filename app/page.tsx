"use client";
import ChatContainer from "@/components/chat/chat-container";
import Image from "next/image";

export default function Home() {
  return (
    <main className="h-screen flex justify-center items-center gap-10">
      <ChatContainer />
    </main>
  );
}
