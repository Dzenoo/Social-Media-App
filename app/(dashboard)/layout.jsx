import Sidebar from "@/components/Sidebar";
import React from "react";

const layout = ({ children }) => {
  return (
    <>
      <Sidebar />
      {children}
    </>
  );
};

export default layout;
