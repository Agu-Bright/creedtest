import React from "react";
import { moneyFormat } from "../../../functions/moneyFormat";
import { MapPinIcon, ClockIcon, EyeIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";

const Contact = ({ service }) => {
	console.log(service);
	return (
		<div className="hidden lg:block bg-white p-2 lg:p-4 2xl:p-6">
			<div className="flex items-center justify-between flex-wrap gap-x-3">
				<h1 className="text-lg font-intersemibold m-0 p-0 xl:text-xl xl:mb-1">
					{`${moneyFormat(Number(service?.minimumPrice))} to ${moneyFormat(
						Number(service?.maximumPrice)
					)}`}
				</h1>
				{/* <p className='m-0 p-0 font-intersemibold text-[#daa520] text-base'>{moneyFormat(4300000)}</p> */}
			</div>
			<div className="flex items-center gap-3 flex-wrap">
				<p className="m-0 p-0 flex items-center text-xs text-gray-500 gap-1">
					<ClockIcon className="h-5 w-5 text-gray-500" />
					Posted 1 hour
				</p>
				<p className="m-0 p-0 flex items-center text-xs text-gray-500 gap-1">
					<MapPinIcon className="h-5 w-5 text-gray-500" />
					{service?.location}
				</p>
				<p className="m-0 p-0 flex items-center text-xs text-gray-500 gap-1">
					<EyeIcon className="h-5 w-5 text-gray-500" />
					194 views
				</p>
			</div>
			{/* <div className='flex flex-col gap-y-3 mt-5'>
        <Link 
          to="/services/service1/feedback"
          className='border border-solid border-[#daa520] text-[#daa520] flex-1 text-center py-2 rounded-md text-base'
        >Reviews (1221)</Link>
        <Link 
          to="/services/service1"
          className='border border-solid border-[#daa520] bg-[#daa520] text-white flex-1 text-center py-2 rounded-md text-base'
        >Message</Link>
      </div> */}
		</div>
	);
};

export default Contact;
