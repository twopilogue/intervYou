import CommentItem from "./CommentItem";

export default function MyPageComment() {
  return (
    <div className="mb-8 flex flex-col gap-4 overflow-y-auto px-4">
      <CommentItem />
      <CommentItem />
      <CommentItem />
      <CommentItem />
      <CommentItem />
      <CommentItem />
    </div>
  );
}
