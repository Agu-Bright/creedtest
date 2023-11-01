import img5 from "./assets/img5.svg";
import { useNavigate } from "react-router-dom";
const NoApplicant = ({ content }) => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col gap-2 items-center mt-20 w-full lg:mx-auto">
      <img src={img5} className="h-40 md:h-64" alt="" />
      <p className={`lg:max-w-sm text-xs md:text-base text-center`}>
        {content}
      </p>
      {/* {link && (
        <button
          onClick={() => navigate(link)}
          className="bg-primary-500 text-white rounded-md w-max px-10 md:px-32 py-3 mt-2"
        >
          {action}
        </button>
      )} */}
    </div>
  );
};

export default NoApplicant;
