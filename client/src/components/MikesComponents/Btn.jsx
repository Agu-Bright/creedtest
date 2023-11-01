import { CircularProgress } from "@mui/material";
import React from "react";

const Btn = ({ text, type, className, onClick, toggle, tp, loading }) => {
  return (
    !toggle && (
      <button
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
        type={tp}
        className={`w-full lg:w-max capitalize ${
          type == 1
            ? "border border-primary-500 text-primary-500"
            : "bg-primary-500 text-white outline-none"
        } rounded-md px-6 py-2 items-center  h-max w-full lg:w-max ${className}`}
        onClick={onClick}
      >
        {text}
        {loading && (
          <span style={{ paddingLeft: "5px" }}>
            {" "}
            <CircularProgress size={17} sx={{ color: "#71717a" }} />{" "}
          </span>
        )}
      </button>
    )
  );
};

export default Btn;
