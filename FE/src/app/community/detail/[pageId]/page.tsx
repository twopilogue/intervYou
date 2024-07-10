"use client";

import axios from "axios";
import CommentItem from "../CommentItem";
import CommentInput from "../CommentInput";
import Link from "next/link";
import { CommunityConfig } from "../../../../interfaces/community.interface";
import { useEffect, useState } from "react";
import { useAuthStore } from "../../../../slices/auth.slice";
import { useShallow } from "zustand/react/shallow";
import { useRouter } from "next/navigation";

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export default function CommunityDetail({ params }: { params: { pageId: number } }) {
  const router = useRouter();
  const [accessToken, userNickname] = useAuthStore(useShallow((state) => [state.accessToken, state.nickname]));
  const [communityInfo, setCommunityInfo] = useState<CommunityConfig>(Object);
  const isMine = communityInfo.nickname === userNickname;

  const handleDelete = () => {
    axios
      .delete(`${BASE_URL}/api/communities/${params.pageId}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((res) => {
        router.push("/community");
      })
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    axios
      .get(`${BASE_URL}/api/communities/${params.pageId}`)
      .then((res) => setCommunityInfo(res.data.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="flex h-full w-full flex-col overflow-y-auto *:mx-auto *:w-full *:max-w-[1280px]">
      <div className="flex flex-col gap-2 border-b border-gray-40 p-4">
        <span className="text-base font-bold text-gray-90">{communityInfo.title}</span>
        <div className="flex justify-between *:text-xs *:text-gray-50">
          <span>{communityInfo.nickname}</span>
          <div className="flex gap-4">
            <span>{communityInfo.createTime}</span>
            {isMine && (
              <div className="underline underline-offset-4 *:mr-2 *:cursor-pointer">
                <Link href={`/community/edit/${params.pageId}`}>수정</Link>
                <span className="text-danger-text" onClick={handleDelete}>
                  삭제
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="px-4 py-8">
        <span className="mb-8 block text-sm text-gray-90">{communityInfo.content}</span>
        <div className="mb-8">
          <div className="rounded-2xl bg-gray-10 p-8">
            <span className="text-sm text-gray-60">왜 저희 회사에 입사하고 싶나요?</span>
          </div>
        </div>
      </div>
      <div className="px-4">
        <span className="block pb-4 text-sm font-bold text-gray-90">댓글</span>
        <CommentInput />
        <div className="flex flex-col gap-2">
          {communityInfo.commentCount < 1 ? (
            <>작성된 댓글이 없습니다.</>
          ) : (
            <>{communityInfo.comments?.map((comment, key) => <CommentItem key={key} comment={comment} />)}</>
          )}
        </div>
      </div>
    </div>
  );
}
