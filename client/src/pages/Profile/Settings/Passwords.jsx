import React, { useState, useContext } from "react";
import { updateData } from "../../../api/updateData";
import { ModalContext } from "../../../contexts/ModalContext";

const Passwords = () => {
  const { showModal } = useContext(ModalContext);
  const [loading, setLoading] = useState(null);
  const [disable, setDisable] = useState(true);
  const [data, setData] = useState({
    passwordCurrent: "",
    password: "",
    passwordConfirm: "",
  });

  const handleSubmit = async () => {
    setLoading(true);
    const response = await updateData("/users/updateMypassword", data);
    setLoading(false);
    if (!response.ok) {
      const data = await response.json();
      showModal(`${data.message}`, false);
    } else {
      showModal("success", true);
      const data = await response.json();
      localStorage.setItem("user", JSON.stringify(data));
      setEmailData({ email: "", password: "" });
      setData({
        passwordCurrent: "",
        password: "",
        passwordConfirm: "",
      });
    }
  };

  const handleChange = (e) => {
    if (data.passwordCurrent && data.password && data.passwordConfirm) {
      setDisable(false);
    } else {
      setDisable(true);
    }
    setData((prev) => {
      const value = e.target.value;
      const name = e.target.name;
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  return (
    <>
      <h1 className="text-3xl font-semibold lg:px-4">Password</h1>
      <hr className="my-6" />
      <section>
        <h2 className="pt-6 pb-10 text-2xl">Change Password</h2>
        <div className="grid lg:grid-cols-2 gap-10 capitalize font-medium">
          <div className="flex flex-col gap-2">
            <label htmlFor="" className="text-base">
              Current Password
            </label>
            <input
              type="password"
              value={data.passwordCurrent}
              name="passwordCurrent"
              onChange={handleChange}
              className="border rounded-md p-2"
              placeholder="password"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="" className="text-base">
              New Password
            </label>
            <input
              type="password"
              value={data.password}
              name="password"
              onChange={handleChange}
              className="border rounded-md p-2"
              placeholder="123456"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="" className="text-base">
              Confirm Password
            </label>
            <input
              type="password"
              value={data.passwordConfirm}
              name="passwordConfirm"
              onChange={handleChange}
              className="border rounded-md p-2"
              placeholder="123456"
            />
          </div>
        </div>
      </section>
      <div className="py-10">
        <button
          disabled={disable}
          onClick={handleSubmit}
          className="border w-full lg:w-max border-primary-500 text-primary-500 rounded-md px-4 py-2"
        >
          {loading ? "Updating..." : "Update Password"}
        </button>
      </div>
    </>
  );
};

export default Passwords;
