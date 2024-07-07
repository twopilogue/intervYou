"use client";

import { usePathname } from "next/navigation";
import "../styles/globals.css";
import { Header } from "./_components/header/Header";
import ContentHeader from "./content/_components/Header";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  return (
    <html>
      <body className="h-svh w-svw">
        {pathname === "/content" ? <ContentHeader /> : <Header />}
        <div className="h-[calc(100%-4rem)]">{children}</div>
      </body>
    </html>
  );
}
