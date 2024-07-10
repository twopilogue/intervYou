"use client";

import { useRouter } from "next/navigation";
import { CommunityConfig } from "../../interfaces/community.interface";

interface CommunityItemProps {
  item: CommunityConfig;
}

export default function CommunityItem({ item }: CommunityItemProps) {
  const router = useRouter();
  return (
    <div
      className="flex cursor-pointer flex-col gap-2 rounded-2xl border border-gray-30 p-6"
      onClick={() => router.push(`/community/detail/${item.communityId}`)}
    >
      <span className="text-xs text-gray-50">{item.createTime}</span>
      <span className="text-base font-bold text-gray-90">{item.title}</span>
      <span className="text-sm text-gray-70">{item.content}</span>
      <div className="flex gap-4 *:text-xs *:text-gray-50">
        <span>{item.nickname}</span>
        <span>댓글 {item.commentCount}</span>
      </div>
    </div>
  );
}
