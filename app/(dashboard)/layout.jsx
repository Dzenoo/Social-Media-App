"use client";
import Sidebar from "@/components/Navbar/Sidebar";
import { getSession, useSession } from "next-auth/react";
import { FadeLoader } from "react-spinners";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const layout = ({ children }) => {
  const token = JSON.parse(localStorage.getItem("userdata")).token;
  const { data: session } = useSession();
  const [isLoading, setisLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    getSession().then((session) => {
      if (!session) {
        router.replace("/");
      } else {
        setisLoading(false);
      }
    });
  }, [router]);

  if (isLoading) {
    return (
      <div className="loader_wrapper">
        <FadeLoader />
      </div>
    );
  }

  return (
    <div className="layout">
      {session?.user || token ? (
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
