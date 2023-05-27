"use client";
import Sidebar from "@/components/Navbar/Sidebar";
import { useSession } from "next-auth/react";
import { FadeLoader } from "react-spinners";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const layout = ({ children }) => {
  const token = JSON.parse(localStorage.getItem("userdata"));
  const [isLoading, setisLoading] = useState(false);
  const router = useRouter();
  const { data: session } = useSession();

  // useEffect(() => {
  //   if (!session?.user && !token) {
  //     router.replace("/");
  //   } else {
  //     setisLoading(false);
  //   }
  // }, [router, session, token]);

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
