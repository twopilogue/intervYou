"use client";

import { useState } from "react";
import { Button } from "../../_components/button/Button";

interface CommentInputProps {
  handleSave: (comment: string) => void;
}

export default function CommentInput({ handleSave }: CommentInputProps) {
  const [comment, setComment] = useState("");

  return (
    <div className="flex items-end gap-2 border-t border-gray-40 py-4">
      <textarea
        rows={4}
        className="w-full flex-grow resize-none overflow-hidden overflow-y-auto rounded-lg border border-gray-30 px-2.5 py-2.5 text-sm text-gray-90 outline-none focus:border-primary"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      />
      <div className="flex-shrink-0">
        <Button
          types={`${comment.length > 0 ? "primary" : "gray"}`}
          disabled={comment.length < 1}
          size="small"
          onClick={() => {
            if (comment.length < 1) return;
            handleSave(comment);
            setComment("");
          }}
        >
          등록
        </Button>
      </div>
    </div>
  );
}
