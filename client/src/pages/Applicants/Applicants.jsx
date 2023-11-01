import React, { useState, useEffect, useContext } from "react";
import "./style.css";
import AdminNav from "../../components/dashboard_nav/dashboard_nav";
import bgImage from "../../assets/dashboard/dashboard-circle-bg-light.png";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import RefreshSharpIcon from "@mui/icons-material/RefreshSharp";
import IosShareRoundedIcon from "@mui/icons-material/IosShareRounded";
import ApplicantTableRow from "./components/ApplicantTableRow";
import { useParams } from "react-router-dom";
import { fetchData } from "../../api/fetchData";
import { ModalContext } from "../../contexts/ModalContext";
import { motion } from "framer-motion";
import NoApplicant from "./components/NoApplicant";
const Applicants = () => {
  const { showModal } = useContext(ModalContext);
  const params = useParams();
  const { id } = params;
  const [fixTab, setFixTab] = useState(false);
  const [loading, setLoading] = useState(false);
  const [applicants, setApplicants] = useState(null);
  const [refresh, setRefresh] = useState(false);
  const [searchTimeout, setSearchTImeout] = useState(null);
  const [searchText, setSearchText] = useState("");
  const [searchResult, setSearchResult] = useState([]);

  useEffect(() => {
    (async () => {
      setLoading(true);
      const res = await fetchData(`/interviews/${id}/view-applicants`);
      setLoading(false);
      setApplicants(res.applicants);
    })();
  }, [refresh]);

  const filterApplicants = (searchtext) => {
    const regex = new RegExp(searchtext, "i"); // 'i' flag for case-insensitive search
    return applicants.filter((item) => regex.test(item.user.name));
  };

  const handleSearchChange = (e) => {
    clearTimeout(searchTimeout);
    setSearchText(e.target.value);

    // debounce method
    setSearchTImeout(
      setTimeout(() => {
        const searchResult = filterApplicants(e.target.value);
        setSearchResult(searchResult);
      }, 500)
    );
  };

  return (
    <div>
      <AdminNav fixTab={fixTab} setFixTab={setFixTab} />
      <div
        style={{ backgroundImage: `url(${bgImage})`, zIndex: -2 }}
        className="fixed inset-0 w-screen h-screen bg-[length:700px_700px] bg-bottom md:bg-contain md:bg-right bg-no-repeat sm:bg-[length:900px_900px] bg-[#f9fbfc] lg:bg-[length:60vw_60vw]"
      />

      {applicants && !applicants.length && !searchResult.length && !loading ? (
        <NoApplicant content="No interview Applicant yet" />
      ) : (
        <div className="pt-[60px] py-4 relative applicant__page">
          <h1 className="text-lg text-[#205184] px-4 font-intermedium m-0 mt-3 sm:text-2xl sm:mt-8 lg:text-4xl lg:font-inter lg:mb-2 lg:max-w-[1400px] lg:mx-auto lg:w-[80%]">
            Applicants
          </h1>
          <p className="m-0 text-sm px-4 lg:max-w-[1400px] lg:mx-auto lg:w-[80%]">
            See all applicants linked to this post
          </p>
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
          <div
            style={{ height: "50vh" }}
            className="flex flex-col max-h-[63vh] overflow-y-auto mt-6 lg:mt-10 lg:max-w-[1400px] lg:mx-auto shadow px-2 lg:w-[80%]"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-x-2">
                <h2 className="m-0 text-sm text-[#205184] sm:text-lg lg:text-xl">
                  Applicants
                </h2>
                {/* <MagnifyingGlassIcon className="h-4 lg:h-5" /> */}
                <form className="relative w-full flex-center">
                  <input
                    type="text"
                    placeholder="Search applicants"
                    value={searchText}
                    onChange={handleSearchChange}
                    required
                    className="search_input peer"
                  />
                </form>
              </div>
              <div className="flex items-center gap-x-1 lg:pr-10">
                <button
                  onClick={() => setRefresh((prev) => !prev)}
                  className="flex flex-col items-center bg-transparent hover:text-[#7f8286] border-none text-[0.60rem] sm:text-xs"
                >
                  <RefreshSharpIcon
                    sx={{
                      fontSize: {
                        xs: "20px",
                        sm: "22px",
                        md: "24px",
                        lg: "32px",
                      },
                    }}
                  />
                  Refresh
                </button>
                <button className="flex flex-col items-center bg-transparent hover:text-[#7f8286] border-none text-[0.60rem] sm:text-xs">
                  <IosShareRoundedIcon
                    sx={{
                      fontSize: {
                        xs: "20px",
                        sm: "22px",
                        md: "24px",
                        lg: "32px",
                      },
                    }}
                  />
                  Share
                </button>
              </div>
            </div>

            <table>
              <thead className="mb-8 table-row">
                <th className="text-xs text-left sm:text-base">Name</th>
                <th className="text-xs text-left sm:text-base">Location</th>
                <th className="text-xs text-left sm:text-base">Rating</th>
                <th className="text-xs text-left sm:text-base">Status</th>
                <th className="text-xs text-left sm:text-base">More</th>
              </thead>

              {applicants && !loading && !searchText && (
                <tbody>
                  {applicants.map((applicant) => (
                    <ApplicantTableRow
                      key={applicant._id}
                      applicant={applicant}
                      setRefresh={() => setRefresh((prev) => !prev)}
                    />
                  ))}
                </tbody>
              )}
              {searchText && searchResult.length > 0 && (
                <tbody>
                  {searchResult.map((applicant) => (
                    <ApplicantTableRow
                      key={applicant._id}
                      applicant={applicant}
                      setRefresh={() => setRefresh((prev) => !prev)}
                    />
                  ))}
                </tbody>
              )}
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default Applicants;
