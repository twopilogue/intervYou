"use client";
import ListFrame from "./_components/ListFrame";
import { useMediaQuery } from "react-responsive";
import { useEffect, useState } from "react";

export default function ListLayout({ children }) {
  const isMobile = useMediaQuery({ maxWidth: 640 });
  const [mobile, setMobile] = useState(false);

  useEffect(() => {
    setMobile(isMobile);
  }, [isMobile]);

  return (
    <>
      {mobile ? (
        <>{children}</>
      ) : (
        <div className="flex h-full">
          <ListFrame />
          <div className="relative w-full border-l border-gray-40 max-sm:hidden">{children}</div>
        </div>
      )}
    </>
  );
}
