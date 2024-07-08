export default function PostItem({}) {
  return (
    <div className="flex cursor-pointer flex-col gap-2 rounded-2xl border border-gray-30 p-6">
      <span className="text-xs text-gray-50">2024/06/25(날짜)</span>
      <span className="text-base font-bold text-gray-90">GPT가 이런 질문을 했는데요. (제목)</span>
      <span className="text-sm text-gray-70">어떤 답변이 가장 좋은 답변일까요? (내용)</span>
    </div>
  );
}
