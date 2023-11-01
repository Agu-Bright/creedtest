import React, { useEffect, useContext, useState } from "react";
import AdminNav from "../../components/dashboard_nav/dashboard_nav";
import Footer from "../../components/Footer/Footer";
import FbContainer from "./component/FbContainer";
import { ChatBubbleLeftRightIcon } from "@heroicons/react/24/outline";
import { fetchData } from "../../api/fetchData";
import { ModalContext } from "../../contexts/ModalContext";
import { useParams } from "react-router-dom";

const ServicesFeedback = () => {
  const { id } = useParams();
  const { showModal } = useContext(ModalContext);
  const [loading, setLoading] = useState(false);
  const [reviews, setReviews] = useState();
  const [service, setService] = useState();
  ///get-service-reviews/:id

  useEffect(() => {
    const fetchServiceReviews = async () => {
      setLoading(true);
      await fetchData(`/services/get-service-reviews/${id}`)
        .then((res) => {
          setReviews(res.reviews);
          setService(res.service);
          setLoading(false);
        })
        .catch((err) => {
          showModal(`${err.message}`, false);
          setLoading(false);
        });
    };
    fetchServiceReviews();
  }, []);

  return (
    <div className="w-full box-border bg-white lg:bg-[#EBF2F7] min-h-screen">
      <AdminNav />
      <div className="pt-[60px] xsl:pt-0 lg:pt-[60px]">
        <div className="lg:grid lg:grid-cols-4 lg:w-[95%] xl:w-[90%] max-w-[1300px] mx-auto lg:gap-x-4">
          {/* Left */}
          <div className="col-span-3">
            <FbContainer
              loading={loading}
              reviews={reviews}
              setReviews={setReviews}
              service={service}
              id={id}
            />
          </div>
          {/* right */}
          <div className="bg-white h-fit hidden lg:flex flex-col gap-3 items-center p-4">
            <ChatBubbleLeftRightIcon className="h-16 text-gray-800" />
            <p className="m-0 p-0 text-base font-inter text-gray-800">
              Your feedback is very important for the seller review. Please,
              leave the honest review to help other buyers and the seller in the
              customer attraction.
            </p>
          </div>
        </div>
      </div>
      <div className="h-14 lg:h-20"></div>
    </div>
  );
};

export default ServicesFeedback;
