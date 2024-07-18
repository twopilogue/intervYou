"use client";

import { usePathname, useRouter } from "next/navigation";

export default function MyPageDetailLayout({ children }) {
  const pathname = usePathname();
  const router = useRouter();

  return (
    <>
      <div className="flex h-full flex-col *:mx-auto *:w-full *:max-w-[1280px]">
        <div className="flex items-center gap-2 px-4 py-8">
          <svg
            className="h-6 w-6 cursor-pointer"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            onClick={() => router.push("/mypage")}
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          <span className="font-bold">{pathname.includes("/post") ? "내가 작성한 게시글" : "내가 작성한 댓글"}</span>
        </div>
        {children}
      </div>
    </>
  );
}
