import React, { useContext, useEffect, useState } from "react";
import { UserIcon } from "@heroicons/react/24/solid";
import { UserDataContext } from "../../../contexts/UserDataContext";
import { ModalContext } from "../../../contexts/ModalContext";
import { updateData } from "../../../api/updateData";
import Btn from "../Components/Btn";
import { Avatar, CircularProgress, Fab, Box, Typography } from "@mui/material";
import { motion } from "framer-motion";
import { chatState } from "../../../contexts/ChatProvider";
import PropTypes from "prop-types";
import { postData } from "../../../api/postData";
import axios from "axios";
function CircularProgressWithLabel(props) {
  return (
    <Box sx={{ position: "relative", display: "inline-flex" }}>
      <CircularProgress variant="determinate" {...props} />
      <Box
        sx={{
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          position: "absolute",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography variant="caption" component="div" color="text.secondary">
          {`${Math.round(props.value)}%`}
        </Typography>
      </Box>
    </Box>
  );
}

CircularProgressWithLabel.propTypes = {
  /**
   * The value of the progress indicator for the determinate variant.
   * Value between 0 and 100.
   * @default 0
   */
  value: PropTypes.number.isRequired,
};
const Profile = () => {
  const { socket } = chatState();
  const { showModal } = useContext(ModalContext);
  const { userData } = useContext(UserDataContext);
  const [profile, setProfile] = useState(null);
  const [photo, setPhoto] = useState();
  const [avatarPreview, setAvatarPreview] = useState(null);
  const [update, setUpdate] = useState();
  const [loading, setLoading] = useState(false);
  const [imageLoading, setImageLoading] = useState(false);
  const [toggle, setToggle] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    socket &&
      socket.on("upload progress", (progress) => {
        setProgress(progress);
      });
    socket &&
      socket.on("loading", (bool) => {
        setImageLoading(bool);
      });
  });

  useEffect(() => {
    if (userData) {
      const { user } = JSON.parse(userData);
      user.passwordConfirm && delete user.passwordConfirm;
      setProfile(user);
      setPhoto(user?.photo?.url);
    }
  }, [userData, toggle]);

  const storage = localStorage.getItem("user");
  const mainStorage = JSON.parse(storage);
  const handleChange = (e) => {
    setUpdate((prev) => {
      const value = e.target.value;
      const name = e.target.name;
      return {
        ...prev,
        [name]: value,
      };
    });
    setProfile((prev) => {
      const value = e.target.value;
      const name = e.target.name;
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const updateProfile = async () => {
    setLoading(true);
    const response = await updateData(`/users/update/${profile._id}`, update);
    setLoading(false);
    if (!response.ok) {
      const res = await response.json();
      showModal(`${res.message}`, false);
    } else {
      showModal("success", true);
      setAvatarPreview(null);
      const { data } = await response.json();
      const user = {
        user: data?.updatedUser,
        token: mainStorage.token,
      };
      localStorage.setItem("user", JSON.stringify(user));
      setUpdate(null);
    }
  };
  const formData = new FormData();

  // const handleImageChange = async (e) => {
  //   const file = e.target.files[0];

  //   console.log(file);

  //   const data = new FormData();

  //   data.append("avatar", file);

  //   console.log(data);

  //   const reader = new FileReader();
  //   reader.onload = async () => {
  //     if (reader.readyState === 2) {
  //       setImageLoading(true);
  //       let response;
  //       if (reader.result) {
  //         response = await updateData(`/users/update/${profile._id}`, {
  //           photo: reader.result,
  //         });
  //       }
  //       setImageLoading(false);
  //       if (!response.ok) {
  //         const res = await response.json();
  //         showModal(`${res.error.error.code}`, false);
  //       } else {
  //         showModal("success", true);
  //         const { data } = await response.json();
  //         const user = {
  //           user: data?.updatedUser,
  //           token: mainStorage.token,
  //         };
  //         localStorage.setItem("user", JSON.stringify(user));
  //         setPhoto(data?.updatedUser.photo.url);
  //       }
  //     }
  //   };
  //   reader.readAsDataURL(e.target.files[0]);
  // };
  const [file, setFile] = useState();
  const handleImageSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const avatar = formData.get("avatar");
    await fetch(`/creedlance/users/upload-image`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${mainStorage?.token}`,
        "x-total-size": avatar.size.toString(),
      },
      body: formData,
    }).then((res) => {
      if (!res.ok) {
        console.log(res);
        return;
      } else {
        console.log("setting photo");
        setTimeout(() => {
          setProgress(0);
          showModal("success", true);
          (async () => {
            const { data } = await res.json();
            const user = {
              user: data?.updatedUser,
              token: mainStorage.token,
            };
            localStorage.setItem("user", JSON.stringify(user));
            setPhoto(data?.updatedUser.photo.url);
          })();
        }, 2000);
      }
    });
  };

  const handleImageChange = (e) => {
    setFile(e.target.files[0]);
    document.getElementById("submit").click();
  };

  const pickImage = () => {
    document.querySelector("#create-profile-image-uploader").click();
  };
  return (
    <>
      {loading && (
        <div
          id="mike"
          style={{
            width: "inherit",
            zIndex: 10000,
            overflow: "hidden",
          }}
          className="relative lg:mb-1 lg:py-2"
        >
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: "100%" }}
            transition={{ repeat: "repeat", duration: 1 }}
            style={{ width: "100%" }}
            className="h-1 bg-primary-500"
          ></motion.div>
        </div>
      )}

      <section>
        <h1 className="text-3xl font-semibold lg:px-4">Profile</h1>
        <hr className="my-6" />
        <div className="flex flex-col relative justify-center items-center">
          {photo ? (
            <>
              {progress && !imageLoading ? (
                <CircularProgressWithLabel
                  size={100}
                  sx={{ color: "#daa520" }}
                  value={progress}
                />
              ) : (
                <img
                  src={photo}
                  onClick={pickImage}
                  style={{
                    borderRadius: "50% !important",
                    objectFit: "cover",
                    width: 100,
                    height: 100,
                    display: `${imageLoading ? "none" : "block"}`,
                  }}
                  alt="avatar"
                  className="rounded-full"
                />
              )}
            </>
          ) : (
            <>
              {progress && !imageLoading ? (
                <CircularProgressWithLabel
                  size={100}
                  sx={{ color: "#daa520" }}
                  value={progress}
                />
              ) : (
                <Avatar
                  sx={{ width: 100, height: 100 }}
                  onClick={pickImage}
                  style={{ borderRadius: "50% !important" }}
                  alt="avatar"
                />
              )}
            </>
          )}
          {imageLoading && (
            <CircularProgress size={100} sx={{ color: "#daa520" }} />
          )}
          <form id="form_id" onSubmit={handleImageSubmit}>
            <input
              // style={{ visibility: "none" }}
              type="file"
              name="avatar"
              id="create-profile-image-uploader"
              onChange={handleImageChange}
              className="h-full w-full absolute top-0 left-0 cursor-pointer opacity-0"
            />
            <button style={{ visibility: "hidden" }} id="submit" type="submit">
              submit
            </button>
          </form>
          <h2 className="font-semibold text-xl mt-2">{profile?.name}</h2>
          <small className="text-zinc-500">{profile?.email}</small>
        </div>
      </section>

      <section className="grid lg:grid-cols-2 gap-10 pt-20 capitalize font-medium">
        <div className="flex flex-col gap-2">
          <label htmlFor="" className="text-base">
            Full Name
          </label>
          <input
            type="text"
            value={profile?.name}
            name="name"
            onChange={handleChange}
            className="border rounded-md p-2"
            placeholder="John Doe"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="" className="text-base">
            Date of birth
          </label>
          <input
            type="date"
            name="DateOfBirth"
            value={profile?.DateOfBirth}
            onChange={handleChange}
            className="border rounded-md p-2"
            placeholder="19/9/1999"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="" className="text-base">
            country of residence
          </label>
          <input
            type="text"
            value={profile?.countryOfResidence}
            onChange={handleChange}
            name="countryOfResidence"
            className="border rounded-md p-2"
            placeholder="Nigerian"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="" className="text-base">
            Home address
          </label>
          <input
            type="text"
            className="border rounded-md p-2"
            onChange={handleChange}
            value={profile?.homeAddress}
            name="homeAddress"
            placeholder="Route 99"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="" className="text-base">
            next of kin
          </label>
          <input
            type="text"
            value={profile?.NextofKin}
            onChange={handleChange}
            name="NextofKin"
            className="border rounded-md p-2"
            placeholder="Kira"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="" className="text-base">
            Next of kin phone number
          </label>
          <input
            type="text"
            value={profile?.NextofKinPhoneNumber}
            onChange={handleChange}
            name="NextofKinPhoneNumber"
            className="border rounded-md p-2"
            placeholder="09111111111"
          />
        </div>
      </section>
      <div className="py-10" onClick={() => updateProfile()}>
        <Btn type={2} text={"save"} disable={true} />
      </div>
    </>
  );
};

export default Profile;
