"use client";
import { Button } from "./_components/button/Button";
import Bubble from "./chat/_components/Bubble";
import { useEffect, useState } from "react";

const HomePage = () => {
  const [visibleEle, setVisibleEle] = useState<any[]>([]);

  useEffect(() => {
    Array.from([1, 2, 3, 4, 5]).forEach((_, index) => {
      setTimeout(() => {
        setVisibleEle((prev: any) => [...prev, index]);
      }, index * 500);
    });
  }, []);

  return (
    <div className="box-border flex h-full items-center gap-16 px-48">
      <div className="flex w-1/2 flex-col gap-8">
        <div>
          <div className="mb-4 text-4xl font-bold text-primary *:block">
            <span>Chatbots for</span>
            <span>Your Interview</span>
          </div>
          <div className="text-gray-70 *:block">
            <span>생성형 AI를 이용한</span>
            <span>면접 시뮬레이션 및 면접 커뮤니티</span>
          </div>
        </div>
        <div className="*:w-2/5">
          <Button>Sign Up</Button>
        </div>
      </div>
      <div className="flex w-1/2 flex-col">
        {Array.from([1, 2, 3, 4, 5]).map((_, index) => {
          return (
            <Bubble
              key={index}
              isFinished={false}
              isMine={index % 2 === 0 ? true : false}
              content="어쩌고"
              classProps={`opacity-0 ${visibleEle.includes(index) ? `animate-[slide-${index % 2 === 0 ? "left" : "right"}_1s_forwards]` : ""}`}
            />
          );
        })}
      </div>
    </div>
  );
};

export default HomePage;
