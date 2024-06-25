import axios from "axios";

const HomePage = () => {
  const test = () => {
    axios
      .get(process.env.NEXT_PUBLIC_API_BASE_URL + "/api/test")
      .then((res) => console.log(res))
      .catch((err) => console.error(err));
  };
  return (
    <div>
      <div>Welcome to Next.js!</div>
      <div>
        <button onClick={test}>버튼</button>
      </div>
    </div>
  );
};

export default HomePage;
