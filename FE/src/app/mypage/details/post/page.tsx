import PostItem from "./PostItem";

export default function MyPagePost() {
  return (
    <div className="mb-8 flex flex-col gap-4 overflow-y-auto px-4">
      <PostItem />
      <PostItem />
      <PostItem />
      <PostItem />
      <PostItem />
      <PostItem />
    </div>
  );
}
