import React from "react";
import { ClipLoader } from "react-spinners";

const SpinnerLoader = () => {
  const customSpinnerStyle = {
    borderWidth: "3px",
  };
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
      }}
    >
      <ClipLoader size={40} color="#009270" cssOverride={customSpinnerStyle} />
      {/* <ClipLoader size={40} color="#07b58d" /> */}
    </div>
  );
};

export default SpinnerLoader;
