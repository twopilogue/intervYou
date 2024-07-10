"use client";

import { useRouter } from "next/navigation";
import { Button } from "./_components/button/Button";

export default function NotFound({}) {
  const router = useRouter();
  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-6">
      <div className="flex flex-col items-center gap-2">
        <span>404</span>
        <span>접근할 수 없는 페이지 입니다.</span>
      </div>
      <Button onClick={() => router.back()}>이전으로 돌아가기</Button>
    </div>
  );
}
