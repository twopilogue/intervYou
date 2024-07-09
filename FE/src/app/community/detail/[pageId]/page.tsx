"use client";

import { useState } from "react";
import { Button } from "../../../_components/button/Button";
import CommentItem from "../CommentItem";

export default function BoardDetail({}) {
  const [comment, setComment] = useState("");
  return (
    <div className="flex h-full w-full flex-col overflow-y-auto *:mx-auto *:w-full *:max-w-[1280px]">
      <div className="flex flex-col gap-2 border-b border-gray-40 p-4">
        <span className="text-base font-bold text-gray-90">GPT가 이런 질문을 했는데요. (제목)</span>
        <div className="flex justify-between *:text-xs *:text-gray-50">
          <span>작성자</span>
          <span>2024/06/06</span>
        </div>
      </div>
      <div className="px-4 py-8">
        <span className="mb-8 block text-sm text-gray-90">어떤 답변이 가장 좋은 답변일까요?</span>
        <div className="mb-8">
          <div className="rounded-2xl bg-gray-10 p-8">
            <span className="text-sm text-gray-60">왜 저희 회사에 입사하고 싶나요?</span>
          </div>
        </div>
      </div>
      <div className="px-4">
        <span className="block pb-4 text-sm font-bold text-gray-90">댓글</span>
        <div className="flex items-end gap-2 border-t border-gray-40 py-4">
          <textarea
            rows={4}
            className="w-full flex-grow resize-none overflow-hidden overflow-y-auto rounded-lg border border-gray-30 px-2.5 py-2.5 text-sm text-gray-90 outline-none focus:border-primary"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
          <div className="flex-shrink-0">
            <Button types={`${comment.length > 0 ? "primary" : "gray"}`} disabled={comment.length < 1} size="small">
              등록
            </Button>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <CommentItem depth={0} />
          <CommentItem depth={1} />
          <CommentItem depth={2} />
          <CommentItem depth={3} />
          <CommentItem depth={4} />
          <CommentItem depth={5} />
          <CommentItem depth={6} />
          <CommentItem depth={7} />
        </div>
      </div>
    </div>
  );
}
