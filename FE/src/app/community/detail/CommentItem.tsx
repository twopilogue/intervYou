"use client";

import { useState } from "react";
import { CommentConfig } from "../../../interfaces/community.interface";
import { useAuthStore } from "../../../slices/auth.slice";
import CommentInput from "./CommentInput";

interface CommentItemProps {
  comment: CommentConfig;
  handleEdit: (commentId: number, comment: string) => void;
  handleDelete: (commentId: number) => void;
}

export default function CommentItem({ comment, handleEdit, handleDelete }: CommentItemProps) {
  const userNickname = useAuthStore((state) => state.nickname);
  const [isEdit, setIsEdit] = useState(false);
  const { isDelete, nickname, commentContent, createTime, commentId, parentCommentId, depth } = comment;

  const EditComment = () => {
    return (
      <div className="w-full px-2 py-4">
        <CommentInput
          editable={true}
          editContent={commentContent}
          setIsEdit={setIsEdit}
          commentId={commentId}
          handleEdit={handleEdit}
        />
      </div>
    );
  };

  const DeletedComment = () => {
    return (
      <div className="w-full px-2 py-4">
        <span className="text-sm text-gray-90">삭제된 댓글입니다.</span>
      </div>
    );
  };

  const Comment = () => {
    const replied = depth === 0;
    const isMine = nickname === userNickname;
    return (
      <div className="flex w-full flex-col gap-2 p-2">
        <div className="flex justify-between text-xs text-gray-50">
          <span>{nickname}</span>
          <span>{createTime.toString()}</span>
        </div>
        <div className="rounded-lg py-2 text-sm">
          <span className="text-gray-90">{commentContent}</span>
        </div>
        <div className="flex justify-between text-xs">
          {replied ? (
            <span className="cursor-pointer text-gray-50 underline underline-offset-4">댓글 달기</span>
          ) : (
            <div />
          )}
          {isMine && (
            <div className="flex gap-2 *:cursor-pointer">
              <span className="text-gray-50 underline underline-offset-4" onClick={() => setIsEdit(true)}>
                수정
              </span>
              <span
                className="text-danger-text underline underline-offset-4"
                onClick={() => handleDelete(comment.commentId)}
              >
                삭제
              </span>
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="min-w-[678px] border-b border-gray-20">
      {isDelete ? (
        <DeletedComment />
      ) : (
        <>
          {depth > 0 ? (
            <div className="flex items-center gap-2" style={{ paddingLeft: `${depth * 2.5}rem` }}>
              <div>
                <svg
                  className="h-6 w-6 text-secondary"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                  stroke="currentColor"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path stroke="none" d="M0 0h24v24H0z" /> <path d="M6 6v6a3 3 0 0 0 3 3h10l-5 -5m0 10l5 -5" />
                </svg>
              </div>
              {isEdit ? <EditComment /> : <Comment />}
            </div>
          ) : (
            <>{isEdit ? <EditComment /> : <Comment />}</>
          )}
        </>
      )}
    </div>
  );
}
