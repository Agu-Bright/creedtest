import img from "../assets/images/noReview.svg";

const NoReview = ({ loadingS, setText, text, rating, setRating }) => {
  return (
    <div className="flex flex-col gap-2 items-center  w-full lg:mx-auto">
      <img src={img} className="h-40 md:h-64" alt="" />
      <p className={`lg:max-w-sm text-xs md:text-base text-center`}>
        No review on this service yet
      </p>
    </div>
  );
};

export default NoReview;
