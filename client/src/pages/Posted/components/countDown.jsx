import React, { useState, useEffect } from "react";
import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
import { deleteData } from "../../../api/deleteData";
dayjs.extend(duration);

const Countdown = ({ expireDate, id }) => {
  const [remainingTime, setRemainingTime] = useState("");
  useEffect(() => {
    const intervalId = setInterval(() => {
      const currentTime = dayjs();
      const diff = dayjs(expireDate).diff(currentTime);

      if (diff <= 0) {
        clearInterval(intervalId);
        setRemainingTime("Expired");
        //delete Interview
        deleteData(`/interviews/${id}/deleteInterview`);
      } else {
        const duration = dayjs.duration(diff);
        const days = duration.days();
        const hours = duration.hours();
        const minutes = duration.minutes();
        const seconds = duration.seconds();
        setRemainingTime(
          `${days} days, ${hours} hrs, ${minutes} min, ${seconds} sec`
        );
      }
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, [expireDate]);

  return (
    <>
      <span className="text-xs"> {remainingTime} left</span>
    </>
  );
};

export default Countdown;
