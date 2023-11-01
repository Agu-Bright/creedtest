import { useContext, useEffect } from "react";
import { ArrowUpTrayIcon, PencilIcon } from "@heroicons/react/24/solid";
import { img4 } from "../../assets/mike";
import AdminNav from "../../components/dashboard_nav/dashboard_nav";
import Btn from "../../components/MikesComponents/Btn";
import { useState } from "react";
import { postData } from "../../api/postData";
import { useNavigate, useParams } from "react-router-dom";
import { LoaderContext } from "../../contexts/LoaderContext";
import Swal from "sweetalert2";
import { UserDataContext } from "../../contexts/UserDataContext";
import { fetchData } from "../../api/fetchData";

const Application = () => {
  const { id } = useParams();
  const { setLoading } = useContext(LoaderContext);
  const navigate = useNavigate();

  const { userData } = useContext(UserDataContext);

  const user = JSON.parse(userData)?.user;
  const token = JSON.parse(userData)?.token;

  const [fixTab, setFixTab] = useState(false);
  const [cv, setCv] = useState("");
  const [resume, setResume] = useState("");
  const [objectData, setObjectData] = useState({
    name: user.name,
    email: user.email,
    message: "",
  });
  const [cvPreview, setCvPreview] = useState("");
  const [resumePreview, setResumePreview] = useState("");

  const handleObjectDataChange = (event) => {
    setObjectData((prev) => {
      return {
        ...prev,
        [event.target.name]: event.target.value,
      };
    });
  };

  const handleFileChange = (e, setter, previewSetter) => {
    const reader = new FileReader();
    reader.onload = async () => {
      if (reader.readyState === 2) {
        // console.log(reader.result);
        setter(reader.result);
      }
    };
    reader.readAsDataURL(e.target.files[0]);
    previewSetter(e.target.value);
  };

  const [interview, setInterview] = useState();
  useEffect(() => {
    (async () => {
      await fetchData(`/interviews/get-interview/${id}`).then((res) => {
        setInterview(res.interview);
      });
    })();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    const data = {
      ...objectData,
      cv: cv,
      resume: resume,
    };

    const createNotification = async (notification) => {
      fetch(
        `/creedlance/notifications/create-notification`,
        token
          ? {
              method: "POST",
              body: JSON.stringify(notification),
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
            }
          : {}
      ).then(async (res) => {
        const data = await res.json();
        console.log(data);
      });
    };

    postData(`/interviews/${id}/apply-for-interview`, data)
      .then((res) => {
        setLoading(false);
        if (res.ok) {
          Swal.fire({
            title: "Application Sent",
            text: " If the employer has interest in granting you an interview then you will be sent an interview invite in your notifications, good luck!",
            icon: "success",
            showCloseButton: true,
            confirmButtonColor: "rgb(218 165 32)",
          });

          // interview &&
          // 	createNotification({
          // 		receiver: interview?.createdBy._id,
          // 		type: "interview-application",
          // 		title: "You have a new applicant",
          // 		description: `${user.name} applied for the interview`,
          // 		interview: id,
          // 	});
          navigate("/jobs/interviews");
        }
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  };

  return (
    <>
      <AdminNav fixTab={fixTab} setFixTab={setFixTab} />
      <div id="mike" className="grid lg:grid-cols-3">
        <div className="lg:col-span-2">
          <form
            onSubmit={handleSubmit}
            className="max-w-2xl mx-auto py-20  px-6 "
          >
            <h1 className="md:text-3xl text-xl font-semibold border-b-4 border-primary-500 w-max pr-2 flex items-end gap-2">
              Job Application
              {/* <h2 className="md:text-lg text-base inline">- (Account Officer)</h2> */}
            </h1>
            <section className="flex flex-col gap-10 pt-10 capitalize font-medium">
              <div className="flex flex-col gap-2">
                <label htmlFor="" className="text-base">
                  Message to Employer (required)
                </label>
                <textarea
                  name="message"
                  className="border rounded-md p-2 valid:border-emerald-300 h-32"
                  placeholder={"Ex: Hello, I would like to apply..."}
                  required
                  value={objectData.message}
                  onChange={(e) =>
                    handleObjectDataChange(e, setCv, setCvPreview)
                  }
                />
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="" className="text-base">
                  Upload CV (required)
                </label>
                <div className="border rounded py-14 flex-col flex items-center justify-center text-zinc-400 mt-4 relative">
                  {cvPreview ? (
                    <div className="flex gap-2 items-center">
                      <div>{cvPreview}</div>
                      <PencilIcon className="h-4 text-orange-500 mt-1" />
                    </div>
                  ) : (
                    <>
                      <ArrowUpTrayIcon className="h-10 mb-5" />
                      <p>Drag & Drop to Upload Document</p>
                    </>
                  )}
                  <input
                    type="file"
                    name="file"
                    id=""
                    onChange={(e) => handleFileChange(e, setCv, setCvPreview)}
                    required
                    className="absolute top-0 left-0 h-full w-full opacity-0 cursor-pointer"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="" className="text-base">
                  Upload Resume (optional)
                </label>
                <div className="border rounded py-14 flex-col flex items-center justify-center text-zinc-400 mt-4 relative">
                  {resumePreview ? (
                    <div className="flex gap-2 items-center">
                      <div>{resumePreview}</div>
                      <PencilIcon className="h-4 text-orange-500 mt-1" />
                    </div>
                  ) : (
                    <>
                      <ArrowUpTrayIcon className="h-10 mb-5" />
                      <p>Drag & Drop to Upload Document</p>
                    </>
                  )}
                  <input
                    type="file"
                    name="file"
                    onChange={(e) =>
                      handleFileChange(e, setResume, setResumePreview)
                    }
                    id=""
                    className="absolute top-0 left-0 h-full w-full opacity-0 cursor-pointer"
                  />
                </div>
              </div>
            </section>
            <div className="py-10">
              <Btn type={2} text={"Apply"} />
            </div>
          </form>
        </div>
        <div
          className={"hidden lg:block h-full w-full relative"}
          style={{
            background: `url('${img4}') fixed`,
            backgroundPosition: "right",
            backgroundSize: "contain",
            backgroundRepeat: "no-repeat",
          }}
        >
          <div className="absolute h-full w-full bg-black/30"></div>
        </div>
      </div>
    </>
  );
};

export default Application;
