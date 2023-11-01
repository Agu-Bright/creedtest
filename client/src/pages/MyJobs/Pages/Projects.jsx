import { useState, Fragment, useContext, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import {
  BanknotesIcon,
  CalendarIcon,
  MapPinIcon,
  UserGroupIcon,
  PhotoIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  StarIcon,
  ChatBubbleBottomCenterIcon,
  BookmarkIcon,
} from "@heroicons/react/24/outline";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { ModalContext } from "../../../contexts/ModalContext";
import Btn from "../../../components/MikesComponents/Btn";
import { Link } from "react-router-dom";
import { img1, img6 } from "../../../assets/mike";
import { Dialog, Transition } from "@headlessui/react";
import { fetchData } from "../../../api/fetchData";
import Swal from "sweetalert2";
import NoProject from "../components/NoProject";
import { chatState } from "../../../contexts/ChatProvider";
import { notificationState } from "../../../contexts/NotificationProvider";
import { updateData } from "../../../api/updateData";
import { CircularProgress } from "@mui/material";

// get day algorithm
function getday(date) {
  dayjs.extend(relativeTime);
  const a = dayjs(Date.now());
  return dayjs(date).from(a);
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

const Projects = () => {
  // const navigate = useNavigate();
  const { showModal } = useContext(ModalContext);
  const [swipe, setSwipe] = useState();
  const [swipe2, setSwipe2] = useState();
  const [index, setIndex] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [projects, setProjects] = useState(null);
  const [loading, setLoading] = useState(null);
  const { accessChat, socket } = chatState();
  const [done, setDone] = useState(false);
  const [state, setState] = useState(false);
  const [currentPhoto, setCurrenPhoto] = useState();
  function closeModal() {
    setIsOpen(false);
    setCurrenPhoto();
  }

  function openModal(photos) {
    setCurrenPhoto(photos);
    setIsOpen(true);
  }

  useEffect(() => {
    socket &&
      socket.on("job submitted", (project) => {
        console.log(project);
      });
  });
  //get projects
  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const response = await fetchData("/projects/get-my-jobs");
        setProjects(response.posts.reverse());
        setLoading(false);
      } catch (error) {
        showModal(`${error}`, false);
      }
    })();
  }, [state]);

  // const createNotification = async (notification) => {
  //   fetch(
  //     `/creedlance/notifications/create-notification`,
  //     token
  //       ? {
  //           method: "POST",
  //           body: JSON.stringify(notification),
  //           headers: {
  //             "Content-Type": "application/json",
  //             Authorization: `Bearer ${token}`,
  //           },
  //         }
  //       : {}
  //   ).then(async (res) => {
  //     const data = await res.json();
  //     console.log(data);
  //     return true;
  //   });
  // };

  const handleDone = async (id, createdBy) => {
    try {
      await updateData(`/projects/${id}/submit-project`).then(async (res) => {
        if (!res.ok) {
          showModal(res.message, false);
        }
        setState((prev) => !prev);
      });
      // createNotification({
      //   receiver: createdBy,
      //   type: "job-completed",
      //   title: "Job Completed",
      //   description: `${user.name} have completed his project`,
      //   project: id,
      // });
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

  if (projects && !projects.length) {
    return (
      <NoProject
        content="you have no jobs/projects, you can browse for jobs and apply"
        action="Browse Projects"
        link="/dashboard/browse/projects"
      />
    );
  }

  return (
    <div className="text-zinc-700">
      <Swiper
        spaceBetween={40}
        onSwiper={(swiper) => {
          setSwipe(swiper);
        }}
        onSlideChange={(swiper) => setIndex(swiper.activeIndex)}
      >
        {projects &&
          projects.map((job) => (
            <SwiperSlide>
              <div className="mb-5 relative">
                <h2 className="text-lg font-semibold mb-2 lg:mb-0 text-zinc-900">
                  {job.title}{" "}
                  {done && " done with project, awaiting confirmation"}
                </h2>
                <ul className="flex lg:gap-4 gap-2 capitalize text-zinc-500 flex-wrap text-xs md:text-sm">
                  <li className="flex items-center gap-1 lg:gap-2">
                    <BanknotesIcon className="h-4 lg:h-5" /> NGN {job.budget}
                  </li>
                  <li className="flex items-center gap-1 lg:gap-2">
                    <MapPinIcon className="h-4 lg:h-5" /> {job?.jobLocation}
                  </li>
                  <li className="flex items-center gap-1 lg:gap-2">
                    <UserGroupIcon className="h-4 lg:h-5" />{" "}
                    {job?.acceptedPerson ? 1 : 0} Participants
                  </li>
                  <li className="flex items-center gap-1 lg:gap-2">
                    <CalendarIcon className="h-4 lg:h-5" /> Deadline:{" "}
                    {convertToHumanReadableDate(job?.expirationDate)}
                  </li>
                </ul>
              </div>
              <div className="text-zinc-600 text-sm md:text-base">
                <p className="max-w-3xl pb-5">{job.description}</p>
                <ul className="text-xs flex gap-2 flex-wrap">
                  {job.skills.map((skill) => (
                    <li className="flex items-center px-4 py-0.5 rounded-full text-primary-500 bg-primary-100">
                      {skill}
                    </li>
                  ))}
                </ul>
                <div className="flex justify-between text-sm mt-2">
                  <div className="flex gap-2 items-center">
                    <div className="flex gap-1 items-center">
                      {[1, 2, 3, 4, 5].map(() => (
                        <StarIcon className="h-4 " />
                      ))}
                      0.0
                    </div>
                  </div>
                </div>
              </div>

              {job?.photos?.length ? (
                <div className="grid grid-cols-3 gap-4 lg:gap-10 my-5 lg:my-10">
                  {job?.photos.map((item) => (
                    <div
                      onClick={() => openModal(job?.photos)}
                      className="bg-zinc-200 cursor-pointer text-zinc-600 rounded flex items-center justify-center py-10 lg:py-20"
                    >
                      <img
                        as="img"
                        src={item?.url}
                        style={{ maxHeight: "70vh" }}
                        className="w-max object-contain rounded transform text-left align-middle shadow-xl transition-all"
                      />
                      {/* <PhotoIcon className="h-6" /> */}
                    </div>
                  ))}
                </div>
              ) : (
                ""
              )}

              <div className="relative">
                <small className="lg:absolute right-0 capitalize text-zinc-500 top-3">
                  Posted {getday(`${job?.createdAt}`)}
                </small>
                <div className="flex lg:flex-row flex-col w-full gap-4 mt-2 mb-4">
                  <Btn
                    text={"Chat with Employer"}
                    onClick={() => accessChat(job.createdBy)}
                  />
                  {job.submitted && (
                    <>
                      <Btn
                        loading={true}
                        type={1}
                        text="Awaiting Clients Review"
                      />{" "}
                    </>
                  )}
                  {!job.submitted && (
                    <Btn
                      onClick={() =>
                        Swal.fire({
                          icon: "question",
                          title: "Done with Job?",
                          text: "A notification will be sent to your employer informing them that the job has been completed",
                          showConfirmButton: true,
                          confirmButtonText: "Confirm",
                          confirmButtonColor: "rgb(218 165 32)",
                          showCancelButton: true,
                        }).then(async (res) => {
                          if (res.isConfirmed) {
                            const status = await handleDone(
                              job._id,
                              job.createdBy
                            );
                            // setProjects((prev) =>
                            //   prev.filter((items) => items._id !== job._id)
                            // );
                            status &&
                              Swal.fire({
                                icon: "success",
                                title: "Job Completed",
                                text: "Employer has been notified",
                                timer: 3000,
                              });
                          }
                        })
                      }
                      type={1}
                      text={"done with job"}
                    />
                  )}
                </div>
              </div>
            </SwiperSlide>
          ))}
      </Swiper>
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
                    {currentPhoto &&
                      isOpen &&
                      currentPhoto.map((item) => (
                        <SwiperSlide style={{ width: "max-content" }}>
                          <img
                            as="img"
                            src={item?.url}
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

      {projects && (
        <div className="flex justify-between items-center mt-10">
          <button className="lg:w-40" onClick={() => swipe.slidePrev()}>
            <ChevronLeftIcon className="h-6 md:hidden " />
            <span className="hidden md:block">Previous</span>
          </button>
          {swipe && (
            <ul className="max-w-xs overflow-x-auto flex gap-4 ">
              {projects.map((item, i) => {
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

export default Projects;
