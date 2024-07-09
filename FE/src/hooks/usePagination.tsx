import { useEffect, useRef, useState } from "react";

interface usePaginationProps {
  totalPageCount: number;
  limitPageCount: number;
  currentPage: number;
  onChange: (selectedPage: number) => void;
}

const range = (size: number, start: number) => {
  return Array(size)
    .fill(start)
    .map((x, y) => x + y);
};

// 모든 페이지를 5개(limitCount)씩 그룹지은 배열 생성하기 위한 함수
const createPagesGroupList = (totalPageCount: number, limitPageCount: number) => {
  const totalPagesGroupList = range(totalPageCount, 1);
  const pagesGroupList: number[][] = [];
  for (let i = 0; i < totalPagesGroupList.length; i += limitPageCount) {
    pagesGroupList.push(totalPagesGroupList.slice(i, i + limitPageCount));
  }
  return pagesGroupList;
};

// 현재 페이지가 속한 그룹의 index를 구하기 위한 함수
const getCurrentGroupIndex = (currentPage: number, limitPageCount: number) => {
  return Math.ceil(currentPage / limitPageCount) - 1;
};

export const usePagination = ({ totalPageCount, limitPageCount, currentPage, onChange }: usePaginationProps) => {
  const pagesGroupList = useRef<number[][]>(createPagesGroupList(totalPageCount, limitPageCount));
  const currentGroupIndex = useRef<number>(getCurrentGroupIndex(currentPage, limitPageCount));
  const [pages, setPages] = useState<number[]>(pagesGroupList.current[currentGroupIndex.current]);

  useEffect(() => {
    pagesGroupList.current = createPagesGroupList(totalPageCount, limitPageCount);
    currentGroupIndex.current = getCurrentGroupIndex(currentPage, limitPageCount);
    setPages(pagesGroupList.current[currentGroupIndex.current]);
  }, [totalPageCount]);

  const isFirstGroup = currentGroupIndex.current === 0;
  const isLastGroup = currentGroupIndex.current === pagesGroupList.current.length - 1;

  const handleClickPage = (event: any) => {
    const { textContent } = event.target;
    const selectedPage = Number(textContent);
    onChange(selectedPage); // 클릭한 페이지로 url변경
  };

  const handleClickLeft = () => {
    if (isFirstGroup) return;
    currentGroupIndex.current -= 1;
    setPages(pagesGroupList.current[currentGroupIndex.current]); // 이전 그룹으로 ui변경
    onChange(pagesGroupList.current[currentGroupIndex.current][limitPageCount - 1]); //현재 속한 그룹의 가장 마지막 페이지로 url변경
  };

  const handleClickRight = () => {
    if (isLastGroup) return;
    currentGroupIndex.current += 1;
    setPages(pagesGroupList.current[currentGroupIndex.current]); // 다음 그룹으로 ui변경
    onChange(pagesGroupList.current[currentGroupIndex.current][0]); //현재 속한 그룹의 가장 첫번째 페이지로 url변경
  };

  return { pages, isFirstGroup, isLastGroup, handleClickPage, handleClickLeft, handleClickRight };
};
