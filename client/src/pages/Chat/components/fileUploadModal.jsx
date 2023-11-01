import { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { XMarkIcon } from "@heroicons/react/24/outline";
import EmojiPicker from "emoji-picker-react";
import {
  FaceSmileIcon,
  PaperAirplaneIcon,
  PaperClipIcon,
} from "@heroicons/react/20/solid";
import { chatState } from "../../../contexts/ChatProvider";
import CloseIcon from "@mui/icons-material/Close";
import { IconButton, Box } from "@mui/material";

const FileUploadModal = ({
  isOpen,
  setIsOpen,
  img,
  typingHandler,
  handleKeyPress,
  handleSendMessage,
  formData,
}) => {
  const { message, setMessage } = chatState();
  ///:id/completed-project

  function closeModal() {
    setIsOpen(false);
  }

  const [emoji, setEmoji] = useState(false);

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
                {/* <XMarkIcon
                  onClick={() => setIsOpen(false)}
                  className="h-6 w-6 md:hidden absolute top-6 right-6"
                /> */}
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "end",
                    border: "1px solid green",
                  }}
                >
                  <IconButton onClick={() => setIsOpen(false)}>
                    <CloseIcon />
                  </IconButton>
                </Box>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexDirection: "column",
                  }}
                >
                  <img src={img} />

                  <div
                    style={{ display: "flex", justifyContent: "end" }}
                    className="p-2 mb-0 lg:bg-transparent bg-[#455A64] w-full flex items-center gap-2 lg:gap-4"
                  >
                    {/* <div className="w-6 relative hidden md:block">
                      <FaceSmileIcon
                        onClick={() => setEmoji(!emoji)}
                        className="cursor-pointer h-6 text-yellow-500"
                      />
                      {emoji && (
                        <div className="absolute bottom-[170%]">
                          <EmojiPicker
                            searchDisabled={true}
                            onEmojiClick={(data) => {
                              setMessage(message + data.emoji);
                            }}
                          />
                        </div>
                      )}
                    </div> */}

                    {/* <textarea
                      rows={1}
                      type="text"
                      value={message}
                      className="border rounded-md p-2 w-full text-sm lg:text-base"
                      placeholder={"Type message"}
                      onChange={typingHandler}
                      onKeyDown={(e) => handleKeyPress(e)}
                    /> */}
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "Center",
                        padding: "5px",
                      }}
                    >
                      <p style={{ padding: "0px 5px" }}>send</p>
                      <div
                        className="p-2 rounded bg-primary-100 "
                        onClick={() => handleSendMessage(formData, img)}
                      >
                        <PaperAirplaneIcon className="h-4 text-primary-500 sm:bg-[200%]" />
                      </div>
                    </div>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default FileUploadModal;

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
