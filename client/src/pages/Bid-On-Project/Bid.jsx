import React, { useState, useEffect, Fragment } from "react";
import "./Bid.css";
import WatchLaterIcon from "@mui/icons-material/WatchLater";
import { Link, useParams } from "react-router-dom";
import projectImage from "../../assets/Dashboard/project-detail-image.png";
import { AnimatePresence, motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { ReactPhotoCollage } from "react-photo-collage";
import AdminNav from "../../components/dashboard_nav/dashboard_nav";
import BrowseBanner from "../../components/dashboard/BrowseBanner";
import backgroundImage from "../../assets/Dashboard/tonyer.png";
import TextDescription from "./components/TextDescription";
import { Dialog, Transition } from "@headlessui/react";
import { Swiper, SwiperSlide } from "swiper/react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import Form from "./components/Form";
import ClientInfo from "./components/ClientInfo";
import { fetchData } from "../../api/fetchData";

const Bid = () => {
  const navigate = useNavigate();
  const [fixTab, setFixTab] = useState(false);
  const [showReportProject, setShowReportProject] = useState(false);
  const numberOfPhotos =
    window.innerWidth < 375
      ? [2]
      : window.innerWidth < 580
      ? [2, 2]
      : window.innerWidth < 768
      ? [3, 2]
      : [3];
  const [isOpen, setIsOpen] = useState(false);
  const [swipe2, setSwipe2] = useState();

  const numImages = 7;

  function closeModal() {
    setIsOpen(false);
  }
  function openModal() {
    setIsOpen(true);
  }

  useEffect(() => {
    if (showReportProject) {
      document.querySelector("html").classList.add("modal__open");
    } else {
      document.querySelector("html").classList.remove("modal__open");
    }
  }, [showReportProject]);

  const handleReportProject = (e) => {
    e.preventDefault();
    setShowReportProject(false);
  };

  const handleDrag = (e, info) => {
    if (info.offset.y > 100) {
      setShowReportProject(false);
      setFixTab(false);
    }
  };

  const setting = {
    width: "100%",
    height: ["250px", "170px"],
    layout: numberOfPhotos,
    photos: [
      {
        source: projectImage,
      },
      {
        source: projectImage,
      },
      {
        source: projectImage,
      },
      {
        source: projectImage,
      },
      {
        source: projectImage,
      },
      {
        source: projectImage,
      },
      {
        source: projectImage,
      },
    ],
    showNumOfRemainingPhotos: true,
  };

  const stopScroll = (e) => {
    document.querySelector("html").classList.toggle("modal__open");
  };

  const { id } = useParams();
  const [post, setPost] = useState(null);

  useEffect(() => {
    fetchData("/projects/get-a-post/" + id).then((data) => setPost(data.post));
  }, []);
  return (
    <div
      className="bg-cover bg-fixed"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundColor: "#E9E9E9",
      }}
    >
      <AdminNav fixTab={fixTab} setFixTab={setFixTab} />
      <BrowseBanner heading="Place a bid on this project" />
      <div className="lg:w-[80%] mx-auto">
        <div className="bid__details">
          {/* Report project component */}
          <AnimatePresence>
            {showReportProject ? (
              <motion.div className="report__project">
                <div
                  className="dismiss__overlay"
                  onClick={() => setShowReportProject(false)}
                ></div>
                <motion.div
                  className="report__container"
                  initial={{ y: "100%" }}
                  animate={{ y: "0%" }}
                  exit={{ y: "100%" }}
                  transition={{ type: "none" }}
                  drag="y"
                  dragConstraints={{ top: 0, bottom: 100 }}
                  dragElastic={{
                    // top: 0,
                    bottom: 0.5,
                  }}
                  dragSnapToOrigin
                  onDragEnd={handleDrag}
                >
                  <div className="drag__handle"></div>
                  <form className="content" onSubmit={handleReportProject}>
                    <h3>Report Project</h3>
                    <h3>What’s going on?</h3>

                    {/* reasons */}
                    <label>
                      <input type="radio" name="reason" id="" />
                      <p>Contains contact information</p>
                    </label>
                    <label>
                      <input type="radio" name="reason" id="" />
                      <p>Advertising another website</p>
                    </label>
                    <label>
                      <input type="radio" name="reason" id="" />
                      <p>Fake project posted</p>
                    </label>
                    <label>
                      <input type="radio" name="reason" id="" />
                      <p>Obscenities or harassing behavior</p>
                    </label>

                    <div className="buttons">
                      <button onClick={() => setShowReportProject(false)}>
                        Cancel
                      </button>
                      <button type="submit">Submit</button>
                    </div>
                  </form>
                </motion.div>
              </motion.div>
            ) : null}
          </AnimatePresence>

          {/* Project info */}
          <div className="project__info">
            {/* form */}

            <Form post={post} />
            {post && (
              <>
                <div className="top">
                  <h2>Project Details</h2>
                  <div className="right">
                    <h3>{post.budget}</h3>
                    <p>
                      <WatchLaterIcon />
                      BIDDING ENDS IN 6 DAYS, 20 HOURS
                    </p>
                    <p>
                      Project ID: {post._id}
                      <Link
                        onClick={(e) => {
                          e.preventDefault();
                          setFixTab(true);
                          setShowReportProject(true);
                        }}
                      >
                        Report project
                      </Link>
                    </p>
                  </div>
                </div>
                <div className="details">
                  <TextDescription description={post.description} />
                  <div className="skill__set">
                    <h5>Skills Required</h5>
                    <p>
                      {post.skills.map((skill) => (
                        <span>{skill}</span>
                      ))}
                    </p>
                  </div>
                  <div className="flex gap-3 lg:mt-8 lg:gap-4">
                    {post?.photos?.map((photo, i) => (
                      <div
                        key={i}
                        onClick={openModal}
                        className="w-[32%] rounded overflow-hidden relative cursor-pointer"
                      >
                        <img
                          src={photo?.url}
                          alt=""
                          className="w-full h-full object-contain rounded"
                        />
                        {numImages - 3 > 0 && i === 2 && (
                          <div className="absolute inset-0 bg-[rgba(0,0,0,0.4)] flex items-center justify-center text-white font-intermedium text-2xl sm:text-4xl sm:font-inter">
                            +{numImages - 3}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Client Info */}
          <ClientInfo />
        </div>
      </div>

      {/* Modal */}
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
                    {post?.photos?.map((photo, i) => (
                      <SwiperSlide style={{ width: "max-content" }} key={i}>
                        <img
                          as="img"
                          src={photo?.url}
                          style={{ maxHeight: "70vh" }}
                          className="w-max object-contain rounded transform text-left align-middle shadow-xl transition-all mx-auto"
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
    </div>
  );
};

export default Bid;
