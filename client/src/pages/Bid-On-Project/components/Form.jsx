import React, { useContext, useState } from "react";
import { postData } from "../../../api/postData";
import { LoaderContext } from "../../../contexts/LoaderContext";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import { notificationState } from "../../../contexts/NotificationProvider";
import { chatState } from "../../../contexts/ChatProvider";

const Form = ({ post }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  // const { createNotification } = notificationState();
  // const { user } = chatState();
  const { setLoading } = useContext(LoaderContext);

  const [amount, setAmount] = useState("");
  const [days, setDays] = useState("");
  const [coverLetter, setCoverLetter] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    setLoading(true);
    postData(`/bid/projects/${id}/place-a-bid`, {
      bidAmount: amount,
      deliveryDay: days,
      coverLetter,
    })
      .then((res) => {
        setLoading(false);

        if (res.ok) {
          navigate("/proposals/projects");
          Swal.fire({
            title: "Bid Placed",
            text: "your bid has been placed.",
            icon: "success",
            timer: 3000,
          });
          // createNotification({
          //   receiver: post.createdBy,
          //   type: "got-a-proposal",
          //   title: "You have a new proposal",
          //   description: `${user.name} sent a proposal`,
          //   project: id,
          // });
        }

        return res.json;
      })
      .catch((err) => console.log(err));
  };
  return (
    <form onSubmit={handleSubmit} className="bg-white mb-3 p-4 lg:p-6 rounded">
      <h2 className="sm:text-2xl sm:font-intermedium">Terms</h2>
      <div className="mt-2">
        <div className="mt-5">
          <label className="block font-intersemibold sm:text-sm">
            Bid Amount
          </label>
          <input
            min={5}
            type="number"
            placeholder="₦"
            className="p-2 rounded mt-1 border-[1px] border-b-black border-r-black outline-none outline-0 w-[95%] lg:w-[97.5%]"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
          />
        </div>
        <div className="mt-5">
          <label className="block font-intersemibold sm:text-sm">
            The project will be delivered in
          </label>
          <input
            min={5}
            type="number"
            placeholder="Days"
            className="p-2 rounded mt-1 border-[1px] border-b-black border-r-black outline-none outline-0 w-[95%] lg:w-[97.5%]"
            value={days}
            onChange={(e) => setDays(e.target.value)}
            required
          />
        </div>
        <div className="mt-5">
          <label className="block font-intersemibold sm:text-sm">
            Cover Letter
          </label>
          <textarea
            value={coverLetter}
            required
            onChange={(e) => setCoverLetter(e.target.value)}
            placeholder="Good day, I would like to..."
            className="p-2 rounded mt-1 border-[1px] border-b-black border-r-black outline-none outline-0 w-[95%] resize-none min-h-[200px] lg:w-[97.5%]"
          />
        </div>
        <button
          className="bg-primary-500 text-white py-3 mt-5 px-12 border-none rounded w-full lg:w-fit lg:ml-auto lg:block lg:mt-8"
          // onClick={() => navigate('/bid-on-project')}
        >
          Send
        </button>
      </div>
    </form>
  );
};

export default Form;
