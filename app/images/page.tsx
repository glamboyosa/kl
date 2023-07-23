import ChatContainer from "@/components/chat/chat-container";

export default function Page() {
  return (
    <main className="h-screen overflow-y-scroll flex justify-center items-center gap-10">
      <ChatContainer />
    </main>
  );
}
