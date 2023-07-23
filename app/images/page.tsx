import ImageContainer from "@/components/images/images-container";

export default function Page() {
  return (
    <main className="h-screen  overflow-y-scroll flex flex-col justify-center items-center gap-60 md:flex-row">
      <ImageContainer />
    </main>
  );
}
