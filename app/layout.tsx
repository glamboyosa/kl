import { SiteHeader } from "@/components/site-header";
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { cn } from "@/lib/utils";
import { fontShadowsIntoLight } from "@/lib/fonts";

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
      <body
        className={cn(
          "min-h-screen  font-sans antialiased",
          fontShadowsIntoLight.variable
        )}
      >
        <div className=" flex min-h-screen flex-col items-center justify-center">
          <SiteHeader />
          <div className="">{children}</div>
        </div>
      </body>
    </html>
  );
}
