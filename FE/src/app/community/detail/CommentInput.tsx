"use client";

import { Dispatch, SetStateAction, useState } from "react";
import { Button } from "../../_components/button/Button";

interface CommentInputProps {
  editable: boolean;
  editContent?: string;
  commentId?: number;
  setIsEdit?: Dispatch<SetStateAction<boolean>>;
  handleEdit?: (commentId: number, comment: string) => void;
  handleSave?: (comment: string) => void;
}

export default function CommentInput({
  editable,
  editContent,
  commentId,
  setIsEdit,
  handleEdit,
  handleSave,
}: CommentInputProps) {
  const [comment, setComment] = useState(editContent ?? "");

  return (
    <div className="flex items-end gap-2">
      <textarea
        rows={4}
        className="w-full flex-grow resize-none overflow-hidden overflow-y-auto rounded-lg border border-gray-30 px-2.5 py-2.5 text-sm text-gray-90 outline-none focus:border-primary"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      />
      <div className="flex flex-shrink-0 flex-col gap-2">
        {editable && (
          <Button
            size="small"
            types="gray"
            onClick={() => {
              setIsEdit && setIsEdit(false);
            }}
          >
            취소
          </Button>
        )}
        <Button
          types={`${comment.length > 0 ? "primary" : "gray"}`}
          disabled={comment.length < 1}
          size="small"
          onClick={() => {
            if (comment.length < 1) return;
            if (editable && handleEdit) handleEdit(commentId!, comment);
            else if (handleSave) handleSave(comment);
            setComment("");
            if (editable && setIsEdit) setIsEdit(false);
          }}
        >
          등록
        </Button>
      </div>
    </div>
  );
}
