"use client";

import axios from "axios";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export default function Login({}) {
  const params = useSearchParams();

  const handleLogin = async () => {
    const code = params.get("code");
    const res = await axios.get(`${BASE_URL}/api/users/login?code=${code}`);
    console.log(res.data);
  };

  useEffect(() => {
    handleLogin();
  }, []);

  return <div>로그인</div>;
}
