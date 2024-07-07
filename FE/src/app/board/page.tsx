import { Button } from "../_components/button/Button";
import { SearchField } from "../_components/input/SearchField";
import BoardFrame from "./BoardFrame";

export default function Board({}) {
  return (
    <div className="flex h-full flex-col *:mx-auto *:w-full [&>*:not(:nth-child(1))]:max-w-[1440px]">
      <div className="mx-auto mb-4 flex w-full items-center bg-lightblue px-4 py-8">
        <div className="mx-auto w-full max-w-[1440px] px-4">
          <span className="font-bold">커뮤니티</span>
        </div>
      </div>
      <div className="mb-4 flex w-full gap-4 px-4">
        <div className="w-full flex-1">
          <SearchField name="search" placeholder="검색어를 입력하세요." />
        </div>
        <Button>새 글 작성</Button>
      </div>
      <div className="mb-8 h-full overflow-y-auto px-4">
        <BoardFrame />
      </div>
    </div>
  );
}
