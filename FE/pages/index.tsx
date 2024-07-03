import { Button } from "./_components/button/Button";

const REDIRECT_URL = process.env.NEXT_PUBLIC_REDIRECT_URL;
const CLIENT_ID = process.env.NEXT_PUBLIC_CLIENT_ID;

const HomePage = () => {
  const link = `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URL}&state=state`;
  return (
    <div>
      <h1 className="text-3xl font-bold underline">Hello world!</h1>
      <Button as="a" href={link} label="로그인"></Button>
    </div>
  );
};

export default HomePage;
