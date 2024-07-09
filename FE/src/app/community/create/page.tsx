"use client";

import { useState } from "react";
import { InputField } from "../../_components/input/InputField";
import TextArea from "./TextArea";
import { Button } from "../../_components/button/Button";

export default function BoardCreate({}) {
  const [contents, setContents] = useState("");
  return (
    <div className="flex h-full flex-col *:mx-auto *:w-full [&>*:not(:nth-child(1))]:max-w-[640px]">
      <div className="mx-auto mb-4 flex w-full items-center bg-lightblue px-4 py-8">
        <div className="mx-auto w-full max-w-[640px]">
          <span className="font-bold">게시글 작성</span>
        </div>
      </div>
      <div className="flex h-full flex-col gap-4 max-sm:px-4">
        <div className="h-min">
          <InputField name="title" label="제목" placeholder="제목을 입력하세요." />
        </div>
        <div className="h-full">
          <TextArea
            name="contents"
            placeholder="내용을 입력하세요."
            value={contents}
            onChange={(e) => setContents(e.target.value)}
          />
        </div>
        <div className="mb-8">
          <span className="mb-2 block text-sm font-bold text-gray-90">첨부된 질문</span>
          <div className="rounded-2xl bg-gray-10 p-8">
            <span className="text-sm text-gray-60">왜 저희 회사에 입사하고 싶나요?</span>
          </div>
        </div>
        <div className="mb-8 flex w-full justify-center gap-4 px-4 *:min-w-32 max-sm:bottom-4 sm:bottom-8">
          <Button types="gray">취소</Button>
          <Button>등록하기</Button>
        </div>
      </div>
    </div>
  );
}
