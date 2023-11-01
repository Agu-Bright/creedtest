import React from 'react'

import { Link, useLocation } from "react-router-dom";
import Interviews from './Interviews';
import Projects from './Projects';

const JobsBody = () => {
  const location = useLocation();

  const navLinks = [
    { title: "jobs / projects", href: "/jobs/projects" },
    { title: "interviews", href: "/jobs/interviews" },
  ];
  return (
    <div
      id="mike"
      className=" lg:grid grid-cols-5 pb-16 lg:py-10 lg:px-20 text-zinc-800 mt-[68px] lg:mt-0"
    >
      <nav className="lg:border-r mb-10">
        <ul className="flex justify-center lg:flex-col lg:gap-4 capitalize text-xs lg:text-base px-4 sticky top-10">
          {navLinks.map(({ title, href }) => (
            <li
              key={title}
              className={
                location.pathname.includes(href)
                  ? "border-b-4 lg:border-b-0 lg:border-l-4 transition-all border-primary-500 text-primary-500"
                  : ""
              }
            >
              <Link className="px-4 " to={href}>
                {title}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <main className="col-span-4 px-6 lg:px-10">
        {location.pathname.includes("/jobs/projects") && <Projects />}
        {location.pathname == "/jobs/interviews" && <Interviews />}
      </main>
    </div>
  );
};

export default JobsBody;
