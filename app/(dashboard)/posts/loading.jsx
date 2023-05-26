import React from "react";
import { FadeLoader } from "react-spinners";

const loading = () => {
  return (
    <div className="loader_wrapper">
      <FadeLoader />
    </div>
  );
};

export default loading;
