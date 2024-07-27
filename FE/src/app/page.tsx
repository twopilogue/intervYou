import Link from "next/link";
import { Button } from "./_components/button/Button";
import Bubble from "./chat/_components/Bubble";

const HomePage = () => {
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
        <Bubble isFinished={false} isMine content="어쩌고" classProps="animate-[slide-left_1s_100ms_forwards]" />
        <Bubble
          isFinished={false}
          isMine={false}
          content="어쩌고"
          classProps="animate-[slide-right_1s_200ms_forwards]"
        />
        <Bubble isFinished={false} isMine content="어쩌고" classProps="animate-[slide-left_1s_300ms]" />
        <Bubble
          isFinished={false}
          isMine={false}
          content="어쩌고"
          classProps="animate-[slide-right_1s_400ms_forwards]"
        />
        <Bubble isFinished={false} isMine content="어쩌고" classProps="animate-[slide-left_1s_500ms]" />
      </div>
    </div>
  );
};

export default HomePage;
