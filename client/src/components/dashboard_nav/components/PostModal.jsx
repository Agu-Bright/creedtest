import { motion } from "framer-motion";
import { Fragment, useContext, useState, useEffect } from "react";
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
import PostCard from "../../../pages/Dashboards/components/PostCard";
import axios from "axios";
import { fetchData } from "../../../api/fetchData";

const PostModal = ({ isOpen, setIsOpen, postId }) => {
  const [post, setPost] = useState();
  const [hideBar, setHideNavBar] = useState();
  const [loading, setLoading] = useState(false);

  function closeModal() {
    setIsOpen(false);
  }

  useEffect(() => {
    (async () => {
      setLoading(true);
      fetchData(`/social/post/${postId}`).then((data) => {
        setPost(data.post);
        setLoading(false);
      });
    })();
  }, []);

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
                {loading && (
                  <div
                    style={{
                      width: "100%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <CircularProgress size={100} sx={{ color: "#daa520" }} />
                  </div>
                )}
                {post && (
                  <div style={{ height: "100vh" }}>
                    <PostCard
                      post={post}
                      id={post._id}
                      files={post?.photos?.map((photo) => {
                        return {
                          type: photo?.type ? photo?.type : "image",
                          url: photo?.url,
                        };
                      })}
                      // { type: "image", url: saryImage },
                      // { type: "video", url: aboutVideo, poster: saryImage },
                      description={post.description}
                      hideNavBar={() => setHideNavBar(true)}
                      showNavBar={() => setHideNavBar(false)}
                    />
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

export default PostModal;

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
