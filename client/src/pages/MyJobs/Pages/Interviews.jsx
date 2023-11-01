import { useState, Fragment, useEffect, useContext } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "swiper/css";
import Countdown from "../components/countDown";
import { deleteData } from "../../../api/deleteData";
import NoProject from "../components/NoProject";

import {
  BanknotesIcon,
  CalendarIcon,
  MapPinIcon,
  UserGroupIcon,
  PhotoIcon,
  ClockIcon,
  ChevronRightIcon,
  ChevronLeftIcon,
} from "@heroicons/react/24/outline";
import Btn from "../../../components/MikesComponents/Btn";
import { Dialog, Transition } from "@headlessui/react";
import { img6 } from "../../../assets/mike";
import Swal from "sweetalert2";
import { fetchData } from "../../../api/fetchData";
import { ModalContext } from "../../../contexts/ModalContext";
import { motion } from "framer-motion";
import { chatState } from "../../../contexts/ChatProvider";

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

function getday(date) {
  dayjs.extend(relativeTime);
  const a = dayjs(Date.now());
  return dayjs(date).from(a);
}

const Interviews = () => {
  const { showModal } = useContext(ModalContext);
  const [swipe, setSwipe] = useState();
  const [swipe2, setSwipe2] = useState();
  const [index, setIndex] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [interviews, setInterviews] = useState(null);
  const [update, setUpdate] = useState(false);
  const [loading, setLoading] = useState(null);

  function closeModal() {
    setIsOpen(false);
  }
  function openModal() {
    setIsOpen(true);
  }
  const { accessChat } = chatState();

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const response = await fetchData("/interviews/get-my-Interview");
        // console.log(response.interviews);
        if (response.interviews[0] === null) {
          setInterviews([]);
        }
        setInterviews(response.interviews);
        setLoading(false);
      } catch (error) {
        showModal(`${error}`, false);
      }
    })();
  }, []);

  const cancelInterview = async (id) => {
    try {
      // await deleteData(`/interviews/${id}/deleteInterview`)
      setUpdate(true);
      return true;
    } catch (error) {
      showModal(`${error}`, false);
      return false;
    }
  };

  if (loading) {
    return (
      <div
        id="mike"
        style={{
          width: "inherit",
          zIndex: 10000,
          overflow: "hidden",
        }}
        className="relative lg:mb-1 lg:py-2"
      >
        <motion.div
          initial={{ x: "-100%" }}
          animate={{ x: "100%" }}
          transition={{ repeat: "repeat", duration: 1 }}
          style={{ width: "100%" }}
          className="h-1 bg-primary-500"
        ></motion.div>
      </div>
    );
  }

  if (interviews && !interviews.length) {
    return (
      <NoProject
        content="you have no interview invites, you can browse for interviews and apply"
        action="Browse Interviews"
        link="/dashboard/browse/interviews"
      />
    );
  }

  return (
    <div className="text-zinc-700">
      {
        <>
          <h1 className="text-xl font-semibold border-b-4 border-primary-500 w-max mb-10">
            Total number of Interviews ({interviews && interviews.length})
          </h1>
          <Swiper
            spaceBetween={40}
            onSwiper={(swiper) => {
              setSwipe(swiper);
            }}
            onSlideChange={(swiper) => setIndex(swiper.activeIndex)}
          >
            {interviews &&
              interviews.map((interview) => (
                <SwiperSlide key={interview._id}>
                  <div className="mb-5 relative">
                    <h2 className="text-lg font-semibold mb-2 lg:mb-0 text-zinc-900">
                      {interview.title}
                    </h2>
                    <ul className="flex lg:gap-4 gap-2 capitalize text-zinc-500 flex-wrap text-xs md:text-sm">
                      <li className="flex items-center gap-1 lg:gap-2">
                        <BanknotesIcon className="h-4 lg:h-5" /> NGN{" "}
                        {interview.budget}
                      </li>
                      <li className="flex items-center gap-1 lg:gap-2">
                        <MapPinIcon className="h-4 lg:h-5" />{" "}
                        {interview.location}
                      </li>
                      <li className="flex items-center gap-1 lg:gap-2">
                        <UserGroupIcon className="h-4 lg:h-5" />{" "}
                        {interview.numberOfVacancies} Participants
                      </li>
                      <li className="flex items-center gap-1 lg:gap-2">
                        <CalendarIcon className="h-4 lg:h-5" /> Deadline:{" "}
                        {convertToHumanReadableDate(interview.date)}
                      </li>
                    </ul>
                    <div className="hidden bg-primary-500 p-2 rounded text-white md:absolute right-0 top-0 lg:flex gap-2 items-center">
                      <ClockIcon className="h-10 animate-pulse" />
                      <Countdown
                        expireDate={interview.date}
                        id={interview._id}
                      />
                    </div>
                  </div>
                  <div className="text-zinc-600 text-sm md:text-base">
                    <p className="max-w-3xl">{interview.companyDescription}</p>
                    <div className="mt-5">
                      <h4>Job Responsibilities:</h4>
                      <ul className=" list-disc pl-10 mt-1">
                        {interview.jobResponsibilities.map((responsibility) => (
                          <li>{responsibility}</li>
                        ))}
                      </ul>
                    </div>
                    <div className="mt-5">
                      <h4>Job Requirements:</h4>
                      <ul className=" list-disc pl-10 mt-1">
                        {interview.jobRequirements.map((requirement) => (
                          <li>{requirement}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  {/* {interview.photos &&  <div className="grid grid-cols-3 gap-4 lg:gap-10 my-5 lg:my-10">
              {interview?.photo.map(() => (
                <div
                  onClick={openModal}
                  className="bg-zinc-200 cursor-pointer text-zinc-600 rounded flex items-center justify-center py-10 lg:py-20"
                >
                  <PhotoIcon className="h-6" />
                </div>
              ))}
            </div>} */}
                  <div className="relative">
                    <small className=" capitalize text-zinc-500 ">
                      Posted {getday(`${interview.time}`)}
                    </small>
                    <div className="flex lg:flex-row flex-col gap-4 justify-between mt-2 mb-4 items-center">
                      <Btn
                        onClick={() => accessChat(interview.createdBy)}
                        text={"Chat with Employer"}
                      />

                      {/* <button 
                        onClick={() => {
                          Swal.fire({
                            icon: "warning",
                            title: "Delete Interview Invite",
                            text: "interview will be deleted permanently",
                            showConfirmButton: true,
                            confirmButtonText: "Delete",
                            confirmButtonColor:'rgb(218 165 32)',
                            showCancelButton: true,
                          }).then(async (res) => {
                            if (res.isConfirmed) {
                              const status = await cancelInterview(
                                interview._id
                              );
                              setInterviews((prev) =>
                                prev.filter(
                                  (items) => items._id !== interview._id
                                )
                              );
                              status &&
                                Swal.fire({
                                  icon: "success",
                                  title: "Interview Deleted",
                                  text: "The interview has been deleted",
                                  timer: 1500,
                                });
                            }
                          });
                        }}
                        className="border w-full lg:w-max border-red-500 rounded-lg px-6 py-3 text-red-500"
                      >
                        Delete Interview
                      </button> */}
                    </div>
                  </div>
                </SwiperSlide>
              ))}
          </Swiper>
        </>
      }

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

      {interviews && (
        <div className="flex justify-between items-center mt-10">
          <button className="lg:w-40" onClick={() => swipe.slidePrev()}>
            <ChevronLeftIcon className="h-6 md:hidden " />
            <span className="hidden md:block">Previous</span>
          </button>
          {swipe && (
            <ul className=" max-w-xs overflow-x-auto w-full flex gap-4">
              {interviews &&
                interviews.map((item, i) => {
                  i = i + 1;
                  return (
                    <li
                      onClick={() => swipe.slideTo(i - 1)}
                      className={`rounded-full ${
                        index == i - 1
                          ? "bg-zinc-600 text-zinc-200"
                          : "bg-zinc-200 text-zinc-600"
                      }    h-6 w-6 px-2 text-sm flex cursor-pointer items-center justify-center`}
                    >
                      {i}
                    </li>
                  );
                })}
            </ul>
          )}
          <button className="lg:w-40" onClick={() => swipe.slideNext()}>
            <ChevronRightIcon className="h-6 md:hidden " />
            <span className="hidden md:block">Next</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default Interviews;
