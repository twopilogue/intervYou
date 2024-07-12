"use client";

import axios from "axios";
import { useSearchParams, useRouter } from "next/navigation";
import { useEffect } from "react";
import { useAuthActions, useAuthStore } from "../../slices/auth.slice";
import { io } from "socket.io-client";

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

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
    const socket = io(`${BASE_URL}/socket/notifications/${userId}`, { transports: ["websocket", "polling"] });
    console.log(`${BASE_URL}/socket/notifications/${userId}`);

    socket.on("connect", () => {
      console.log(socket.id);
    });
  };

  useEffect(() => {
    handleLogin();
  }, []);

  return null;
}
