import { Modal } from "@mui/base";
import Link from "next/link";
import { useState } from "react";

export default function ContentHeader({}) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <div className="flex h-16 w-full items-center border-b border-gray-40 bg-white">
        <div className="mx-4 flex w-full items-center justify-between">
          <div className="flex items-center gap-2">
            <svg className="h-6 w-6 cursor-pointer" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            <span className="text-lg font-bold">프론트엔드 모의 면접</span>
          </div>
          <div className="flex gap-4 sm:hidden">
            <svg
              className="h-6 w-6 cursor-pointer text-danger-text"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
              />
            </svg>
            <svg
              onClick={() => setOpen(true)}
              className="h-6 w-6 cursor-pointer text-gray-90"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </div>
          <div className="flex gap-6 *:cursor-pointer max-sm:hidden">
            <Link className="text-danger-text" href="/create">
              면접 삭제
            </Link>
            <Link href="/list">면접 내역</Link>
            <Link href="/community">커뮤니티</Link>
            <Link href="/mypage">마이페이지</Link>
          </div>
        </div>
      </div>
      {open && (
        <Modal open={open}>
          <div className="absolute top-0 h-full w-full bg-white px-4 outline-none">
            <div className="my-8 cursor-pointer" onClick={() => setOpen(false)}>
              <svg className="h-6 w-6 text-gray-90" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </div>
            <div className="flex flex-col gap-4 *:cursor-pointer">
              <Link href="/list">면접 내역</Link>
              <Link href="/community">커뮤니티</Link>
              <Link href="/mypage">마이페이지</Link>
            </div>
          </div>
        </Modal>
      )}
    </>
  );
}
