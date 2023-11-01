import React from "react";

const Btn = ({ text, type, className, onClick, disabled }) => {
  return (
    <button
      disabled={disabled}
      className={`w-full lg:w-max capitalize ${
        type == 1
          ? "border border-primary-500 text-primary-500"
          : "bg-primary-500 text-white"
      } rounded-md px-4 py-2 ${className}`}
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export default Btn;
