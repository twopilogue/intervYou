import CommunityItem from "./CommunityItem";

import { CommunityConfig } from "../../interfaces/community.interface";

interface CommunityFrameProps {
  communities: CommunityConfig[];
}

export default function CommunityFrame({ communities }: CommunityFrameProps) {
  return (
    <div className="flex flex-col gap-4">
      {communities.length > 0 ? (
        <>
          {communities.map((item, key) => {
            return <CommunityItem item={item} key={key} />;
          })}
        </>
      ) : (
        <>작성된 글이 없습니다.</>
      )}
    </div>
  );
}
