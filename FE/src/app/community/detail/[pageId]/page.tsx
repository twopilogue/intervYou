import axios from "axios";
import CommentItem from "../CommentItem";
import CommentInput from "../CommentInput";
import { CommunityConfig } from "../../../../interfaces/community.interface";

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export default async function CommunityDetail({ params }: { params: { pageId: number } }) {
  const res = await axios.get(`${BASE_URL}/api/communities/${params.pageId}`);
  const communityInfo: CommunityConfig = res.data.data;

  return (
    <div className="flex h-full w-full flex-col overflow-y-auto *:mx-auto *:w-full *:max-w-[1280px]">
      <div className="flex flex-col gap-2 border-b border-gray-40 p-4">
        <span className="text-base font-bold text-gray-90">{communityInfo.title}</span>
        <div className="flex justify-between *:text-xs *:text-gray-50">
          <span>{communityInfo.nickname}</span>
          <span>{communityInfo.createTime}</span>
        </div>
      </div>
      <div className="px-4 py-8">
        <span className="mb-8 block text-sm text-gray-90">{communityInfo.content}</span>
        <div className="mb-8">
          <div className="rounded-2xl bg-gray-10 p-8">
            <span className="text-sm text-gray-60">왜 저희 회사에 입사하고 싶나요?</span>
          </div>
        </div>
      </div>
      <div className="px-4">
        <span className="block pb-4 text-sm font-bold text-gray-90">댓글</span>
        <CommentInput />
        <div className="flex flex-col gap-2">
          {communityInfo.commentCount < 1 ? (
            <>작성된 댓글이 없습니다.</>
          ) : (
            <>{communityInfo.comments?.map((comment, key) => <CommentItem key={key} comment={comment} />)}</>
          )}
        </div>
      </div>
    </div>
  );
}
