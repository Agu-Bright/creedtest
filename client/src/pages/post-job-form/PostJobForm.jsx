import React, {
  useContext,
  useEffect,
  useState,
  useRef,
  Fragment,
} from "react";
import DropZone from "./DropZone";
import { States } from "../../data/data";
import { cities } from "../../data/data";
import { useNavigate } from "react-router-dom";
import David from "../../assets/dashboard/applicant.png";
import { SignupContext } from "../../contexts/SignupContext";
import { LoaderContext } from "../../contexts/LoaderContext";
import { ModalContext } from "../../contexts/ModalContext";
import { UserDataContext } from "../../contexts/UserDataContext";
import Logo from "../../assets/logo-img/Creedlance logo without slogan black.png";
import Avatar from "../../assets/creating-account-img/image-placeholder.png";
import { styled } from "@mui/material/styles";
import Switch from "@mui/material/Switch";
import { occupations } from "../../../data/occupations";
import { Combobox, Transition } from "@headlessui/react";
import { ChevronUpDownIcon, CheckIcon } from "@heroicons/react/20/solid";
import SkillsForm from "./SkillsForm";

const PostJobForm = () => {
  const navigate = useNavigate();
  const uploadPictureRef = useRef(null);
  const { setLoading } = useContext(LoaderContext);
  const [name, setName] = useState("");
  const {
    file,
    setFile,
    DateOfBirth,
    setDateOfBirth,
    occupationValue,
    setOccupationValue,
    state,
    setState,
    city,
    setCity,
    businessLocation,
    setBusinessLocation,
    bio,
    setBio,
    signup,
  } = useContext(SignupContext);
  const { showModal } = useContext(ModalContext);
  const { checkStorage } = useContext(UserDataContext);

  const [query, setQuery] = useState("");

  const filteredOccupations =
    query === ""
      ? occupations
      : occupations.filter((occupation) =>
          occupation.occupation
            .toLowerCase()
            .replace(/\s+/g, "")
            .includes(query.toLowerCase().replace(/\s+/g, ""))
        );

  function handleChange(e) {
    console.log(URL.createObjectURL(e.target.files[0]));
    setFile(URL.createObjectURL(e.target.files[0]));
  }

  const handleSubmit = () => {};

  const handleProfileImageUpload = () => {
    uploadPictureRef.current.click();
  };

  const IOSSwitch = styled((props) => (
    <Switch
      focusVisibleClassName=".Mui-focusVisible"
      disableRipple
      {...props}
    />
  ))(({ theme }) => ({
    width: 42,
    height: 26,
    padding: 0,
    // marginLeft: -28,
    "& .MuiSwitch-switchBase": {
      padding: 0,
      margin: 2,
      transitionDuration: "300ms",
      "&.Mui-checked": {
        transform: "translateX(16px)",
        color: "#fff",
        "& + .MuiSwitch-track": {
          backgroundColor:
            theme.palette.mode === "dark" ? "#152144" : "#152144",
          opacity: 1,
          border: 0,
        },
        "&.Mui-disabled + .MuiSwitch-track": {
          opacity: 0.5,
        },
      },
      "&.Mui-focusVisible .MuiSwitch-thumb": {
        color: "#152144",
        border: "6px solid #fff",
      },
      "&.Mui-disabled .MuiSwitch-thumb": {
        color:
          theme.palette.mode === "light"
            ? theme.palette.grey[100]
            : theme.palette.grey[600],
      },
      "&.Mui-disabled + .MuiSwitch-track": {
        opacity: theme.palette.mode === "light" ? 0.7 : 0.3,
      },
    },
    "& .MuiSwitch-thumb": {
      boxSizing: "border-box",
      width: 22,
      height: 22,
    },
    "& .MuiSwitch-track": {
      borderRadius: 26 / 2,
      backgroundColor: theme.palette.mode === "light" ? "#E9E9EA" : "#39393D",
      opacity: 1,
      transition: theme.transitions.create(["background-color"], {
        duration: 500,
      }),
    },
  }));

  // useEffect(() => {
  // 	!name ? navigate("/register") : null;
  // 	setOccupationValue(occupations[0]);
  // }, []);

  return (
    <div
      className="box-border w-full bg-white lg:pb-5"
      style={{
        backgroundImage:
          "linear-gradient(158.57deg,#ffffff 14.09%,#faf3e0 24.75%,#f9f1dc 43.12%,#f9f0db 74.72%)",
      }}
    >
      <div className="lg:w-[90%] lg:mx-auto max-w-[1300px] pt-4">
        <img
          src={file ? file : Logo}
          alt="creedlance-logo"
          className="w-1/2 object-contain block my-3 lg:w-64 lg:mb-16 mx-auto"
        />
      </div>
      <form
        className="lg:flex lg:w-[90%] lg:mx-auto max-w-[1300px] lg:mb-16 bg-white lg:bg-[#f0f0f0] shadow-xl rounded-3xl"
        onSubmit={(e) => handleSubmit(e)}
      >
        {/* Left */}
        <div className="px-4 lg:flex-1 pt-10 lg:pb-[4rem] lg:pl-10">
          <h1 className="font-intermedium m-0 text-[#152144] text-2xl lg:text-3xl">
            Tell us how you need it done
          </h1>
          <p className="font-inter m-0 text-sm text-[#68707a] mt-1 lg:text-md lg:mt-3 2xl:text-base">
            Within minutes, you can contact skilled Creedlancers. View their
            profiles, ratings, and portfolios, as well as chat with them. Only
            pay the Creedlancers when you are completely satisfied with their
            work.
          </p>

          {/* inputs */}
          <div className="mt-5 flex flex-col gap-y-5 lg:mt-7 lg:gap-y-7">
            {/* form group */}
            <div className="flex flex-col gap-y-2">
              <label className="text-[#2D3748] font-inter text-xs pl-2 lg:text-sm">
                Choose a name for your project*
              </label>
              <input
                style={{ border: "1px solid #cfd4da" }}
                type="text"
                placeholder="Creedlance"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="border border-gray-200 border-inherit rounded-[14px] text-sm p-3 placeholder:text-[#7a8593] focus:outline-yellow-400 focus:outline w-full box-border lg:p-4"
              />
            </div>
            {/* form group */}
            <div id="mike" className="flex flex-col gap-y-2">
              <label className="text-[#2D3748] font-inter text-xs pl-2 lg:text-sm">
                Occupation*
              </label>
              <Combobox value={occupationValue} onChange={setOccupationValue}>
                <div className="relative mt-1">
                  <div className="relative w-full cursor-default overflow-hidden rounded-[14px] bg-white text-left focus:outline-none focus-visible:ring-1 focus-visible:ring-primary-500 focus-visible:ring-offset-1 focus-visible:ring-offset-gray-400 sm:text-sm border focus:outline-yellow-400 focus:outline">
                    <Combobox.Input
                      placeholder="Occupation"
                      style={{ text: "#7a8593" }}
                      className="border border-gray-200 border-inherit rounded-[14px] text-sm p-3 text-[#7a8593] focus:outline-yellow-400 focus:outline w-full box-border lg:p-4 placeholder:text-"
                      displayValue={(occupation) => occupation.occupation}
                      onChange={(event) => setQuery(event.target.value)}
                    />
                    <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
                      <ChevronUpDownIcon
                        className="h-5 w-5 text-gray-400"
                        aria-hidden="true"
                      />
                    </Combobox.Button>
                  </div>
                  <Transition
                    as={Fragment}
                    leave="transition ease-in duration-100"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                    afterLeave={() => setQuery("")}
                  >
                    <Combobox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                      {filteredOccupations.length === 0 && query !== "" ? (
                        <Combobox.Option
                          className={({ active }) =>
                            `relative cursor-default select-none py-2 pl-10 pr-4 ${
                              active
                                ? "bg-primary-500 text-white"
                                : "text-gray-900"
                            }`
                          }
                          value={{ id: null, occupation: query }}
                        >
                          "{query}"
                        </Combobox.Option>
                      ) : (
                        filteredOccupations.map((occupation) => (
                          <Combobox.Option
                            key={occupation.id}
                            className={({ active }) =>
                              `relative cursor-default select-none py-2 pl-10 pr-4 ${
                                active
                                  ? "bg-primary-500 text-white"
                                  : "text-gray-900"
                              }`
                            }
                            value={occupation}
                          >
                            {({ selected, active }) => (
                              <>
                                <span
                                  className={`block truncate ${
                                    selected ? "font-medium" : "font-normal"
                                  }`}
                                >
                                  {occupation.occupation}
                                </span>
                                {selected ? (
                                  <span
                                    className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                                      active ? "text-white" : "text-primary-500"
                                    }`}
                                  >
                                    <CheckIcon
                                      className="h-5 w-5"
                                      aria-hidden="true"
                                    />
                                  </span>
                                ) : null}
                              </>
                            )}
                          </Combobox.Option>
                        ))
                      )}
                    </Combobox.Options>
                  </Transition>
                </div>
              </Combobox>
            </div>
            {/* form group */}
            <div className="flex flex-col gap-y-2">
              <label className="text-[#2D3748] font-inter text-xs pl-2 lg:text-sm">
                Job Type*
              </label>
              <select
                style={{ border: "1px solid #cfd4da" }}
                className="block px-4 border border-gray-300 focus:outline-none focus:border-blue-500 bg-white border-#E2E8F0] text-[#7a8593] rounded-xl py-[0.85rem] w-full box-border lg:p-[1.1rem]"
                value={businessLocation}
                onChange={(e) => setBusinessLocation(e.target.value)}
              >
                <option value="remote">Remote</option>
                <option value="onsite">Onsite</option>
                <option value="hybrid">Hybrid</option>
              </select>
            </div>
            {/* form group */}
            <div className="flex flex-col gap-y-2">
              <label className="text-[#2D3748] font-inter text-xs pl-2 lg:text-sm">
                Job location*
              </label>
              <input
                style={{ border: "1px solid #cfd4da" }}
                type="text"
                placeholder="Pleasure Park, Port Harcout, Rivers State"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="border border-gray-200 border-inherit rounded-[14px] text-sm p-3 placeholder:text-[#7a8593] focus:outline-yellow-400 focus:outline w-full box-border lg:p-4"
              />
            </div>
            {/* form group */}
            <div className="flex flex-col gap-y-2">
              <label className="text-[#2D3748] font-inter text-xs pl-2 lg:text-sm">
                What's your budget*
              </label>
              <select
                style={{ border: "1px solid #cfd4da" }}
                className="block px-4 border border-gray-300 focus:outline-none focus:border-blue-500 bg-white border-#E2E8F0] text-[#7a8593] rounded-xl py-[0.85rem] w-full box-border lg:p-[1.1rem]"
                value={businessLocation}
                onChange={(e) => setBusinessLocation(e.target.value)}
              >
                <option value="budget">5k - 10k (Micro-task) </option>
                <option value="budget">10k - 20k (Micro-project)</option>
                <option value="budget">20k - 50k (Small-scale-task)</option>
                <option value="budget">50k - 100k (Small-scale-project)</option>
                <option value="budget">100k - 200k (Medium-project)</option>
                <option value="budget">200k - 500k (Large-project)</option>
                <option value="budget">500k - 1M (Larger-project)</option>
                <option value="budget">1M - 5M (Very-large-project)</option>
                <option value="budget">5M - 10M (Platinum-Project)</option>
                <option value="budget">10M and above (Diamond-project)</option>
              </select>
            </div>
          </div>
        </div>

        <div className="hidden lg:inline border-dashed border-primary-500 border-[2px] mx-10"></div>

        {/* Right */}
        <div className="flex flex-col items-center gap-y-5 px-4 mt-5 pb-5 lg:mt-0 lg:flex-1 lg:pt-2 lg:gap-y-7 lg:pr-10">
          {/* form group */}
          <div className="flex flex-col gap-y-2 w-full box-border lg:mt-12">
            <label className="text-[#2D3748] font-inter text-xs pl-2 lg:text-sm">
              What skills are required?*
            </label>
            <SkillsForm />
          </div>
          {/* form group */}
          <div className="flex flex-col gap-y-2 w-full box-border lg:mt-1">
            <label className="text-[#2D3748] font-inter text-xs pl-2 lg:text-sm">
              Tell us more about the project*
            </label>
            <textarea
              className="border-dashed border-[0.5px] p-3 border-[#cfd4da] rounded-[14px] lg:border-[1.7px] min-h-[100px] resize-none lg:p-4"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
            />
          </div>
          {/* form group */}
          <div className="flex flex-col gap-y-2 w-full">
            <label className="text-[#2D3748] font-inter text-xs pl-2 lg:text-sm">
              Job Pictures/album
            </label>
            <span className="text-[#686b72] font-inter text-xs pl-2">
              This is where you can show your service or products through
              pictures. If you don’t have any, you can skip
            </span>
            <DropZone className="border-dashed border-[0.5px] border-[#cfd4da] lg:border-[1.7px] rounded-[14px] min-h-[100px] grid place-content-center lg:min-h-[220px] bg-white" />
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="bg-[#daa520] border-none py-3 w-full rounded-md text-white mt-3 lg:mt-8 lg:py-4 lg:text-base"
          >
            Post my project
          </button>
        </div>
      </form>
    </div>
  );
};

export default PostJobForm;
