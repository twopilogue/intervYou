"use client";

import { Button } from "../../_components/button/Button";
import { useRouter } from "next/navigation";

import ListItem from "./ListItem";
import { useMediaQuery } from "react-responsive";
import { useEffect, useState } from "react";

export default function ListFrame({}) {
  const router = useRouter();
  const isMobile = useMediaQuery({ maxWidth: 640 });
  const [mobile, setMobile] = useState(false);
  const handleCreate = () => {
    mobile ? router.push("/create") : router.push("/list");
  };
  useEffect(() => {
    setMobile(isMobile);
  }, [isMobile]);

  return (
    <div className="flex h-full w-full flex-col sm:max-w-64">
      <div className="flex h-24 w-full items-center px-4 *:w-full">
        <Button size="medium" onClick={handleCreate}>
          새로운 면접 시작하기
        </Button>
      </div>
      <span className="text-md w-full pl-4 font-bold">대화 목록</span>
      <div className="overflow-y-auto">
        {Array.from([1, 2, 3, 4, 5, 6, 7, 8, 9, 10], (id: number, key: number) => {
          return <ListItem key={key} title={`프론트엔드 모의 면접 ${id}`} id={id} />;
        })}
      </div>
    </div>
  );
}
