import Sidebar from "@/components/Navbar/Sidebar";
import React from "react";

const layout = ({ children }) => {
  return (
    <div className="layout">
      <Sidebar />
      {children}
    </div>
  );
};
export default layout;
