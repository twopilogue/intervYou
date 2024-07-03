"use client";

import React, { useState } from "react";
import { Modal } from "@mui/base";
import Link from "next/link";

const REDIRECT_URL = process.env.NEXT_PUBLIC_REDIRECT_URL;
const CLIENT_ID = process.env.NEXT_PUBLIC_CLIENT_ID;
const link = `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URL}&state=state`;

export const Header = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [open, setOpen] = useState(false);
  return (
    <>
      <div className="flex h-16 items-center border-b border-gray-40">
        <div className="mx-4 flex w-full items-center justify-between">
          <span className="text-xl font-bold">intervYou</span>
          <div className="flex gap-4 sm:hidden">
            <span className="cursor-pointer">
              <svg className="h-6 w-6 text-gray-90" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                  d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                />
              </svg>
            </span>
            <span className="cursor-pointer" onClick={() => setOpen(true)}>
              <svg className="h-6 w-6 text-gray-90" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </span>
          </div>
          <div className="flex gap-6 *:cursor-pointer max-sm:hidden">
            {isLogin ? (
              <>
                <Link href="/create">면접 시작</Link>
                <Link href="/list">면접 내역</Link>
                <Link href="/community">커뮤니티</Link>
                <Link href="/mypage">마이페이지</Link>
              </>
            ) : (
              <>
                <Link className="text-[#2DB400]" href={link}>
                  네이버 로그인
                </Link>
                <Link href="/community">커뮤니티</Link>
              </>
            )}
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
              {isLogin ? (
                <>
                  <Link href="/create">면접 시작</Link>
                  <Link href="/list">면접 내역</Link>
                  <Link href="/community">커뮤니티</Link>
                  <Link href="/mypage">마이페이지</Link>
                </>
              ) : (
                <>
                  <Link className="text-[#2DB400]" href={link}>
                    네이버 로그인
                  </Link>
                  <Link href="/community">커뮤니티</Link>
                </>
              )}
            </div>
          </div>
        </Modal>
      )}
    </>
  );
};
