"use client";

import { useRouter } from "next/navigation";

interface MenuTapProps extends HTMLElement {
  title: string;
  isLink?: boolean;
  onClick: () => void;
}

const MenuTab = ({ title, isLink = true, ...props }) => {
  return (
    <div className="flex cursor-pointer justify-between" {...props}>
      <span>{title}</span>
      {isLink && (
        <svg className="h-5 w-5 text-gray-60" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 5l7 7-7 7" />
        </svg>
      )}
    </div>
  );
};

export default function MyPage({}) {
  const router = useRouter();
  return (
    <div className="flex h-full flex-col *:mx-auto *:w-full *:max-w-[1280px]">
      <div className="mx-auto flex w-full items-center border-b border-gray-40 py-8">
        <div className="mx-auto w-full max-w-[1280px] px-4">
          <span className="font-bold">닉네임 </span>
          <span>님</span>
        </div>
      </div>
      <div className="flex flex-col *:border-b *:border-gray-20 *:p-4 *:text-sm [&>*:last-child]:border-gray-40">
        <MenuTab title="내가 작성한 게시글" onClick={() => router.push("/mypage/details/post")} />
        <MenuTab title="내가 작성한 댓글" onClick={() => router.push("/mypage/details/comment")} />
      </div>
      <div className="flex flex-col *:border-b *:border-gray-20 *:p-4 *:text-sm [&>*:last-child]:border-gray-40">
        {/* <div>
          <span>다크모드</span>
        </div> */}
        <MenuTab title="로그아웃" isLink={false} />
        <MenuTab title="회원탈퇴" isLink={false} />
      </div>
    </div>
  );
}
