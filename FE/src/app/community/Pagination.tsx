import { useEffect } from "react";
import { usePagination } from "../../hooks/usePagination";

interface PaginationProps {
  totalPageCount: number;
  currentPage: number;
  onChange: (pageNumber: number | string) => void;
}

const Page = ({ page, selected, onClick }) => {
  return (
    <div
      className={`${selected ? "border-none bg-primary text-white" : "bg-white text-gray-90 hover:bg-gray-10"} flex h-8 cursor-pointer items-center justify-center border border-gray-40 px-3 leading-tight`}
      onClick={onClick}
    >
      {page}
    </div>
  );
};

export default function Pagination({ totalPageCount, currentPage, onChange }: PaginationProps) {
  const { pages, isFirstGroup, isLastGroup, handleClickPage, handleClickLeft, handleClickRight } = usePagination({
    totalPageCount,
    limitPageCount: 5,
    currentPage,
    onChange,
  });

  useEffect(() => {}, [pages]);

  return (
    <nav className="flex w-full flex-col items-center py-4">
      <ul className="inline-flex -space-x-px text-sm [&>li>a]:ms-0 [&>li>a]:flex [&>li>a]:h-8 [&>li>a]:items-center [&>li>a]:justify-center [&>li>a]:border [&>li>a]:border-gray-40 [&>li>a]:px-3 [&>li>a]:leading-tight">
        <li>
          <a
            onClick={handleClickLeft}
            className={`${isFirstGroup ? "cursor-default bg-gray-20 text-gray-60" : "hover:bg-gray-10"} rounded-s-lg`}
          >
            Previous
          </a>
        </li>
        {pages.map((page, key: number) => {
          return <Page key={key} page={page} selected={page === currentPage} onClick={handleClickPage} />;
        })}
        <li>
          <a
            onClick={handleClickRight}
            className={`${isLastGroup ? "cursor-default bg-gray-20 text-gray-60" : "hover:bg-gray-10"} rounded-e-lg`}
          >
            Next
          </a>
        </li>
      </ul>
    </nav>
  );
}
