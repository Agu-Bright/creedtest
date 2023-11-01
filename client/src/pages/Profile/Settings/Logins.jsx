import React, { useState, useContext } from "react";
import { updateData } from "../../../api/updateData";
import { ModalContext } from "../../../contexts/ModalContext";
import Btn from "../Components/Btn";
// import "../main.css";
const Logins = () => {
  const { showModal } = useContext(ModalContext);
  const [loading1, setLoading1] = useState(null);
  const [loading, setLoading] = useState(null);
  const [disable1, setDisable1] = useState(true);
  const [disable, setDisable] = useState(true);
  const [isValid, setIsvalid] = useState(false);
  const [emailData, setEmailData] = useState({
    email: "",
    password: "",
  });

  const [phonedata, setPhoneData] = useState({
    phoneNumber: "",
    password: "",
  });

  const handleChange1 = (e) => {
    if (emailData.email && emailData.password) {
      setDisable1(false);
      const isValid = emailData.email.endsWith("@gmail.com");
      setIsvalid(isValid);
    } else {
      setDisable1(true);
    }
    setEmailData((prev) => {
      const value = e.target.value;
      const name = e.target.name;
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const handleChange2 = (e) => {
    if (phonedata.phoneNumber && phonedata.password) {
      setDisable(false);
    } else {
      setDisable1(true);
    }
    setPhoneData((prev) => {
      const value = e.target.value;
      const name = e.target.name;
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const updateEmailSubmit = async () => {
    if (isValid === false) {
      setEmailData({ email: "", password: "" });
      return showModal("Invalid Email format", false);
    }
    setLoading1(true);
    const response = await updateData("/users/updateMyEmail", {
      ...emailData,
      passwordConfirm: emailData.password,
    });
    setLoading1(false);
    if (!response.ok) {
      const data = await response.json();
      showModal(`${data.message}`, false);
    } else {
      showModal("success", true);
      const data = await response.json();
      localStorage.setItem("user", JSON.stringify(data));
      setEmailData({ email: "", password: "" });
    }
  };

  const updatePhoneSubmit = async () => {
    setLoading(true);
    const response = await updateData("/users/updateMyNumber", {
      ...phonedata,
      passwordConfirm: phonedata.password,
    });
    setLoading(false);
    if (!response.ok) {
      const data = await response.json();
      showModal(`${data.message}`, false);
    } else {
      showModal("success", true);
      const data = await response.json();
      localStorage.setItem("user", JSON.stringify(data));
      setPhoneData({ phoneNumber: "", password: "" });
    }
  };
  return (
    <>
      <h1 className="text-3xl font-semibold lg:px-4">Email & Number</h1>
      <hr className="my-6" />
      <section>
        <h2 className="pt-6 pb-10 text-2xl">Email Update</h2>
        <div className="grid lg:grid-cols-2 gap-10 capitalize font-medium">
          <div className="flex flex-col gap-2">
            <label htmlFor="" className="text-base">
              Enter New Email
            </label>
            <input
              type="email"
              name="email"
              value={emailData.email}
              onChange={handleChange1}
              className="border rounded-md p-2"
              placeholder="example@gmail.com"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="" className="text-base">
              Enter Password
            </label>
            <input
              type="password"
              name="password"
              value={emailData.password}
              onChange={handleChange1}
              className="border rounded-md p-2"
              placeholder="password"
            />
          </div>
        </div>
      </section>
      <div className="py-10">
        <Btn
          disabled={disable1}
          text={loading1 ? "Updating..." : "Update Email"}
          type={1}
          onClick={() => updateEmailSubmit()}
          // disabled={disable1}
        />
      </div>
      <section className="pb-10">
        <h2 className="pt-10 pb-10 text-2xl">Phone Number</h2>
        <div className="grid lg:grid-cols-2 gap-10 capitalize font-medium">
          <div className="flex flex-col gap-2">
            <label htmlFor="" className="text-base">
              Enter Phone Number
            </label>
            <input
              type="number"
              value={phonedata.phoneNumber}
              name="phoneNumber"
              onChange={handleChange2}
              className="border rounded-md p-2"
              placeholder="Phone Number"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="" className="text-base">
              Enter Password
            </label>
            <input
              type="password"
              value={phonedata.password}
              name="password"
              onChange={handleChange2}
              className="border rounded-md p-2"
              placeholder="password"
            />
          </div>
          <Btn
            disabled={disable}
            text={loading ? "updating..." : "Update Number"}
            className={"mt-8"}
            type={1}
            onClick={() => updatePhoneSubmit()}
          />
        </div>
      </section>
    </>
  );
};

export default Logins;
