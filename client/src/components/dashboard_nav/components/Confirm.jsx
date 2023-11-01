import { motion } from "framer-motion";
import { Fragment, useContext, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import styled from "styled-components";
import img1 from "./assets/img1.svg";
import { postData } from "../../../api/postData";
import { useNavigate } from "react-router-dom";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { updateData } from "../../../api/updateData";
import { PaperAirplaneIcon } from "@heroicons/react/24/outline";
import { ModalContext } from "../../../contexts/ModalContext";
import { Rating, CircularProgress } from "@mui/material";
import feedback from "../../../assets/feedback.svg";
const Confirm = ({ isOpen, setIsOpen, project, sender }) => {
  //   const { isOpen, setIsOpen, page } = useContext(AnnouncementContext);
  const { showModal } = useContext(ModalContext);
  const [rating, setRating] = useState(0);
  const [loading, setLoading] = useState();
  const [viewComment, setViewComment] = useState(false);
  const [text, setText] = useState();
  const navigate = useNavigate();
  const [index, setIndex] = useState(0);
  ///:id/completed-project

  function closeModal() {
    setIsOpen(false);
  }

  const acceptProjectDone = async () => {
    await updateData(`/projects/${project._id}/completed-project`).then(
      (res) => {
        if (res.ok) {
          showModal("project completed", true);
          setIndex(1);
        }
      }
    );
  };

  const handleReviewSubmit = async () => {
    setLoading(true);
    await updateData(`/users/${sender?._id}/add-review-to-user`, {
      rating: rating,
      review: text,
    }).then((res) => {
      setLoading(false);
      if (res.ok) {
        showModal("review sent", true);
        closeModal(true);
      }
    });
  };

  const handleDecline = async (id) => {
    await updateData(`/projects/${id}/submit-project?decline=true`).then(
      async (res) => {
        if (!res.ok) {
          showModal(res.message, false);
        }
        closeModal();
        showModal("Submission Declined", true);
      }
    );
  };
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        className="relative"
        style={{ zIndex: 3000 }}
        onClose={() => {
          console.log("closed");
        }}
      >
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
          <div className="flex min-h-full items-center justify-center md:p-4 text-center">
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
                as="div"
                className="w-full h-[100vh] md:h-auto max-w-2xl transform overflow-hidden md:rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all flex md:block flex-col justify-center items-center relative"
              >
                <XMarkIcon
                  onClick={() => setIsOpen(false)}
                  className="h-6 w-6 md:hidden absolute top-6 right-6"
                />
                {index == 0 && (
                  <div className="flex flex-col items-center">
                    <img src={img1} className="h-56" alt="" />
                    <p className="max-w-md text-sm text-center py-4">
                      {sender?.name} has indicated completion of your project
                      titled{" "}
                      <span
                        style={{ color: "#daa520", cursor: "pointer" }}
                        onClick={() =>
                          navigate(`/dashboard/browse/projects/${project._id}`)
                        }
                      >
                        {project?.title}.
                      </span>{" "}
                      You can either 'Accept' to confirm it as completed or
                      'Decline' to mark it as unfinished
                    </p>
                    <div>
                      <button
                        style={{ margin: "5px 0px" }}
                        onClick={() => acceptProjectDone()}
                        className="outline-none inline-flex justify-center rounded-md border border-transparent text-white w-full md:w-max md:px-40 py-2 text-sm font-medium bg-primary-500"
                      >
                        Accept Project Done
                      </button>
                      <button
                        style={{
                          margin: "5px 0px",
                          color: "black",
                          border: "1px solid #daa520",
                        }}
                        onClick={() => handleDecline(project._id)}
                        className="outline-none inline-flex justify-center rounded-md border border-transparent text-white w-full md:w-max md:px-40 py-2 text-sm font-medium "
                      >
                        Decline Project Done
                      </button>
                    </div>
                  </div>
                )}
                {index == 1 && (
                  <div className="flex flex-col items-center">
                    <img src={feedback} className="h-56" alt="" />
                    <p className="max-w-md text-sm text-center py-4">
                      We value your feedback! Please take a moment to review the
                      creedlancer's completed work. Your input helps us ensure
                      the highest quality service.
                    </p>
                    <div>
                      <div
                        style={{
                          border: "1px solid black",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <span>Rate this worker</span>
                        <Rating
                          precision={0.5}
                          value={rating}
                          onChange={(e) => setRating(e.target.value)}
                        />{" "}
                        {/* {rating > 0 && (
                          <span style={{ fontSize: "0.5em" }}>{rating}</span>
                        )} */}
                      </div>

                      {viewComment && (
                        <Container>
                          <input
                            type="text"
                            placeholder="Comment on this worker"
                            value={text}
                            required={true}
                            onChange={(e) => setText(e.target.value)}
                          />{" "}
                        </Container>
                      )}
                      {!viewComment && (
                        <button
                          style={{ margin: "5px 0px" }}
                          onClick={() => setViewComment(true)}
                          className="outline-none inline-flex justify-center rounded-md border border-transparent text-white w-full md:w-max md:px-40 py-2 text-sm font-medium bg-primary-500"
                        >
                          Review
                        </button>
                      )}
                      {viewComment && (
                        <button
                          style={{ margin: "5px 0px" }}
                          onClick={() => {
                            setViewComment(true);
                            handleReviewSubmit();
                          }}
                          className="outline-none inline-flex justify-center rounded-md border border-transparent text-white w-full md:w-max md:px-40 py-2 text-sm font-medium bg-primary-500"
                        >
                          Submit Review{" "}
                          {/* {loading && (
                            <span style={{ padding: "0px 5px" }}>
                              {" "}
                              <CircularProgress color="white" size={20} />{" "}
                            </span>
                          )} */}
                        </button>
                      )}
                    </div>
                  </div>
                )}
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default Confirm;

const Container = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  padding-left: 3.5rem !important;
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;

  input {
    flex: 1;
    border-radius: 20px !important;
    padding: 0.3rem 0.5rem;
    border: 1.25px solid lightgray;
  }

  > button {
    padding: 0 !important;
    margin: 0 !important;
    background-color: transparent !important;
    border: none;
  }

  @media (min-width: 768px) {
    padding-top: 0.7rem;
    padding-bottom: 0.7rem;

    input {
      padding: 0.5rem;
    }
  }
`;
