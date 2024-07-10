interface AlertItemProps {}

export default function AlertItem() {
  return (
    <div className="flex justify-between gap-2 border-b border-gray-40 px-4 py-2 text-sm">
      <span>[GPT가 이런 질문을 ...] 에 댓글이 달렸습니다.</span>
      <div className="flex items-center gap-2">
        <svg
          className="h-3.5 w-3.5 cursor-pointer text-gray-70"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /> <polyline points="22 4 12 14.01 9 11.01" />
        </svg>
        <svg className="h-4 w-4 cursor-pointer text-gray-70" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
          />
        </svg>
      </div>
    </div>
  );
}
