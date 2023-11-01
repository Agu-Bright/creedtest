import React, { useState, Fragment } from "react";
import { Link } from "react-router-dom";
import {
  XMarkIcon,
  Bars3Icon,
  BanknotesIcon,
  MapPinIcon,
  UserGroupIcon,
  CalendarIcon,
  StarIcon,
  ChatBubbleBottomCenterTextIcon,
  ArrowTopRightOnSquareIcon,
  PlusSmallIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";
import { Avatar, Rating } from "@mui/material";
import { EnvelopeIcon } from "@heroicons/react/24/solid";
import cardImage from "../../../assets/Dashboard/sary.png";
import interliningIcon from "../../../assets/Dashboard/interlining-icon.png";
import enterpriseIcon from "../../../assets/Dashboard/enterprise-icon.png";
import { img6 } from "../../../assets/mike";
import applicantImage from "../../../assets/dashboard/applicant.png";
import { ClockIcon } from "@heroicons/react/24/outline";
import { Dialog, Transition } from "@headlessui/react";
import { Swiper, SwiperSlide } from "swiper/react";
import Countdown from "../../Posted/components/countDown";
import UpdateModal from "./UpdateModal";
import Swal from "sweetalert2";
import { chatState } from "../../../contexts/ChatProvider";

function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
function convertToHumanReadableDate(dateString) {
  const date = new Date(dateString);
  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    timeZone: "UTC",
  };
  return date.toLocaleString("en-US", options);
}
const Card = ({
  page,
  interview,
  project,
  updateProject,
  deleteProject,
  deleteInterview,
  updateInterview,
}) => {
  const [showMenu, setShowMenu] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [swipe2, setSwipe2] = useState();
  //modal setup
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const { accessChat } = chatState();
  function closeModal() {
    setIsOpen(false);
  }
  function openModal() {
    setIsOpen(true);
  }

  const workers = [
    {
      name: "Maureen Russell",
      role: "Java Developer",
      isActive: true,
    },
    {
      name: "Annette Black",
      role: "Q&A Tester",
      isActive: false,
    },
  ];
  const navigate = useNavigate();

  return (
    <div className="bg-[#FFF9DA] p-4 relative">
      {location.pathname.includes("/assigned/interviews") && (
        <div
          style={{
            border: "1px solid #daa520",
            borderTopWidth: 0,
            borderTop: "none",
          }}
          className="flex bg-white h-10 mx-auto justify-center w-fit text-primary-500 rounded-[20px] px-4 relative rounded-t-none -top-4"
        >
          <div className="flex items-center gap-x-1 justify-center mt-1">
            <ClockIcon className="h-6 animate-pulse" />
            <Countdown expireDate={interview.date} id={interview._id} />
          </div>
        </div>
      )}
      <div className="flex justify-between items-center">
        <div className="flex space-x-2 items-center">
          {project && (
            <Avatar
              sx={{ width: 75, height: 75 }}
              src={project?.createdBy?.photo?.url}
              style={{ borderRadius: "50% !important" }}
              alt="avatar"
            />
          )}
          {interview && (
            <Avatar
              sx={{ width: 75, height: 75 }}
              src={interview?.createdBy?.photo?.url}
              style={{ borderRadius: "50% !important" }}
              alt="avatar"
            />
          )}
          <div className="flex flex-col">
            <h3 className="text-sm m-0 whitespace-nowrap text-ellipsis max-w-[90%] sm:text-base">
              {project?.createdBy.name}
              {interview?.createdBy.name}
            </h3>
            <div className="flex items-end">
              <img
                src={enterpriseIcon}
                alt=""
                className="h-5 object-contain sm:h-6"
              />
              <span className="text-xs m-0 font-intermedium">
                {" "}
                {project?.createdBy?.role}
                {interview?.createdBy?.role}
              </span>
            </div>
            {project && (
              <p className="text-xs m-0 sm:text-sm">
                {project &&
                  numberWithCommas(project?.createdBy.followers.length)}

                {project?.createdBy.followers.length > 1
                  ? " followers"
                  : " follower"}
              </p>
            )}
            {interview && (
              <p className="text-xs m-0 sm:text-sm">
                {interview &&
                  numberWithCommas(interview?.createdBy.followers.length)}

                {interview?.createdBy.followers.length > 1
                  ? " followers"
                  : " follower"}
              </p>
            )}{" "}
          </div>
        </div>
      </div>
      <h4 className="text-sm font-intermedium m-0 sm:text-base lg:mt-4">
        {project?.title}
        {interview?.title}
      </h4>
      <div className="flex items-center flex-wrap gap-x-3 mt-2">
        <div className="flex items-center gap-x-2">
          <BanknotesIcon className="h-5 lg:h-6" />
          {project && (
            <span className="text-xs lg:text-sm">N {project?.budget}</span>
          )}
          {interview && (
            <span className="text-xs lg:text-sm">N {interview?.budget}</span>
          )}{" "}
        </div>
        <div className="flex items-center gap-x-2">
          <MapPinIcon className="h-5 lg:h-6" />
          {project && (
            <span className="text-xs lg:text-sm">{project?.jobLocation}</span>
          )}
          {interview && (
            <span className="text-xs lg:text-sm">{interview?.location}</span>
          )}{" "}
        </div>
        <div className="flex items-center gap-x-2">
          <UserGroupIcon className="h-5 lg:h-6" />
          {project && (
            <span className="text-xs lg:text-sm">
              {" "}
              {project?.proposals?.length} Participants
            </span>
          )}
          {interview && (
            <span className="text-xs lg:text-sm">
              {" "}
              {interview?.Applications?.length} Participants
            </span>
          )}{" "}
        </div>
        <div className="flex items-center gap-x-2">
          <CalendarIcon className="h-5 lg:h-6" />
          {interview && (
            <span className="text-xs lg:text-sm">
              Deadline: {convertToHumanReadableDate(interview?.date)}
            </span>
          )}
          {project && (
            <span className="text-xs lg:text-sm">
              Deadline: {convertToHumanReadableDate(project?.expirationDate)}
            </span>
          )}
        </div>
      </div>
      <p className="text-[0.80rem] font-inter m-0 mt-1 line-clamp-4 block sm:text-sm lg:my-4 lg:text-base">
        {project?.description || interview?.companyDescription}
      </p>

      {/* <div className="flex items-center gap-x-4 my-3">
        <div className="flex items-center gap-x-1">
          <span>
            <StarIcon className="h-5" />
            <StarIcon className="h-5" />
            <StarIcon className="h-5" />
            <StarIcon className="h-5" />
            <StarIcon className="h-5" />
            <Rating value={Number(interview.ra)}/>
          </span>
          <span>0.0</span>
        </div>
        <div className="flex items-center gap-x-1">
          <ChatBubbleBottomCenterTextIcon className="h-5" />
          <span>0.0</span>
        </div>
      </div> */}

      {/* {page === "interviews" && (
        <div className='my-3 mb-6 lg:mb-8'>
          <div>
            <h5 className='text-sm m-0 sm:text-base'>Job Responsibilities:</h5>
            <ul className='m-0 mt-2 pl-6 gap-y-1 flex flex-col'>
              <li className='text-[0.80rem] sm:text-sm lg:text-base'>Lorem ipsum dolor sit amet consectetur adipisicing elit.</li>
              <li className='text-[0.80rem] sm:text-sm lg:text-base'>Lorem ipsum dolor sit amet consectetur adipisicing elit.</li>
              <li className='text-[0.80rem] sm:text-sm lg:text-base'>Lorem ipsum dolor sit amet consectetur adipisicing elit.</li>
            </ul>
          </div>
          <div className='mt-2 lg:mt-3'>
            <h5 className='text-sm m-0 sm:text-base'>Job Requirements:</h5>
            <ul className='m-0 mt-2 pl-6 gap-y-1 flex flex-col'>
              <li className='text-[0.80rem] sm:text-sm lg:text-base'>Lorem ipsum dolor sit amet consectetur adipisicing elit.</li>
              <li className='text-[0.80rem] sm:text-sm lg:text-base'>Lorem ipsum dolor sit amet consectetur adipisicing elit.</li>
              <li className='text-[0.80rem] sm:text-sm lg:text-base'>Lorem ipsum dolor sit amet consectetur adipisicing elit.</li>
            </ul>
          </div>
        </div>
      )} */}

      {interview?.photo && (
        <div className="flex gap-3 lg:mt-3 lg:gap-4">
          {interview.photo.map((item) => (
            <div
              key={item.public_id}
              onClick={openModal}
              className="w-[32%] rounded overflow-hidden relative cursor-pointer"
            >
              <img
                src={item.url}
                alt=""
                className="w-full h-full object-contain rounded"
              />
              {Number(interview?.photo.length) - 3 > 0 && i === 2 && (
                <div className="absolute inset-0 bg-[rgba(0,0,0,0.4)] flex items-center justify-center text-white font-intermedium text-2xl sm:text-4xl sm:font-inter">
                  +{Number(interview?.photo.length) - 3}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
      {page === "project-details" && (
        <React.Fragment>
          <h5 className="text-sm m-0 font-semibold mt-5 sm:text-base">
            Worker
          </h5>
          <div className="flex flex-col sm:flex-row sm:items-center gap-y-3 mt-3 sm:gap-y-0 lg:mt-3 justify-between">
            <div className="flex items-center gap-x-2">
              <Avatar
                sx={{ width: 50, height: 50 }}
                src={project.acceptedPerson?.photo?.url}
                style={{ borderRadius: "50% !important" }}
                alt="avatar"
              />
              <div>
                <h6 className='m-0 font-medium text-sm relative sm:text-base after:content-[""] after:h-2 after:w-2 after:rounded-full after:bg-[#3BE243] after:absolute after:-right-4 after:top-[.38rem]'>
                  {project.acceptedPerson.name}
                </h6>
                <p className="m-0 text-xs sm:text-sm">
                  {" "}
                  {project.acceptedPerson?.city}{" "}
                </p>
              </div>
              <div
                onClick={() => accessChat(project.acceptedPerson._id)}
                className="ml-5 -mt-2 text-[#374957] lg:-mt-4 lg:ml-7"
              >
                <EnvelopeIcon className="h-5 lg:h-6" />
              </div>
            </div>
            <Link
              to={`/dashboard/browse/projects/${project._id}`}
              className="bg-white px-4 py-2 gap-x-4 flex items-center justify-between text-xs text-primary-500 rounded border-[1px] border-primary-500 border-solid sm:py-3 sm:text-sm lg:text-base"
            >
              See Full Details
              <img
                src={interliningIcon}
                alt=""
                className="h-4 object-contain lg:h-5"
              />
            </Link>
          </div>
        </React.Fragment>
      )}
      {page === "interview-details" && (
        <div className="mt-6">
          <div className="flex items-center">
            <h5 className="text-sm m-0 font-semibold sm:text-base flex-1">
              Participants {`(${interview.acceptedPersons.length})`}
            </h5>
            <h5 className="text-sm m-0 font-semibold sm:text-base flex-1 pl-[15vw] sm:pl-[21vw] lg:pl-[10vw]">
              Roles
            </h5>
            <div className="flex justify-end">
              <button
                onClick={() => navigate(`/applicants/${interview._id}`)}
                className="bg-[#DAA52033] text-xs m-0 font-medium sm:text-base w-fit border-none py-1 sm:px-3 flex items-center gap-x-1 mt-2 text-black"
              >
                <PlusSmallIcon className="h-5 sm:h-6" />
                Add Participant
              </button>
            </div>
          </div>
          <div
            className="lg:gap-y-1 lg:flex lg:flex-col"
            style={{ height: "25vh", overflowY: "scroll" }}
          >
            {interview.acceptedPersons.map((worker) => (
              <div className="flex items-center bg-[#E9EFFC66] py-2">
                <div className="flex items-center gap-x-2 flex-1 pl-2">
                  {/* <img
                    src={applicantImage}
                    alt=""
                    className="h-6 w-6 rounded-full"
                  /> */}
                  <Avatar
                    sx={{ width: 50, height: 50 }}
                    src={worker?.photo?.url}
                    style={{ borderRadius: "50% !important" }}
                    alt="avatar"
                  />
                  <div>
                    <Link
                      className={`m-0 font-medium text-xs text-black overflow-hidden relative flex sm:text-sm lg:text-base after:content-[""] after:h-[6px] after:w-[6px] after:rounded-[50%] items-center gap-x-2 after:flex-shrink-0 ${
                        worker.active
                          ? "after:bg-[#3BE243]"
                          : "after:bg-[#FF5F5F8A]"
                      }`}
                    >
                      {worker.name}
                    </Link>
                  </div>
                  <div
                    onClick={() => accessChat(worker._id)}
                    className="ml-2 mr-1 mt-2 text-[#374957] sm:ml-5 sm:mr-0 lg:mt-1 lg:ml-7"
                  >
                    <EnvelopeIcon className="h-4 lg:h-6" />
                  </div>
                </div>
                <p className="m-0 flex-1 text-xs whitespace-nowrap sm:text-sm lg:text-base">
                  {worker.role}
                </p>

                <div className="flex justify-end pr-2">
                  <button className="border-none bg-transparent text-right sm:text-sm lg:text-base">
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div id="mike" className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full  items-center justify-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel
                  className={
                    "bg-white p-6 overflow-hidden rounded-2xl w-max h-max relative"
                  }
                >
                  <div
                    onClick={() => swipe2.slidePrev()}
                    className="absolute cursor-pointer top-1/2 left-8 z-30 p-2 rounded-full bg-zinc-500/50 text-white"
                  >
                    <ChevronLeftIcon className="h-6" />
                  </div>
                  <div
                    onClick={() => swipe2.slideNext()}
                    className="absolute cursor-pointer top-1/2 right-8 z-30 p-2 rounded-full bg-zinc-500/50 text-white"
                  >
                    <ChevronRightIcon className="h-6" />
                  </div>
                  <Swiper
                    onSwiper={(swiper) => setSwipe2(swiper)}
                    className=" max-w-2xl"
                    spaceBetween={40}
                  >
                    {[1, 2, 3].map(() => (
                      <SwiperSlide style={{ width: "max-content" }}>
                        <img
                          as="img"
                          src={img6}
                          style={{ maxHeight: "70vh" }}
                          className="w-max object-contain rounded transform text-left align-middle shadow-xl transition-all"
                        />
                      </SwiperSlide>
                    ))}
                  </Swiper>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
      {open && (
        <UpdateModal
          open={open}
          handleClose={handleClose}
          handleOpen={handleOpen}
          project={project}
          interview={interview}
          updateInterview={updateInterview}
          updateProject={updateProject}
        />
      )}
    </div>
  );
};

export default Card;

// <div className="relative">
// {showMenu ? (
//   <XMarkIcon
//     className="h-6 cursor-pointer sm:h-8"
//     onClick={() => setShowMenu(false)}
//   />
// ) : (
//   <Bars3Icon
//     className="h-6 cursor-pointer sm:h-8"
//     onClick={() => setShowMenu(true)}
//   />
// )}
// {showMenu && (
//   <div className="bg-white py-3 absolute right-0 w-28">
//     <button
//       onClick={() => handleOpen()}
//       className="bg-white border-none font-inter px-3 block py-1"
//     >
//       Edit
//     </button>
//     {project && (
//       <>
//         {/* <button
//           onClick={() => deleteProject(project._id)}
//           className="bg-white border-none font-inter px-3 py-1 block"
//         >
//           Delete
//         </button> */}
//         <button
//           className="bg-white border-none font-inter px-3 py-1 block"
//           onClick={() => {
//             Swal.fire({
//               icon: "warning",
//               title: "Delete Project",
//               text: "Project will be deleted permanently",
//               showConfirmButton: true,
//               confirmButtonColor: "rgb(218 165 32)",
//               confirmButtonText: "Delete",
//               showCancelButton: true,
//             }).then(async (res) => {
//               if (res.isConfirmed) {
//                 const status = await deleteProject(project._id);
//                 status &&
//                   Swal.fire({
//                     icon: "success",
//                     title: "Project Deleted",
//                     text: "The Project has been deleted",
//                     timer: 1500,
//                     confirmButtonColor: "rgb(218 165 32)",
//                   });
//               }
//             });
//           }}
//         >
//           Delete
//         </button>
//       </>
//     )}
//     {interview && (
//       <>
//         {/* <button
//           onClick={() => deleteInterview(interview._id)}
//           className="bg-white border-none font-inter px-3 py-1 block"
//         >
//           Delete
//         </button> */}
//         <button
//           className="bg-white border-none font-inter px-3 py-1 block"
//           onClick={() => {
//             Swal.fire({
//               icon: "warning",
//               title: "Delete Project",
//               text: "Project will be deleted permanently",
//               showConfirmButton: true,
//               confirmButtonColor: "rgb(218 165 32)",
//               confirmButtonText: "Delete",
//               showCancelButton: true,
//             }).then(async (res) => {
//               if (res.isConfirmed) {
//                 const status = await deleteInterview(interview._id);
//                 status &&
//                   Swal.fire({
//                     icon: "success",
//                     title: "Interview Deleted",
//                     text: "The Interview has been deleted",
//                     timer: 1500,
//                     confirmButtonColor: "rgb(218 165 32)",
//                   });
//               }
//             });
//           }}
//         >
//           Delete
//         </button>
//       </>
//     )}
//   </div>
// )}
// </div>
