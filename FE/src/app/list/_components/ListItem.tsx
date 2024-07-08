"use client";

import { useRouter } from "next/navigation";

interface ListItemProps {
  id: number;
  title: string;
}

export default function ListItem({ id, title }: ListItemProps) {
  const router = useRouter();
  return (
    <div
      className="flex cursor-pointer items-center justify-between border-b border-gray-40 p-4"
      onClick={() => router.push(`/list/${id}`)}
    >
      <div className="flex flex-col gap-2">
        <span className="text-xs text-gray-90">2024/06/26</span>
        <span className="text-sm text-gray-90">{title}</span>
      </div>
      <svg className="h-5 w-5 text-gray-60" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 5l7 7-7 7" />
      </svg>
    </div>
  );
}
