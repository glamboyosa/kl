"use client";

import React, { useEffect, useLayoutEffect, useState } from "react";
import Link from "next/link";

import { motion } from "framer-motion";
import { Github } from "lucide-react";

import useActiveTab, { Tabs } from "@/lib/store/useActiveTab";
import { useSearchParams } from "next/navigation";

const tabs = [
  { id: "chat", label: "Chat (Prompt)", link: "/" },
  { id: "images", label: "Images", link: "/images" },
  { id: "auth", label: "Auth", link: "/auth" },
];
export function SiteHeader() {
  const [mounted, setMounted] = React.useState(false);
  const activeTab = useActiveTab((state) => state.activeTab);
  const setActiveTab = useActiveTab((state) => state.setActiveTab);

  React.useEffect(() => {
    if (window.location.pathname === "/") {
      setActiveTab("chat");
    } else {
      setActiveTab(window.location.pathname as Tabs);
    }
  }, []);
  React.useEffect(() => {
    setMounted(true);
  }, []);
  if (!mounted) return null;
  return (
    <div
      className={
        "bg-white text-black fixed top-[1vh] z-20 w-auto rounded-md p-2  shadow-xl xl:top-[5vh]"
      }
    >
      <div className="cursor flex space-x-6">
        {tabs.map((tab) => (
          <Link key={tab.id} href={tab.link}>
            <button
              onClick={() => {
                setActiveTab(tab.id as Tabs);
              }}
              className={`relative  rounded-full px-3 py-1.5 text-sm font-medium  outline-sky-400 transition focus-visible:outline-2`}
              style={{
                WebkitTapHighlightColor: "transparent",
              }}
            >
              {activeTab === tab.id && (
                <motion.span
                  layoutId="bubble"
                  className="absolute inset-0 z-10 bg-orange-500
                  mix-blend-darken"
                  style={{ borderRadius: 9999 }}
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
              {tab.label}
            </button>
          </Link>
        ))}
        <div className="cursor flex items-center space-x-6">
          {
            <Link
              target="_blank"
              rel="noreferrer"
              href={"https://github.com/glamboyosa/"}
            >
              <Github />
            </Link>
          }
        </div>
      </div>
    </div>
  );
}
