import React, { useEffect, useRef, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import "./Tabs.css";
import { motion } from "framer-motion";
import { fetchData } from "../../../api/fetchData";

const Tabs = ({ active, secondary, state }) => {
  const location = useLocation();
  const renderCount = useRef(0);
  const AnimatedNavlink = motion(NavLink);
  const [assignedInterviewsLength, setAssignedInterviewsLength] = useState(0);
  const [assignedProjectLength, setAssignedProjectLength] = useState(0);

  const isActive = (path) => {
    return location.pathname.includes(path);
  };

  useEffect(() => {
    renderCount.current += 1;
  }, [location]);

  useEffect(() => {
    (async () => {
      const res = await fetchData("/projects/get-assigned-projects");
      setAssignedProjectLength(res.assignedPosts.length);
    })();
  }, [state]);

  useEffect(() => {
    (async () => {
      const res = await fetchData("/interviews/get-assigned-interviews");
      setAssignedInterviewsLength(res.myAssignedInterviews.length);
    })();
  }, [state]);

  return (
    <div
      style={{ margin: 0 }}
      className="bg-[#FFFEDD] flex item-center space-x-5 p-2 lg:flex-col lg:space-x-0 lg:bg-[#5A5A5A] lg:py-8 lg:rounded-tr-2xl lg:rounded-br-2xl lg:pl-0"
    >
      <AnimatedNavlink
        key="/assigned/projects"
        to="/assigned/projects"
        animate={
          window.innerWidth <= 1023
            ? isActive("/assigned/projects")
              ? { x: renderCount.current < 1 ? ["100%", "0%"] : 0 }
              : { x: renderCount.current < 1 ? ["0%", "110%"] : "110%" }
            : {}
        }
        transition={{
          type: "just",
          duration: renderCount.current < 1 ? 0.6 : 0,
        }}
        className={({ isActive }) =>
          isActive
            ? `text-sm flex items-center bg-[#A89870] text-white p-2 pr-4 lg:pr-3 space-x-12 rounded-md relative flex-1 justify-between before:content-[''] before:w-2 before:h-[40%] before:bg-[#DAA520] before:absolute lg:bg-[#807149] lg:rounded-none lg:rounded-tr-2xl lg:rounded-br-2xl ${
                renderCount.current < 1 && "active-tab-navlink"
              }`
            : "p-1 bg-[#455A64] text-white rounded-md flex items-center space-x-12 text-sm font-semibold pl-4 pr-1 flex-1 justify-between lg:bg-transparent"
        }
      >
        {({ isActive }) => (
          <>
            <span
              className={
                isActive
                  ? "w-[40px] sm:w-[60%] pl-4 font-semibold lg:text-lg"
                  : "w-[40px] sm:w-[70%] pl-0"
              }
            >
              Assigned Projects
            </span>
            <span
              className={
                !isActive
                  ? "text-[#D2ECBE] text-lg font-black flex-1 font-interbold text-right pr-3"
                  : "rounded-full p-[8px] border-white border-[1px] border-solid font-black text-[16px] text-right"
              }
            >
              {assignedProjectLength}
            </span>
          </>
        )}
      </AnimatedNavlink>
      <AnimatedNavlink
        key="/assigned/interviews"
        to="/assigned/interviews"
        animate={
          window.innerWidth <= 1023
            ? isActive("/assigned/interviews")
              ? { x: renderCount.current < 1 ? ["0%", "-107%"] : "-107%" }
              : { x: ["-100%", "0%"] }
            : {}
        }
        transition={{
          type: "just",
          duration: renderCount.current < 1 ? 0.6 : 0,
        }}
        className={({ isActive }) =>
          isActive
            ? `text-sm flex items-center bg-[#A89870] text-white p-2 pr-4 lg:pr-3 space-x-12 rounded-md relative flex-1 justify-between before:content-[''] before:w-2 before:h-[40%] before:bg-[#DAA520] before:absolute lg:bg-[#807149] lg:rounded-none lg:rounded-tr-2xl lg:rounded-br-2xl ${
                renderCount.current < 1 && "active-tab-navlink"
              }`
            : "p-1 bg-[#455A64] text-white rounded-md flex items-center space-x-12 text-sm font-semibold pl-4 pr-1 flex-1 justify-between lg:bg-transparent"
        }
      >
        {/* <span className='w-[30px]'>Interviews</span> */}
        {({ isActive }) => (
          <>
            <span
              className={
                isActive
                  ? "w-[40px] sm:w-[70%] pl-4 font-semibold lg:text-lg"
                  : "w-[40px] sm:w-[70%] pl-0"
              }
            >
              Assigned Interviews
            </span>
            <span
              className={
                !isActive
                  ? "text-[#D2ECBE] text-lg font-black flex-1 font-interbold text-right pr-3"
                  : "rounded-full p-[8px] border-white border-[1px] border-solid font-black text-[16px] text-right"
              }
            >
              {assignedInterviewsLength}
            </span>
          </>
        )}
      </AnimatedNavlink>
    </div>
  );
};

export default Tabs;
