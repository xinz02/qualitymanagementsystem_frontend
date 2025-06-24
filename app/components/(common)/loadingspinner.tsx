import React from "react";

const LoadingSpinner = () => {
  return (
    <div className="flex items-center justify-center h-screen w-full z-10">
      <span className="loading loading-spinner text-[#C67A83] loading-xl"></span>
    </div>
  );
};

export default LoadingSpinner;
