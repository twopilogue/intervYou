import { forwardRef } from "react";
import { Button } from "../../button/Button";

interface ModalConfirmProps {
  types: "save" | "edit" | "delete" | "withdraw";
  onClose: () => void; // 취소
  onConfirm: () => void; // 확인
}

const info: {
  [key: string]: {
    message: string;
    color: "primary" | "secondary" | "gray" | "danger";
  };
} = {
  save: {
    message: "등록하시겠습니까?",
    color: "primary",
  },
  edit: {
    message: "수정하시겠습니까?",
    color: "primary",
  },
  delete: {
    message: "삭제하시겠습니까?",
    color: "danger",
  },
  withdraw: {
    message: "탈퇴하시겠습니까?",
    color: "danger",
  },
};

const ModalConfirm = forwardRef(({ types, onClose, onConfirm }: ModalConfirmProps, ref) => {
  return (
    <div className="absolute left-2/4 top-2/4 flex h-48 w-64 -translate-x-2/4 -translate-y-2/4 flex-col items-center justify-center gap-8 rounded-2xl bg-white shadow-3xl">
      <span className="absolute top-16 text-sm">{info[types].message}</span>
      <div className="absolute bottom-4 flex gap-4 *:min-w-16">
        <Button types="gray" size="small" onClick={onClose}>
          취소
        </Button>
        <Button types={info[types].color} size="small" onClick={onConfirm}>
          확인
        </Button>
      </div>
    </div>
  );
});

ModalConfirm.displayName = "ModalConfirm";

export default ModalConfirm;
