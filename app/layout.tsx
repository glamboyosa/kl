import { SiteHeader } from "@/components/site-header";
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { cn } from "@/lib/utils";
import { fontShadowsIntoLight } from "@/lib/fonts";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Klux AI Playground demo",
  description: "Demo Klux AI Pkayground challenge",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={cn("antialiased", fontShadowsIntoLight.className)}>
        <div className=" flex h-screen flex-col items-center justify-center">
          <SiteHeader />
          <div className="">{children}</div>
          <Toaster />
        </div>
      </body>
    </html>
  );
}
