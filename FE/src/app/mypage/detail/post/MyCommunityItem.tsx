"use client";

import { useRouter } from "next/navigation";
import { CommunityConfig } from "../../../../interfaces/community.interface";

interface MyCommunityItemProps {
  item: CommunityConfig;
}

export default function MyCommunityItem({ item }: MyCommunityItemProps) {
  const router = useRouter();
  return (
    <div
      className="flex cursor-pointer flex-col gap-2 rounded-2xl border border-gray-30 p-6"
      onClick={() => router.push(`/community/detail/${item.communityId}`)}
    >
      <span className="text-xs text-gray-50">{item.createTime}</span>
      <span className="text-base font-bold text-gray-90">{item.content}</span>
      <span className="text-sm text-gray-70">{item.title}</span>
    </div>
  );
}
