import ChatContainer from "@/components/chat/chat-container";

export default function Home() {
  return (
    <main className="h-screen overflow-y-scroll flex flex-col justify-center items-center gap-10 md:flex-row">
      <ChatContainer />
    </main>
  );
}
