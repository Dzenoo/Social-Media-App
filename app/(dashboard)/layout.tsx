"use client";
import Sidebar from "@/components/Navbar/Sidebar";
import { FadeLoader } from "react-spinners";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const layout = ({ children }: { children: any }) => {
  const token =
    typeof window !== "undefined"
      ? JSON.parse(localStorage.getItem("userdata"))
      : null;

  const [isLoading, setisLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (!token) {
      router.replace("/");
    } else {
      setisLoading(false);
    }
  }, [router, token]);

  if (isLoading) {
    return (
      <div className="loader_wrapper">
        <FadeLoader />
      </div>
    );
  }

  return (
    <div className="layout">
      {token ? (
        <>
          <Sidebar />
          {children}
        </>
      ) : (
        <></>
      )}
    </div>
  );
};
export default layout;
