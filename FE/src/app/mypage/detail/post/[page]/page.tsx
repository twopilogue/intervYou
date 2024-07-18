"use client";

import { useEffect, useState } from "react";
import PostItem from "../MyCommunityItem";
import axios from "axios";
import { useAuthStore } from "../../../../../slices/auth.slice";
import Pagination from "../../../../_components/pagination/Pagination";
import { CommunityConfig } from "../../../../../interfaces/community.interface";
import { useRouter } from "next/navigation";

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export default function MyPagePost({ params }: { params: { page: string } }) {
  const router = useRouter();
  const accessToken = useAuthStore((state) => state.accessToken);
  const [communities, setCommunities] = useState<CommunityConfig[]>([]);
  const [totalPageCnt, setTotalPageCnt] = useState(1);

  const createPageURL = (pageNumber: number | string) => {
    router.push(`${pageNumber}`);
  };

  useEffect(() => {
    axios
      .get(`${BASE_URL}/api/communities/my-posts?page=${params.page}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((res) => {
        const { totalPages, communities } = res.data.data;
        setTotalPageCnt(totalPages);
        setCommunities(communities);
      })
      .catch((err) => console.error(err));
  }, [accessToken, params.page]);

  return (
    <>
      <div className="mb-8 flex flex-col gap-4 overflow-y-auto px-4">
        {communities.map((item, key) => {
          return <PostItem key={key} item={item} />;
        })}
      </div>
      <Pagination totalPageCount={totalPageCnt} currentPage={Number(params.page) || 1} onChange={createPageURL} />
    </>
  );
}
