interface CommentItemProps {
  depth: number;
}

interface CommentProps {
  replied: boolean;
  isMine: boolean;
}

function Comment({ replied, isMine }: CommentProps) {
  return (
    <div className="flex w-full flex-col gap-2 p-2 text-sm">
      <div className="flex justify-between text-gray-50">
        <span>댓글 작성자</span>
        <span>2024/06/26</span>
      </div>
      <div className="rounded-lg py-2">
        <span className="text-gray-90">정답은 없습니다. (댓글 내용)</span>
      </div>
      <div className="flex justify-between">
        {replied ? (
          <span className="cursor-pointer text-gray-50 underline underline-offset-4">댓글 달기</span>
        ) : (
          <div />
        )}
        {isMine && (
          <div className="flex gap-2 *:cursor-pointer">
            <span className="text-gray-50 underline underline-offset-4">수정</span>
            <span className="text-danger-text underline underline-offset-4">삭제</span>
          </div>
        )}
      </div>
    </div>
  );
}

export default function CommentItem({ depth }: CommentItemProps) {
  const replied = depth === 0;
  return (
    <div className="min-w-[678px] border-b border-gray-20">
      {depth > 0 ? (
        <div className="flex items-center gap-2" style={{ paddingLeft: `${depth * 2.5}rem` }}>
          <div>
            <svg
              className="h-6 w-6 text-secondary"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="currentColor"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" /> <path d="M6 6v6a3 3 0 0 0 3 3h10l-5 -5m0 10l5 -5" />
            </svg>
          </div>
          <Comment replied={replied} isMine={true} />
        </div>
      ) : (
        <Comment replied={replied} isMine={false} />
      )}
    </div>
  );
}
