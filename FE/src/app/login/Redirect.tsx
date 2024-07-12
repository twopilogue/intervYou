"use client";

import axios from "axios";
import { useSearchParams, useRouter } from "next/navigation";
import { useEffect } from "react";
import { useAuthActions, useAuthStore } from "../../slices/auth.slice";
import { io } from "socket.io-client";
import { connectSocket } from "./Socket";

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
    router.push("/");
  };

  useEffect(() => {
    handleLogin();
  }, []);

  useEffect(() => {
    const options = {
      transports: ["websocket"],
    };
    const socket = io(`${BASE_URL}/socket/notifications/1`, options);

    socket.on("connect", () => {
      console.log("WebSocket connected.");
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  return null;
}
