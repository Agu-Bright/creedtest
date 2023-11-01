import React, { useState, useEffect } from "react";
import { fetchData } from "../../../api/fetchData";
const backgroundStyle = {
  background:
    "conic-gradient(from 180deg at 50% 50%, #FFFFFF 0deg, #FFFFFF 60.65deg, #FFF2AE 93.75deg, #FFEF9A 166.87deg, #FFFCEB 305.62deg, #FFFFFF 360deg)",
  // filter: "blur(0.8px)",
  backdropFilter: "blur(2.09px)",
  position: "absolute",
  inset: 0,
  width: "100%",
  height: "100%",
  zIndex: 1,
};

const gradientTextStyle = {
  background: "linear-gradient(180deg, #76A0C0 39.06%, #02101B 100%)",
  webKitBackgroundClip: "text",
  backgroundClip: "text",
  color: "transparent",
};

const TotalSummary = ({ title, summary, state, projectLength=0, interviewLength=0, interviewApplicants=0, totalProject=0 }) => {
  return (
    <div className="relative pt-3 pb-3 lg:mb-3 lg:py-4 lg:border-[3px] lg:border-solid lg:border-[#fff]">
      <div style={backgroundStyle} />
      <div className="z-[2] relative lg:flex lg:items-center lg:px-8">
        <h1 className="text-base font-semibold m-0 text-center mb-2 lg:text-2xl">
          {title}
        </h1>
        {title === "Interviews Summary" && (
          <div className="pl-3 pr-3 flex flex-col gap-1 lg:flex-row lg:items-center lg:flex-1 lg:justify-evenly">
            <div className="flex justify-between items-center lg:flex-col-reverse">
              <b className="text-sm">No. of Applicants</b>
              <p className="m-0 font-interbolder lg:text-2xl xl:text-3xl">
                {interviewApplicants}
              </p>
            </div>
            <div className="flex justify-between items-center lg:flex-col-reverse">
              <b className="text-sm">No. of Interview Posted</b>
              <p className="m-0 font-interbolder lg:text-2xl xl:text-3xl">
                {interviewLength}
              </p>
            </div>
            <div className="flex justify-between items-center lg:flex-col-reverse">
              <b className="text-sm">No. of visitors the last 30days</b>
              <p className="m-0 font-interbolder lg:text-2xl xl:text-3xl">0</p>
            </div>
          </div>
        )}
        {title === "Projects Summary" && (
          <div className="pl-3 pr-3 flex flex-col gap-1 lg:flex-row lg:items-center lg:flex-1 lg:justify-evenly">
            <div className="flex justify-between items-center lg:flex-col-reverse">
              <b className="text-sm">No. of Applicants</b>
              <p className="m-0 font-interbolder lg:text-2xl xl:text-3xl">
                {totalProject}
              </p>
            </div>
            <div className="flex justify-between items-center lg:flex-col-reverse">
              <b className="text-sm">No. of Project Posted</b>
              <p className="m-0 font-interbolder lg:text-2xl xl:text-3xl">
                {projectLength}
              </p>
            </div>
            <div className="flex justify-between items-center lg:flex-col-reverse">
              <b className="text-sm">No. of visitors the last 30days</b>
              <p className="m-0 font-interbolder lg:text-2xl xl:text-3xl">0</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TotalSummary;
