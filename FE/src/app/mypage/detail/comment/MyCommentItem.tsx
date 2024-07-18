"use client";

import { useRouter } from "next/navigation";
import { MyPageCommentConfig } from "./[page]/page";

interface MyCommentItemProps {
  item: MyPageCommentConfig;
}

export default function MyCommentItem({ item }: MyCommentItemProps) {
  const router = useRouter();

  return (
    <div
      className="flex cursor-pointer flex-col gap-2 rounded-2xl border border-gray-30 p-6"
      onClick={() => router.push(`/community/detail/${item.communityId}`)}
    >
      <span className="text-xs text-gray-50">{item.createTime}</span>
      <span className="text-sm text-gray-90">{item.commentContent}</span>
      <span className="text-xs text-gray-50">{item.title}</span>
    </div>
  );
}
