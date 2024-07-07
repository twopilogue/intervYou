"use client";

import { useMediaQuery } from "react-responsive";
import Create from "../create/page";
import ListFrame from "./_components/ListFrame";
import { useEffect, useState } from "react";

export default function List({}) {
  const isMobile = useMediaQuery({ maxWidth: 640 });
  const [mobile, setMobile] = useState(false);

  useEffect(() => {
    setMobile(isMobile);
  }, [isMobile]);

  return <>{mobile ? <ListFrame /> : <Create />}</>;
}
