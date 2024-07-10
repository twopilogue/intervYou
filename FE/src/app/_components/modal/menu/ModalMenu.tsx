import Link from "next/link";
import { forwardRef, MouseEvent } from "react";

interface ModalMenuProps {
  onClose: () => void;
  handleLink: (e: MouseEvent<HTMLDivElement>) => void;
  isLogin: boolean;
}

const REDIRECT_URL = process.env.NEXT_PUBLIC_REDIRECT_URL;
const CLIENT_ID = process.env.NEXT_PUBLIC_CLIENT_ID;
const link = `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URL}&state=state`;

const ModalMenu = forwardRef(({ onClose, handleLink, isLogin }: ModalMenuProps, ref) => {
  return (
    <div className="absolute top-0 h-full w-full bg-white px-4 outline-none">
      <div className="my-8 cursor-pointer" onClick={onClose}>
        <svg className="h-6 w-6 text-gray-90" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </div>
      <div className="flex flex-col gap-4 *:cursor-pointer" onClick={handleLink}>
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
  );
});

ModalMenu.displayName = "ModalMenu";
export default ModalMenu;
