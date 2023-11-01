import { createContext, useState } from "react";

export const ModalContext = createContext();

export const ModalContextProvider = ({ children }) => {
  const [showing, setShowing] = useState(false);
  const [text, setText] = useState("");
  const [success, setSuccess] = useState(true);
  const showModal = (text, success) => {
    setText(text);
    setSuccess(success);
    setShowing(true);

    setTimeout(() => {
      setShowing(false);
    }, 5000);
  };
  return (
    <ModalContext.Provider
      children={children}
      value={{ showing, text, success, showModal, setShowing }}
    />
  );
};
