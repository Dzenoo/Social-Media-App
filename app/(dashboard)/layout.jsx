import Sidebar from "@/components/Sidebar";
import React from "react";

const layout = ({ children }) => {
  return (
    <div className="layout">
      <Sidebar />
      <main>{children}</main>
    </div>
  );
};

export default layout;
