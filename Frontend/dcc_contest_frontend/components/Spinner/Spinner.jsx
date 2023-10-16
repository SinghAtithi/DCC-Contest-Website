import React from "react";

const Spinner = () => {
  return (
    <div className="flex justify-center items-center h-[75vh]">
      <div className="border-t-4 border-white border-solid h-12 w-12 rounded-full animate-spin"></div>
    </div>
  );
};

export default Spinner;
