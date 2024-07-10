import { forwardRef } from "react";
import AlertItem from "./AlertItem";

interface ModalAlertProps {
  onClose: () => void;
}

const ModalAlert = forwardRef(({ onClose }: ModalAlertProps) => {
  return (
    <div className="absolute top-0 h-full w-96 bg-white px-2 outline-none max-sm:h-full max-sm:w-full sm:right-0 sm:top-[4rem] sm:h-[calc(100%-4rem)]">
      <div className="relative my-8 flex w-full justify-center">
        <svg
          className="absolute left-0 h-6 w-6 cursor-pointer text-gray-90"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          onClick={onClose}
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M6 18L18 6M6 6l12 12" />
        </svg>
        <span className="font-bold">알림 목록</span>
      </div>
      <div className="flex h-[calc(100%-8rem)] flex-col overflow-y-auto [&>*:last-child]:border-none">
        <AlertItem />
        <AlertItem />
        <AlertItem />
        <AlertItem />
        <AlertItem />
        <AlertItem />
        <AlertItem />
        <AlertItem />
        <AlertItem />
        <AlertItem />
        <AlertItem />
        <AlertItem />
        <AlertItem />
        <AlertItem />
        <AlertItem />
        <AlertItem />
        <AlertItem />
        <AlertItem />
        <AlertItem />
        <AlertItem />
        <AlertItem />
        <AlertItem />
        <AlertItem />
        <AlertItem />
        <AlertItem />
      </div>
    </div>
  );
});

ModalAlert.displayName = "ModalAlert";

export default ModalAlert;
