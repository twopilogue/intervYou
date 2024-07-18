"use client";

import { useState } from "react";
import { InputField } from "../../_components/input/InputField";
import TextArea from "./TextArea";
import { Button } from "../../_components/button/Button";
import axios from "axios";
import { useAuthStore } from "../../../slices/auth.slice";
import { usePathname, useRouter } from "next/navigation";
import { Modal } from "@mui/base";
import ModalConfirm from "../../_components/modal/confirm/ModalConfirm";

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

interface CommunityCreateProps {
  editTitle?: string;
  editContent?: string;
  communityId?: number;
}

export default function CommunityCreate({ editTitle, editContent, communityId }: CommunityCreateProps) {
  const router = useRouter();
  const pathname = usePathname();
  const isEdit = pathname.includes("/edit");
  const accessToken = useAuthStore((state) => state.accessToken);
  const [title, setTitle] = useState(editTitle ?? "");
  const [content, setContent] = useState(editContent ?? "");
  const [confirm, setConfirm] = useState(false);

  const handleSave = () => {
    if (title.length < 1 || content.length < 1) return;
    if (isEdit) {
      // 수정
      axios
        .put(
          `${BASE_URL}/api/communities/${communityId}`,
          {
            title,
            content,
          },
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          },
        )
        .then(() => {
          setConfirm(false);
          router.push(`/community/detail/${communityId}`);
        })
        .catch((err) => console.error(err));
    } else {
      // 저장
      axios
        .post(
          `${BASE_URL}/api/communities`,
          {
            title,
            content,
          },
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          },
        )
        .then((res) => {
          setConfirm(false);
          const communityId = res.data.data.communityId;
          router.push(`/community/detail/${communityId}`);
        })
        .catch((err) => console.error(err));
    }
  };
  return (
    <>
      <div className="flex h-full flex-col *:mx-auto *:w-full [&>*:not(:nth-child(1))]:max-w-[640px]">
        <div className="mx-auto mb-4 flex w-full items-center bg-lightblue px-4 py-8">
          <div className="mx-auto w-full max-w-[640px]">
            <span className="font-bold">게시글 작성</span>
          </div>
        </div>
        <div className="flex h-full flex-col gap-4 max-sm:px-4">
          <div className="h-min">
            <InputField
              name="title"
              value={title}
              label="제목"
              placeholder="제목을 입력하세요."
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="h-full">
            <TextArea
              name="content"
              placeholder="내용을 입력하세요."
              value={content}
              onChange={(e) => setContent(e.target.value)}
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
            <Button
              types={title.length < 1 || content.length < 1 ? "gray" : "primary"}
              disabled={title.length < 1 || content.length < 1}
              onClick={() => setConfirm(true)}
            >
              등록하기
            </Button>
          </div>
        </div>
      </div>
      {confirm && (
        <Modal open={confirm}>
          <ModalConfirm types={isEdit ? "edit" : "save"} onClose={() => setConfirm(false)} onConfirm={handleSave} />
        </Modal>
      )}
    </>
  );
}
