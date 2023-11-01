import { useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../../assets/logo-img/Creedlance logo without slogan black.png";
import { ChevronLeftIcon } from "@heroicons/react/20/solid";
import { AddJobContext } from "../../contexts/AddJobContext";
import { LoaderContext } from "../../contexts/LoaderContext";
import { AnnouncementContext } from "../../contexts/AnnouncementContext";

const PreviewJob = () => {
  const navigate = useNavigate();
  //postedsuccessfully

  const {
    occupationValue,
    skillsets,
    paybasis,
    jobTitle,
    jobDescription,
    bidding,
    jobType,
    jobLocation,
    jobBudget,
    addJob,
    files,
  } = useContext(AddJobContext);
  const { loading, setLoading } = useContext(LoaderContext);
  const { checkAnnouncement } = useContext(AnnouncementContext);
  useEffect(() => {
    !jobTitle && navigate("/Postjob_creedlancers");
  }, []);
  return (
    <div
      className="box-border w-full bg-white lg:pb-5 min-h-screen"
      style={{
        backgroundImage:
          "linear-gradient(158.57deg,#ffffff 14.09%,#faf3e0 24.75%,#f9f1dc 43.12%,#f9f0db 74.72%)",
      }}
    >
      <div className="lg:w-[90%] lg:mx-auto max-w-[1300px] pt-4">
        <img
          src={Logo}
          alt="creedlance-logo"
          className="w-1/2 object-contain block my-3 lg:w-32 lg:mb-16 mx-auto lg:mx-0"
        />
      </div>
      <h1 className="text-center font-inter text-2xl mt-10">
        Are these details correct?
      </h1>
      <div className="bg-white lg:bg-[#f0f0f0] lg:shadow-xl lg:w-[55%] lg:mx-auto p-4 lg:p-6 lg:rounded-xl lg:mt-10">
        <Link
          className="bg-[#daa520] flex items-center justify-center w-fit text-white border-none rounded-2xl p-1 pr-3 text-xs sm:text-sm	font-inter"
          to="/Postjob_creedlancers/final_step"
        >
          <ChevronLeftIcon className="w-6" />
          Go back
        </Link>
        <div className="mt-3 lg:mt-5">
          <h2 className="text-lg font-inter m-0 p-0 lg:text-xl">{jobTitle}</h2>
          <div className="flex items-center gap-x-3 flex-wrap mt-3 lg:gap-y-1">
            <p className="text-sm font-inter text-gray-600 m-0">
              <strong className="font-intermedium">Occupation: </strong>
              {occupationValue.occupation}
            </p>
            <p className="text-sm font-inter text-gray-600 m-0">
              <strong className="font-intermedium">Job type: </strong>
              {jobType}
            </p>
            <p className="text-sm font-inter text-gray-600 m-0">
              <strong className="font-intermedium">Budget: </strong>
              {jobBudget} - {paybasis}
            </p>
            <p className="text-sm font-inter text-gray-600 m-0">
              <strong className="font-intermedium">Job location: </strong>
              {jobLocation.lga}, {jobLocation.state}
            </p>
          </div>
        </div>
        <p className="m-0 p-0 text-sm mt-4 font-inter text-gray-700 lg:text-base lg:mt-6 whitespace-pre-line">
          {jobDescription}
        </p>
        <div className="mt-5 bg-gray-50 p-2 rounded-md lg:mt-6">
          <p className="font-intermedium m-0 p-0 text-sm text-gray-700 lg:text-base">
            Attachments
          </p>
          <ul className="font-inter text-sm m-0 p-0 text-gray-700">
            {files.length == 0 ? (
              <li>no Attachments</li>
            ) : (
              files.map((file) => <li>{file?.path}</li>)
            )}
          </ul>
        </div>
        <div className="mt-5 lg:mt-6">
          <p className="font-intermedium m-0 p-0 text-sm text-gray-700 lg:text-base">
            Skills
          </p>
          <ul className="pl-0 text-sm flex gap-2 flex-wrap">
            {skillsets.map((skill) => (
              <li className="flex items-center px-2 py-1 rounded-full text-white bg-[#e3b234]">
                {skill}
              </li>
            ))}
          </ul>
        </div>
        <div className="mt-10 lg:mt-6">
          <button
            disabled={loading}
            onClick={() => {
              if (
                occupationValue &&
                skillsets &&
                paybasis &&
                jobTitle &&
                jobDescription &&
                bidding &&
                jobType &&
                jobLocation &&
                jobBudget
              ) {
                addJob()
                navigate(
                  "/posted/projects"
                  );
                }
                // checkAnnouncement("job");
              }}
            className="bg-[#daa520] py-3 w-full rounded-md text-white text-sm lg:py-3 lg:text-base block text-center lg:w-fit lg:px-4 lg:ml-auto border-none"
          >
            Yes, post my project.
          </button>
        </div>
      </div>
    </div>
  );
};

export default PreviewJob;
