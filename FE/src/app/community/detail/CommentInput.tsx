"use client";

import { useState } from "react";
import { Button } from "../../_components/button/Button";

interface CommentInputProps {
  types: "save" | "edit" | "reply";
  editContent?: string;
  commentId?: number;
  setClose?: () => void;
  handleEdit?: (commentId: number, comment: string) => void;
  handleSave?: (comment: string, parentCommentId?: number) => void;
}

export default function CommentInput({
  types,
  editContent,
  commentId,
  setClose,
  handleEdit,
  handleSave,
}: CommentInputProps) {
  const [comment, setComment] = useState(editContent ?? "");

  return (
    <div className="flex w-full items-end gap-2">
      <textarea
        rows={4}
        className="w-full flex-grow resize-none overflow-hidden overflow-y-auto rounded-lg border border-gray-30 px-2.5 py-2.5 text-sm text-gray-90 outline-none focus:border-primary"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      />
      <div className="flex flex-shrink-0 flex-col gap-2">
        {types !== "save" && (
          <Button size="small" types="gray" onClick={() => setClose && setClose()}>
            취소
          </Button>
        )}
        <Button
          types={`${comment.length > 0 ? "primary" : "gray"}`}
          disabled={comment.length < 1}
          size="small"
          onClick={() => {
            if (comment.length < 1) return;
            if (types === "edit" && handleEdit) handleEdit(commentId!, comment);
            else if (handleSave) {
              if (types === "save") handleSave(comment);
              else if (types === "reply") handleSave(comment, commentId);
            }
            setComment("");
            setClose && setClose();
          }}
        >
          등록
        </Button>
      </div>
    </div>
  );
}
