"use client";

import { ReactNode } from "react";
import { usePathname } from "next/navigation";
import "../styles/globals.css";
import { Header } from "./_components/header/Header";
import ChatHeader from "./chat/_components/Header";

export default function RootLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  return (
    <html>
      <meta httpEquiv="Content-Security-Policy" content="upgrade-insecure-requests" />
      <body className="h-svh w-svw">
        {pathname === "/chat" ? <ChatHeader /> : <Header />}
        <div className="h-[calc(100%-4rem)]">{children}</div>
      </body>
    </html>
  );
}
