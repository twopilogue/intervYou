"use client";

interface Props {
  content: string;
  isMine: boolean;
  isFinished: boolean;
}

export default function Bubble({ content, isMine, isFinished }: Props) {
  return (
    <div className={`${isMine && "self-end"} flex min-w-min max-w-xl flex-col gap-2`}>
      <div className="flex items-end gap-2">
        <div
          className={`${isMine ? "order-2 rounded-tr-none bg-lightblue" : "order-1 rounded-tl-none bg-secondary"} flex rounded-3xl p-5`}
        >
          <span className="text-sm">{content}</span>
        </div>
        {isFinished && (
          <div
            className={` ${isMine ? "order-1" : "order-2"} cursor-pointer rounded-full bg-gray-10 p-2 hover:bg-gray-20`}
          >
            <svg className="h-6 w-6 text-gray-70" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
                d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
              />
            </svg>
          </div>
        )}
      </div>
      <div className={`${isMine ? "self-end" : ""} text-xs text-gray-70`}>09:00</div>
    </div>
  );
}
