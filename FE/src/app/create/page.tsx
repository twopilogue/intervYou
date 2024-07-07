"use client";

import { ChangeEvent, useState } from "react";
import { InputField } from "../_components/input/InputField";
import { Button } from "../_components/button/Button";
import Radio from "./_components/Radio";
import CheckBox from "./_components/CheckBox";
import { useRouter } from "next/navigation";

export default function Create({}) {
  const router = useRouter();
  const [selected, setSelected] = useState(1);

  const handleRadio = (e: ChangeEvent<HTMLInputElement>) => {
    setSelected(Number(e.target.value));
  };

  return (
    <>
      <div className="mb-4 flex w-full items-center bg-lightblue px-4 py-8">
        <span>면접 시작하기</span>
      </div>
      <div className="mx-4 lg:flex lg:flex-row lg:gap-8">
        <div className="lg:w-2/5">
          <InputField name="job" label="직무" placeholder="직무를 작성해주세요." />
        </div>
        <div className="lg:w-3/5">
          <div className="mb-4 max-lg:mt-8">
            <span className="mb-2 block text-sm font-bold text-gray-90">질문 생성</span>
            <div className="flex flex-row gap-4">
              <Radio
                id="rdo1"
                name="rdo1"
                value={1}
                label="직접 입력"
                checked={selected === 1}
                onChange={handleRadio}
              />
              <Radio id="rdo2" name="rdo2" value={2} label="GPT 생성" checked={selected === 2} onChange={handleRadio} />
            </div>
          </div>
          {selected === 1 ? (
            <div className="flex w-full gap-2">
              <div className="flex-grow">
                <InputField name="question" placeholder="질문을 입력하세요." />
                <span className="mt-1 block text-xs text-gray-60">
                  최소 1개 ~ 최대 5개의 질문을 입력할 수 있습니다.
                </span>
              </div>
              <div className="w-18 flex-shrink-0">
                <Button size="small">추가</Button>
              </div>
            </div>
          ) : (
            <div>
              <div className="mb-4">
                <span className="mb-2 block text-sm font-bold text-gray-90">질문 수</span>
                <select className="mb-1 w-full rounded-lg border border-gray-30 px-2 py-1.5 text-sm text-gray-90 outline-none focus:border-primary">
                  {Array.from([1, 2, 3, 4, 5], (v: number, i: number) => {
                    return (
                      <option key={i} value={v}>
                        {v}
                      </option>
                    );
                  })}
                </select>
                <span className="block text-xs text-gray-60">최소 1개 ~ 최대 5개의 질문을 입력할 수 있습니다.</span>
              </div>
              <div>
                <span className="mb-2 block text-sm font-bold text-gray-90">질문 생성</span>
                <div className="flex flex-row gap-4">
                  <CheckBox id="cb1" name="cb1" value={1} label="인성" />
                  <CheckBox id="cb2" name="cb2" value={2} label="직무" />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="absolute flex w-full justify-center gap-4 px-4 *:min-w-32 max-sm:bottom-4 sm:bottom-8">
        <Button types="gray">취소</Button>
        <Button onClick={() => router.push("/chat")}>시작하기</Button>
      </div>
    </>
  );
}
