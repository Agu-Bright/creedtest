import React, { useState, useEffect, useContext } from "react";
import "./style.css";
import { useParams } from "react-router-dom";
import AdminNav from "../../components/dashboard_nav/dashboard_nav";
import bgImage from "../../assets/dashboard/dashboard-circle-bg-light.png";
import applicantImage from "../../assets/dashboard/applicant.png";
import chatApplicantIcon from "../../assets/dashboard/chat-applicant-icon.png";
import { Link } from "react-router-dom";
import IosShareRoundedIcon from "@mui/icons-material/IosShareRounded";
import { fetchData } from "../../api/fetchData";
import { updateData } from "../../api/updateData";
import { ModalContext } from "../../contexts/ModalContext";
import { Avatar, IconButton } from "@mui/material";
import Swal from "sweetalert2";
import DownloadIcon from "@mui/icons-material/Download";
import { chatState } from "../../contexts/ChatProvider";

///get-interview-application/:id
///:id/invite-applicant
// console.log(application?.user?.photo?.url);

const downloadFile = (url) => {
  fetch(url)
    .then((response) => response.blob())
    .then((blob) => {
      const url = window.URL.createObjectURL(new Blob([blob]));
      const a = document.createElement("a");
      a.href = url;
      a.download = "Curriculum_vitae.pdf"; // Set the desired filename here
      document.body.appendChild(a);
      a.click();
      a.remove();
    })
    .catch((error) => {
      console.error("Error downloading the file:", error);
    });
};

