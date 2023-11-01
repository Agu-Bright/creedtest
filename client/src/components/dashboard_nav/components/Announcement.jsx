import { motion } from "framer-motion";
import { Fragment, useContext, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import img1 from "./assets/img1.svg";
import { postData } from "../../../api/postData";
import { useNavigate } from "react-router-dom";
import { XMarkIcon } from "@heroicons/react/24/outline";
const Announcement = ({ isOpen, setIsOpen, projectId, proposalId }) => {
  //   const { isOpen, setIsOpen, page } = useContext(AnnouncementContext);
  const navigate = useNavigate();
  const [index, setIndex] = useState(0);

  function closeModal() {
    setIsOpen(false);
  }

  // const awardProject = () => {
  //   postData(`/projects/${projectId}/${proposalId}/award-project`).then(() => {
  //     closeModal();
  //     navigate("/jobs/projects");
  //   });
  // };
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
                      Congratulations! You've been selected to work on this
                      project. To confirm your commitment to this project,
                      please click the 'Confirm' button
                    </p>
                    <button
                      // onClick={() => awardProject()}
                      className="outline-none inline-flex justify-center rounded-md border border-transparent text-white w-full md:w-max md:px-40 py-2 text-sm font-medium bg-primary-500"
                    >
                      confirm
                    </button>
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

export default Announcement;
