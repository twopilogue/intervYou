"use client";

import { useRouter } from "next/navigation";
import { SearchField } from "../../_components/input/SearchField";
import CommunityFrame from "../CommunityFrame";
import Pagination from "../../_components/pagination/Pagination";
import { Button } from "../../_components/button/Button";
import axios from "axios";
import { Suspense, useEffect, useState } from "react";
import { CommunityConfig } from "../../../interfaces/community.interface";

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export default function Community({ params }: { params: { page: string } }) {
  const router = useRouter();

  const [communities, setCommunities] = useState<CommunityConfig[]>([]);
  const [totalPageCnt, setTotalPageCnt] = useState<number>(1);
  const [currentPage, setCurrentPage] = useState<number>(Number(params.page) || 1);

  const createPageURL = (pageNumber: number | string) => {
    router.push(`${pageNumber}`);
  };

  useEffect(() => {
    axios
      .get(`${BASE_URL}/api/communities?page=${params.page}`)
      .then((res) => {
        const { totalPages, communities } = res.data.data;
        setTotalPageCnt(totalPages === 0 ? 1 : totalPages);
        setCommunities(communities);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <Suspense fallback={<>로딩중</>}>
      <div className="flex h-full flex-col *:mx-auto *:w-full [&>*:not(:nth-child(1))]:max-w-[1280px]">
        <div className="mx-auto mb-4 flex w-full items-center bg-lightblue px-4 py-8">
          <div className="mx-auto w-full max-w-[1280px] px-4">
            <span className="font-bold">커뮤니티</span>
          </div>
        </div>
        <div className="mb-4 flex w-full gap-4 px-4">
          <div className="w-full flex-1">
            <SearchField name="search" placeholder="검색어를 입력하세요." />
          </div>
          <Button onClick={() => router.push("/community/create")}>새 글 작성</Button>
        </div>
        <div className="h-full overflow-y-auto px-4">
          <CommunityFrame communities={communities} />
          <Pagination totalPageCount={totalPageCnt} currentPage={currentPage} onChange={createPageURL} />
        </div>
      </div>
    </Suspense>
  );
}
