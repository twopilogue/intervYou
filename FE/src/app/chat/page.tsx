"use client";

import Bubble from "./_components/Bubble";
import { Button } from "../_components/button/Button";
import { TextArea } from "../_components/input/TextArea";
import { useState } from "react";

export default function ChatDetails({}) {
  const [input, setInput] = useState("");

  return (
    <div className="mx-auto max-w-[1024px]">
      <div className="flex h-[calc(100%-4rem-4rem)] flex-col overflow-y-auto p-4">
        <Bubble isMine={false} isFinished={false} content="채팅 내용입니다." />
        <Bubble isMine={true} isFinished={false} content="채팅 내용입니다." />
        <Bubble isMine={false} isFinished={true} content="채팅 내용입니다." />
        <Bubble isMine={true} isFinished={true} content="채팅 내용입니다." />
      </div>
      <div className="flex-glow fixed bottom-0 flex h-16 w-full justify-center gap-2 p-2">
        <div className="w-full">
          <TextArea
            placeholder="내용을 입력하세요."
            name="input"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
        </div>
        <div className="flex-shrink-0">
          {input.length > 0 ? (
            <Button size="small">전송</Button>
          ) : (
            <Button size="medium">
              <svg
                className="h-6 w-6 text-white"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path stroke="none" d="M0 0h24v24H0z" /> <circle cx="7" cy="12" r="3" />{" "}
                <circle cx="17" cy="12" r="3" /> <line x1="7" y1="15" x2="17" y2="15" />
              </svg>
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
