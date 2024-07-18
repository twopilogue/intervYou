"use client";

import { useEffect, useState } from "react";
import CommentItem from "../MyCommentItem";
import { useAuthStore } from "../../../../../slices/auth.slice";
import axios from "axios";
import Pagination from "../../../../_components/pagination/Pagination";
import { useRouter } from "next/navigation";

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export interface MyPageCommentConfig {
  commentId: number;
  communityId: number;
  title: string;
  commentContent: string;
  createTime: string;
}

export default function MyPageComment({ params }: { params: { page: string } }) {
  const router = useRouter();
  const accessToken = useAuthStore((state) => state.accessToken);
  const [comments, setComments] = useState<MyPageCommentConfig[]>([]);
  const [totalPageCnt, setTotalPageCnt] = useState(1);

  const createPageURL = (pageNumber: number | string) => {
    router.push(`${pageNumber}`);
  };

  useEffect(() => {
    axios
      .get(`${BASE_URL}/api/communities/my-comments?page=${params.page}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((res) => {
        const { totalPages, comments } = res.data.data;
        setTotalPageCnt(totalPages);
        setComments(comments);
      })
      .catch((err) => console.error(err));
  }, [accessToken, params.page]);

  return (
    <>
      <div className="mb-8 flex flex-col gap-4 overflow-y-auto px-4">
        {comments.map((item, key) => (
          <CommentItem key={key} item={item} />
        ))}
      </div>
      <Pagination totalPageCount={totalPageCnt} currentPage={Number(params.page) || 1} onChange={createPageURL} />
    </>
  );
}
