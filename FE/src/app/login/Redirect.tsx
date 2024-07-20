"use client";

import axios from "axios";
import { useSearchParams, useRouter } from "next/navigation";
import { useEffect } from "react";
import { useAuthActions } from "../../slices/auth.slice";
import { connectSocket } from "./Socket";

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL!;
const SOCKET_URL = process.env.NEXT_PUBLIC_SOCKET_URL!;

export default function Redirect({}) {
  const params = useSearchParams();
  const router = useRouter();
  const { login } = useAuthActions();

  const handleLogin = async () => {
    const code = params.get("code");
    const res = await axios.get(`${BASE_URL}/api/users/login?code=${code}`);
    const { id: userId, nickname, token: accessToken } = res.data.data;
    login(userId, nickname, accessToken);
    handleSocket(userId);
    router.push("/");
  };

  const handleSocket = (userId: number) => {
    const socket = new WebSocket(`${SOCKET_URL}${userId}`);
    console.log(`연결 주소: ${SOCKET_URL}${userId}`);
    connectSocket(socket);

    socket.onopen = () => {
      console.log("connected");
    };

    socket.onclose = (event) => {
      console.log("disconnect");
      console.log(event);
    };
  };

  useEffect(() => {
    handleLogin();
  }, []);

  return null;
}
