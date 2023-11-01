import React from "react";
import { moneyFormat } from "../../../functions/moneyFormat";
import service_data from "../../../assets/data/ServicesData";
import Service from "../../Dashboards/browse/Service";

const ServiceDescription = ({ service }) => {
	return (
		<div className="bg-white mt-2 p-2 lg:p-6 lg:pb-3">
			<div className="gap-4 lg:grid lg:grid-cols-2 lg:gap-6 lg:pb-3">
				<div className="mb-4 lg:mb-0">
					<p className="m-0 p-0 font-inter text-base text-gray-500">NAME</p>
					<p className="m-0 p-0 text-base font-inter">
						{service?.createdBy?.name}
					</p>
				</div>
				<div className="mb-4 lg:mb-0">
					<p className="m-0 p-0 font-inter text-base text-gray-500">SERVICE</p>
					<p className="m-0 p-0 text-base font-inter">{service?.name}</p>
				</div>
				<div className="mb-4 lg:mb-0">
					<p className="m-0 p-0 font-inter text-base text-gray-500">PRICE</p>
					<p className="m-0 p-0 text-base font-inter">
						{`${moneyFormat(Number(service?.minimumPrice))} to ${moneyFormat(
							Number(service?.maximumPrice)
						)}`}
					</p>
				</div>
				<div className="mb-4 lg:mb-0">
					<p className="m-0 p-0 font-inter text-base text-gray-500">LOCATION</p>
					<p className="m-0 p-0 text-base font-inter">{service?.location}</p>
				</div>
				<div className="mb-4 lg:mb-0">
					<p className="m-0 p-0 font-inter text-base text-gray-500">SKILLS</p>
					<p className="m-0 p-0 text-base font-inter">
						{service?.skills?.map((skill) => skill + ", ")}
					</p>
				</div>
				<div className="">
					<p className="m-0 p-0 font-inter text-base text-gray-500">DURATION</p>
					<p className="m-0 p-0 text-base font-inter">
						{service?.duration} {service?.selectDuration}
					</p>
				</div>
			</div>
			<div className="mt-5 mb-2">
				<p className="m-0 p-0 font-inter text-base text-gray-500">
					DESCRIPTION
				</p>
				<p className="m-0 p-0 text-base font-inter">{service?.description}</p>
			</div>
			{/* <div className='mt-5 mb-2 lg:mb-0 lg:mt-8'>
        <p className='m-0 p-0 font-inter text-base text-gray-500 mb-3'>OTHER SERVICES FROM TONYE</p>
        <div className='lg:grid lg:grid-cols-2 lg:gap-x-4 lg:gap-y-1'>
          {service_data.slice(0, 4).map((obj, key) => (
            // <GridChild key={key} obj={obj} />
            <Service key={key} obj={obj} className='border-solid border-1 border-gray-500 rounded-lg hover:border-primary-500' />
          ))}
        </div>
      </div> */}
		</div>
	);
};

export default ServiceDescription;