const ApplicantProfile = () => {
  const params = useParams();
  const { id } = params;
  const [fixTab, setFixTab] = useState(false);
  const [application, setApplication] = useState(null);
  application && console.log(application);

  useEffect(() => {
    const fetchApplication = async () => {
      try {
        const application = await fetchData(
          `/interviews/get-interview-application/${id}`
        );
        setApplication(application);
      } catch (error) {
        console.log(error);
      }
    };
    fetchApplication();
  }, []);
  const { token, user, accessChat } = chatState();
  const createNotification = async (notification) => {
    fetch(
      `/creedlance/notifications/create-notification`,
      token
        ? {
            method: "POST",
            body: JSON.stringify(notification),
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        : {}
    ).then(async (res) => {
      const data = await res.json();
      console.log(data);
    });
  };

  const sendInvitation = async () => {
    const res = await fetchData(`/interviews/${id}/invite-an-applicant`);
    console.log(res);
    // user &&
    //   createNotification({
    //     receiver: application?.user?._id,
    //     type: "interview-invite",
    //     title: "You have an invite",
    //     description: `${user?.name} invited you for an interview`,
    //     interview: application?.interview,
    //     interviewApplication: id,
    //   });
    return true;
  };

  const handleDownloadClick = (cvUrl) => {
    const url = cvUrl;
    const filename = "my_cv.pdf"; // Set the desired filename for the downloaded file
    downloadFile(url);
  };

  return (
    <div>
      <AdminNav fixTab={fixTab} setFixTab={setFixTab} />
      <div
        style={{ backgroundImage: `url(${bgImage})`, zIndex: -2 }}
        className="fixed inset-0 w-screen h-screen bg-[length:700px_700px] bg-bottom md:bg-contain md:bg-right bg-no-repeat sm:bg-[length:900px_900px] bg-[#f9fbfc] lg:bg-[length:60vw_60vw]"
      />
      {application && (
        <div className="py-[60px] p-4 relative applicant__page flex md:px-6 lg:gap-x-8 lg:w-[90%] lg:max-w-[1200px] lg:mx-auto">
          {/* <img
            src={applicantImage}
            alt=""
            className="hidden h-[25vw] object-contain mt-10 lg:inline-flex lg:max-h-72"
          /> */}
          <Avatar
            className="hidden h-[25vw] object-contain mt-10 lg:inline-flex lg:max-h-72"
            sx={{
              width: 250,
              height: 250,
              display: { lg: "block", md: "none", sm: "none", xs: "none" },
            }}
            src={application?.user?.photo?.url}
            style={{ borderRadius: "50% !important" }}
            alt="avatar"
          />
          <div className="pt-8 flex-1">
            {/* profile heaeder */}
            <div className="flex gap-x-4 w-full md:gap-x-6">
              {/* <img
                src={applicantImage}
                alt=""
                className="w-[33vw] object-contain lg:hidden"
              /> */}
              <Avatar
                className="w-[33vw] object-contain lg:hidden"
                sx={{
                  width: { md: 250, sm: 150, xs: 100 },
                  height: { md: 250, sm: 150, xs: 100 },
                  display: { lg: "none", md: "block" },
                }}
                src={application?.user?.photo?.url}
                alt="avatar"
              />
              <div className="flex-1 sm:pt-8 lg:flex">
                <div className="w-full">
                  <h1 className="m-0 text-[#205184] text-lg max-w-[50vw] overflow-hidden text-ellipsis whitespace-nowrap sm:text-2xl md:text-3xl">
                    {application?.name}
                  </h1>
                  <p className="m-0 text-xs text-[#303236] sm:text-sm md:text-base">
                    {`${application?.user?.occupation}`},{" "}
                    {`${application?.user?.state}`}
                  </p>
                  <p className="flex items-center gap-x-1 m-0 text-xs text-[#303236] sm:text-sm md:text-base">
                    Active
                    {application?.user.active && (
                      <div className="bg-[#3BE243] h-2 w-2 rounded-full" />
                    )}
                  </p>
                </div>
                <div
                  onClick={() => accessChat(application?.user._id)}
                  style={{ cursor: "pointer" }}
                  className="bg-primary-500 h-9 flex items-center justify-center gap-x-1 text-white whitespace-nowrap text-[0.80rem] px-2 mt-3 rounded sm:text-sm sm:h-10 sm:gap-x-3 md:text-base md:h-12 lg:w-80"
                >
                  Chat with Applicant
                  <img
                    src={chatApplicantIcon}
                    alt=""
                    className="h-5 object-contain"
                  />
                </div>
              </div>
            </div>

            {/* Contact details */}
            <div className="flex flex-wrap justify-between gap-y-3 mt-6 sm:mt-9">
              <div className="w-[45%] lg:w-[40%]">
                <h2 className="m-0 text-xs text-[#205184] font-inter font-light mb-1 sm:text-sm md:text-base">
                  Email
                </h2>
                <p className="m-0 text-xs text-[#303236] break-words sm:text-sm md:text-base">
                  {application?.email}{" "}
                </p>
              </div>
              <div className="w-[45%] lg:w-[18%]">
                <h2 className="m-0 text-xs text-[#205184] font-inter font-light mb-1 sm:text-sm md:text-base">
                  Position
                </h2>
                <p className="m-0 text-xs text-[#303236] sm:text-sm md:text-base">
                  {application?.user?.occupation}
                </p>
              </div>
              <div className="w-[45%] lg:w-[18%]">
                <h2 className="m-0 text-xs text-[#205184] font-inter font-light mb-1 sm:text-sm md:text-base">
                  Phone
                </h2>
                <p className="m-0 text-xs text-[#303236] sm:text-sm md:text-base">
                  {application?.user?.phoneNumber}{" "}
                </p>
              </div>
              <div className="w-[45%] lg:w-[24%]">
                <h2 className="m-0 text-xs text-[#205184] font-inter font-light mb-1 sm:text-sm md:text-base">
                  Address
                </h2>
                <p className="m-0 text-xs text-[#303236] sm:text-sm md:text-base">
                  {application?.user.city}
                </p>
              </div>
            </div>

            {/* Message */}
            <div className="mt-5 sm:mt-9">
              <h2 className="m-0 text-xs text-[#205184] font-inter font-light mb-1 sm:text-sm md:text-base">
                Message
              </h2>
              <p className="text-xs font-inter whitespace-p-line text-[#303236] mt-2 sm:text-sm md:text-base">
                {application.message}
              </p>
            </div>

            {/* Files */}
            <div className="mt-4 sm:mt-9">
              <button className="bg-white rounded-md flex border-none shadow p-2 gap-x-2 items-center">
                <div>
                  <span className="block text-[#205184] text-xs text-left sm:text-sm">
                    Curriculum Vitae (pdf)
                  </span>
                  <span className="block text-left text-xs truncate max-w-[120px] sm:text-sm">
                    {application.user.name}
                  </span>
                </div>
                {/* <IosShareRoundedIcon
                  className="text-[#303236]"
                  sx={{
                    fontSize: {
                      xs: "20px",
                      sm: "22px",
                      md: "24px",
                      lg: "32px",
                    },
                  }}
                /> */}
                <IconButton
                  onClick={() => handleDownloadClick(application.CV.url)}
                >
                  <DownloadIcon />
                </IconButton>
              </button>
            </div>
            <button
              disabled={application.invite === true ? true : false}
              onClick={() => {
                Swal.fire({
                  icon: "question",
                  title: "Invite Applicant",
                  text: "Confirm to invite applicant for an this Interview",
                  showConfirmButton: true,
                  confirmButtonText: "Send Invitation",
                  showCancelButton: true,
                }).then(async (res) => {
                  if (res.isConfirmed) {
                    const status = await sendInvitation();
                    status &&
                      Swal.fire({
                        icon: "success",
                        title: "Congratulations",
                        text: "The Invitation have is sent",
                        timer: 1500,
                      });
                  }
                });
              }}
              className="bg-primary-500 text-white border-none mt-6 w-full py-2 rounded md:text-base lg:w-fit lg:px-6 lg:mt-8"
            >
              Send Interview Invite
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ApplicantProfile;
