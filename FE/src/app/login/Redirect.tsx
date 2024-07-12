"use client";

import axios from "axios";
import { useSearchParams, useRouter } from "next/navigation";
import { useEffect } from "react";
import { useAuthActions, useAuthStore } from "../../slices/auth.slice";
import { io } from "socket.io-client";
import { connectSocket, disconnectSocket } from "./Socket";

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL!;

export default function Redirect({}) {
  const params = useSearchParams();
  const router = useRouter();
  const { login } = useAuthActions();

  const handleLogin = async () => {
    const code = params.get("code");
    const res = await axios.get(`${BASE_URL}/api/users/login?code=${code}`);
    const { id: userId, nickname, token: accessToken } = res.data.data;
    // login(userId, nickname, accessToken);
    handleSocket(userId);
    router.push("/");
  };

  const handleSocket = (userId: number) => {
    const socket = new WebSocket(
      "ws://ec2-3-35-135-21.ap-northeast-2.compute.amazonaws.com:8080/socket/notifications/1",
    );
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
