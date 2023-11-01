import React, { useState, useContext } from "react";
import applicantImage from "../../../assets/dashboard/applicant.png";
import { XMarkIcon, EllipsisVerticalIcon } from "@heroicons/react/24/outline";
import { StarIcon } from "@heroicons/react/24/solid";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import Rating from "@mui/material/Rating";
import { fetchData } from "../../../api/fetchData";
import { ModalContext } from "../../../contexts/ModalContext";
import { Avatar } from "@mui/material";
const ApplicantTableRow = ({ applicant, setRefresh }) => {
  const { showModal } = useContext(ModalContext);
  const [showMenu, setShowMenu] = useState(false);
  const Msg = ({ closeToast, toastProps }) => (
    <div>
      <p className="m-0 text-black font-inter text-sm">
        An invite has been sent to this applicant, once he accepts it, you will
        be notified. Furthermore, you could check the{" "}
        <Link to="/assigned/interviews" className="text-black underline">
          assigned interviews
        </Link>{" "}
        for update.
      </p>
    </div>
  );

  const displayMsg = async () => {
    const user = JSON.parse(localStorage.getItem("user"));
    fetch(
      `/creedlance/interviews/${applicant._id}/invite-an-applicant`,
      user
        ? {
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
          }
        : {}
    ).then(async (res) => {
      const data = await res.json();
      if (!res.ok) {
        showModal(`${data.message}`, false);
        return false;
      }
      setRefresh();
      toast(<Msg />);
    });
  };

  return (
    <tr className="w-full">
      <td
        style={{ marginBottom: 0 }}
        className="col-span-2 flex items-center gap-x-1 mb-0 max-w-[30vw] applicant__profile pt-3 sm:gap-x-2 lg:pt-5"
      >
        {applicant?.user?.photo ? (
          <img
            src={applicant?.user?.photo?.url}
            className="h-6 w-6 rounded-full sm:w-10 sm:h-10"
          />
        ) : (
          <Avatar />
        )}
        <p className="m-0 text-xs text-[#303236] font-inter whitespace-nowrap text-ellipsis overflow-hidden max-w-[99%] sm:text-base">
          {applicant.user.name}
        </p>
      </td>
      <td className="text-xs pt-3 text-[#303236] sm:text-base lg:pt-5">
        {applicant?.user?.city}
      </td>
      <td className="text-xs m-0 text-[#303236] pt-3 sm:text-base lg:pt-5">
        <Rating name="read-only" value={applicant?.user?.rating} readOnly />
      </td>
      <td className="text-xs m-0 text-[#303236] pt-3 sm:text-base lg:pt-5">
        Active
        {applicant?.user?.active && (
          <div className="h-2 w-2 rounded-full bg-[#3BE243] inline-flex ml-1" />
        )}{" "}
      </td>
      <td className="pt-3 relative lg:pt-5">
        <button
          className="bg-transparent border-none flex items-center justify-center w-full lg:justify-start lg:pl-3"
          onClick={() => setShowMenu(true)}
        >
          <EllipsisVerticalIcon className="h-5 text-[#303236]" />
        </button>
        {showMenu && (
          <div className="absolute top-4 bg-white right-0 py-3 z-10 pt-6 gap-y-2 flex flex-col lg:right-[66%] lg:top-6">
            <XMarkIcon
              className="h-5 top-1 right-1 absolute cursor-pointer"
              onClick={() => setShowMenu(false)}
            />
            <button
              onClick={() => displayMsg()}
              className="text-xs whitespace-nowrap px-4 text-black font-inter bg-transparent border-none md:text-sm"
            >
              Send Interview Invite
            </button>
            <Link
              to="/chat/contacts"
              className="text-xs whitespace-nowrap px-4 text-black font-inter md:text-sm"
            >
              Message
            </Link>
            <Link
              className="text-xs whitespace-nowrap px-4 text-black font-inter md:text-sm"
              to={`/applicants/profile/${applicant._id}`}
            >
              View Application
            </Link>
            {/* <Link className='text-xs whitespace-nowrap px-4 text-black font-inter md:text-sm'>Last Updated</Link>
            <Link className='text-xs whitespace-nowrap px-4 text-black font-inter md:text-sm'>Delete</Link> */}
          </div>
        )}
      </td>
    </tr>
  );
};

export default ApplicantTableRow;
