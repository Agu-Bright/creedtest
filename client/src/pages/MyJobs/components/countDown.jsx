import React, { useState, useEffect } from "react";
import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
import { deleteData } from "../../../api/deleteData";
dayjs.extend(duration);

const Countdown = ({ expireDate, id }) => {
	const [remainingTime, setRemainingTime] = useState("");
	const [days, setDays] = useState("");
	useEffect(() => {
		const intervalId = setInterval(() => {
			const currentTime = dayjs();
			const diff = dayjs(expireDate).diff(currentTime);

			if (diff <= 0) {
				clearInterval(intervalId);
				setRemainingTime("Expired");
				//delete Interview
				deleteData(`/interviews/${id}/deleteInterview`);
				setDays(null);
			} else {
				const duration = dayjs.duration(diff);
				const days = duration.days();
				const hours = duration.hours();
				const minutes = duration.minutes();
				const seconds = duration.seconds();
				setDays(days);
				setRemainingTime(
					` ${hours} hours, ${minutes} minutes, ${seconds} seconds`
				);
			}
		}, 1000);

		return () => {
			clearInterval(intervalId);
		};
	}, [expireDate]);

	return (
		<div className="flex-col text-xs">
			{days !== null && <div className="font-semibold">{days} Days,</div>}
			{remainingTime}
		</div>
	);
};

export default Countdown;
