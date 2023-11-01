import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import React, { useContext, useEffect, useState } from "react";
import Home from "./pages/Home/Home";
import Chat from "./pages/Chat/Chat";
import Settings from "./pages/Profile/Settings";
import CreateInterview from "./pages/Interview/CreateInterview";
import Application from "./pages/Interview/Application";
import Jobs from "./pages/MyJobs/Jobs";
import Proposals from "./pages/MyProposals/Proposals";
import PostajobHome from "./pages/postajob_home/PostajobHome";
import PostajobForm1 from "./pages/postajob_form1/PostajobForm1";
import PostajobForm2 from "./pages/postajob_form2/PostajobForm2";
import PostedSuccessfully from "./pages/Posted_successfully/PostedSuccessfully";
import ReceivedSuccessfully from "./pages/Receivedsuccessfully/ReceivedSuccessfully";
import CreateAcc from "./pages/Createaccount/CreateAcc";
import Login from "./pages/Register-and-login/Login";
import Register from "./pages/Register-and-login/Register";
import CompleteReg from "./pages/CompleteRegistration/CompleteReg";
import Enterprise from "./pages/Enterprises/Enterprise";
import Buisness from "./pages/Buisness/Buisness";
import TrustWorthyWorkerForm1 from "./pages/trust_worthy_worker_postajob/trustworthy_worker_form1/TrustWorthyWorkerForm1";
import TrustWorthyWorkerForm2 from "./pages/trust_worthy_worker_postajob/trustworthy_worker_form2/TrustWorthyWorkerForm2";
import { Workers } from "./pages/Workers/Workers";
import { BrowseCategories } from "./pages/BrowseCategories/BrowseCategories";
import { BrowseServices } from "./pages/BrowseServices/BrowseServices";
import BrowseJobs from "./pages/BrowseJobs/BrowseJobs";
import { Service } from "./pages/Service/Service";
import { NavigateComponent } from "./components/Redirect";
import About from "./pages/About/About";
import ContactUs from "./pages/Contact-Us/Contact";
import "./App.css";
import ManageServices from "./pages/ManageServices/ManageServices";
import Feedback from "./pages/ManageServices/Feedback";
import Performance from "./pages/ManageServices/Performance";
import MyServices from "./pages/ManageServices/SubPages/MyServices02";
import Feedback02 from "./pages/ManageServices/SubPages/Feedback02";
import Performance02 from "./pages/ManageServices/SubPages/Performance02";
import Service2 from "./pages/Service/Service2";
//forgot password
import Forgot_password from "./pages/Forgot_password/forgot_password";
import Reset_password from "./pages/Forgot_password/reset_password";
// dashboard
import DasboardNav from "./components/dashboard_nav/dashboard_nav";
import Dashboard from "./pages/Dashboards/Dashboard";
import DashboardBrowse from "./pages/Dashboards/browse/DashboardBrowse";

import Business_Registeration from "./pages/Buisness/Business_registeration";
import Business_CompleteReg from "./pages/Buisness/Business_complete_registeration";
import DashboardBrowseServices from "./pages/DashboardBrowseServices/DashboardBrowseServices";
import WriteReview from "./pages/WriteReview/WriteReview";
import Post_service from "./pages/Post-service/Post-service";
import Bid_on_project from "./pages/Bid-On-Project/Bid-on-Project";
import Help_center from "./pages/Help-center/Help-center";
import Interview2 from "./pages/Browse-interview/Interview2";
// import CreatePost from "./pages/Profile/CreatePost";
import PostajobHomeDashboard from "./pages/Post_a_job_dashboard/PostajobHome_dashboard";
import Postajobcreedlancers from "./pages/Post_a_job_dashboard/postajob_creedlance/Postajobcreedlancers";
import Postajobcreedlancers2 from "./pages/Post_a_job_dashboard/postajob_creedlance2/Postajobcreedlancers2";
import Projects from "./pages/Posted/Projects";
import Interviews from "./pages/Posted/Interviews";
import Applicants from "./pages/Applicants/Applicants";
import ApplicantProfile from "./pages/Applicants/ApplicantProfile";
import AssignedProject from "./pages/Assigned/AssignedProject";
import AssignedInterview from "./pages/Assigned/AssignedInterview";
import Bid from "./pages/Bid-On-Project/Bid";
import Followers from "./pages/Profile/Followers";
import Profile from "./pages/Profile/Profile";

import { UserDataContext } from "./contexts/UserDataContext";
import PreviewJob from "./pages/Post_a_job_dashboard/PreviewJob";
import ServiceInfo from "./pages/Service/ServiceInfo";
import ServicesFeedback from "./pages/ServicesFeedback/ServicesFeedback";
import Browse from "./pages/BrowseJobs/Browse";

const ENDPOINT = "http://localhost:3500";
import io from "socket.io-client";
import { chatState } from "./contexts/ChatProvider";
import NotFound from "./pages/notfound/NotFound";

function App() {
  const location = useLocation();
  const { socket } = chatState();
  const { userData, checkStorage } = useContext(UserDataContext);

  // useEffect(() => {
  //   socket && socket.on("new project", (data) => console.log(data));
  // });
  // useEffect(() => {
  //   setSocket(io(ENDPOINT));
  // }, []);

  // useEffect(() => {
  //   socket && socket.on("helloo", () => window.alert("helloohoiho"));
  // }, [socket]);

  // socket && socket.emit("setup");

  useEffect(() => {
    checkStorage();
  }, [location.pathname]);

  return (
    <Routes>
      <Route
        path="/"
        element={userData ? <Navigate to="/dashboard" /> : <Home />}
      />

      {/* post */}
      <Route path="/postajob_home" element={<PostajobHome />} />
      <Route path="/postajob_form1" element={<PostajobForm1 />} />
      <Route path="/postajob_form2" element={<PostajobForm2 />} />
      <Route
        path="/trustworthy_worker_form1"
        element={<TrustWorthyWorkerForm1 />}
      />
      <Route
        path="/trustworthy_worker_form2"
        element={<TrustWorthyWorkerForm2 />}
      />

      {/* Forgot password */}
      <Route path="/forgotpassword" element={<Forgot_password />} />
      <Route path="/resetpassword/:token" element={<Reset_password />} />

      <Route path="/postedsuccessfully" element={<PostedSuccessfully />} />
      <Route path="/receivedsuccessfully" element={<ReceivedSuccessfully />} />

      {/* Authentication flow */}
      <Route
        path="/create-account"
        element={userData ? <Navigate to="/dashboard" /> : <CreateAcc />}
      />
      <Route
        path="/register"
        element={userData ? <Navigate to="/dashboard" /> : <Register />}
      />
      <Route
        path="/login"
        element={userData ? <Navigate to="/dashboard" /> : <Login />}
      />
      <Route
        exact
        path="/CompleteRegistration"
        element={userData ? <Navigate to="/dashboard" /> : <CompleteReg />}
      />

      {/* Browse */}
      <Route exact path="/browse/categories" element={<BrowseCategories />} />
      <Route
        exact
        path="/browse/services"
        element={<Browse page="services" />}
      />
      <Route
        exact
        path="/browse/services/:category"
        element={<Browse page="services" />}
      />
      <Route exact path="/services/:id" element={<ServiceInfo />} />
      <Route
        exact
        path="/services/:id/feedback"
        element={<ServicesFeedback />}
      />
      <Route exact path="/service/:id" element={<Service />} />
      <Route exact path="/service2/:id" element={<Service2 />} />
      <Route exact path="/browse" element={<BrowseJobs />} />
      <Route
        exact
        path="/browse/projects"
        element={<Browse page="projects" />}
      />
      <Route exact path="/browse/workers" element={<Browse page="workers" />} />
      <Route
        exact
        path="/browse/interviews"
        element={<Browse page="interviews" />}
      />

      {/* Dashboard */}
      <Route path="/dashboard-nav" element={<DasboardNav />} />
      <Route
        path="/dashboard"
        element={!userData ? <Navigate to="/login" /> : <Dashboard />}
      />
      <Route
        exact
        path="/dashboard/browse/projects"
        element={<DashboardBrowse page="projects" />}
      />
      {/* <Route
        exact
        path="/dashboard/browse/services"
        element={<DashboardBrowse page="services" />}
      /> */}
      <Route
        exact
        path="/dashboard/browse/projects/:id"
        element={<DashboardBrowse page="project-details" />}
      />
      <Route
        exact
        path="/dashboard/browse/projects/:id/proposals"
        element={<DashboardBrowse page="proposals" />}
      />
      <Route
        exact
        path="/dashboard/browse/interviews"
        element={<DashboardBrowse page="interviews" />}
      />
      <Route
        path="/dashboard/browse/workers"
        element={<DashboardBrowse page="workers" />}
      />
      <Route
        path="/dashboard/browse/services"
        element={<DashboardBrowse page="services" />}
      />
      <Route path="/job/preview" element={<PreviewJob />} />
      <Route path="/Postjob" element={<PostajobHomeDashboard />} />
      <Route path="/Postjob_creedlancers" element={<Postajobcreedlancers />} />
      <Route
        path="/Postjob_creedlancers/final_step"
        element={<Postajobcreedlancers2 />}
      />

      {/* Enterprise */}
      <Route path="/enterprise" element={<Enterprise />} />
      <Route
        path="/enterprise-signup"
        element={
          userData ? <Navigate to="/dashboard" /> : <Business_Registeration />
        }
      />
      <Route
        path="/enterprise-complete"
        element={
          userData ? <Navigate to="/dashboard" /> : <Business_CompleteReg />
        }
      />
      <Route
        exact
        path="/enterprise-final-step"
        element={userData ? <Navigate to="/dashboard" /> : <Buisness />}
      />

      {/* Post service */}
      <Route path="/Post-service" element={<Post_service />} />

      {/* Others */}
      <Route path="/Help-center" element={<Help_center />} />
      <Route path="/bid/:id" element={<Bid />} />
      <Route path="/Bid-on-project" element={<Bid_on_project />} />
      <Route path="/dashboard/browse/interviews/:id" element={<Interview2 />} />
      <Route path="/write-a-review" element={<WriteReview />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact-us" element={<ContactUs />} />
      <Route path="/workers" element={<Workers />} />

      {/* Manage Services */}
      <Route path="/manage-services" element={<ManageServices />} />
      <Route path="/manage-services/feedback" element={<Feedback />} />
      <Route path="/manage-services/performance" element={<Performance />} />
      <Route path="/manage-services/my-services" element={<MyServices />} />
      <Route path="/manage-services/my-feedbacks" element={<Feedback02 />} />
      <Route
        path="/manage-services/my-performance"
        element={<Performance02 />}
      />

      {/* Chat */}
      <Route path="/Chat" element={<Navigate to={"/chat/contacts"} />} />
      <Route path="/Chat/contacts" element={<Chat />} />
      <Route path="/Chat/messages/:id" element={<Chat />} />

      {/* Profile */}
      <Route path="/profile" element={<Navigate to={"/profile/posts"} />} />
      <Route path="/profile/followers" element={<Followers />} />
      <Route path="/profile/followers/:id" element={<Followers />} />
      <Route path="/profile/:page" element={<Profile />} />
      <Route path="/profile/:id/:page" element={<Profile />} />
      {/* <Route path="/profile/posts/create-post" element={<CreatePost />} /> */}

      {/* Settings */}
      <Route path="/Settings" element={<Navigate to={"/settings/profile"} />} />
      <Route path="/Settings/:page" element={<Settings />} />

      {/* Jobs */}
      <Route path="/Jobs" element={<Navigate to={"/jobs/projects"} />} />
      <Route path="/Jobs/:page" element={<Jobs />} />

      {/* Proposals */}
      <Route
        path="/Proposals"
        element={<Navigate to={"/proposals/projects"} />}
      />
      <Route path="/Proposals/:page" element={<Proposals />} />

      {/* Interviews */}
      <Route path="/application/:id" element={<Application />} />
      <Route
        path="/create/interview/"
        element={<Navigate to={"/create/interview/details"} />}
      />
      <Route path="/create/interview/:id" element={<CreateInterview />} />

      {/* Posted projects / interviews */}
      <Route path="/posted/projects" element={<Projects />} />
      <Route path="/posted/interviews" element={<Interviews />} />

      {/* Assigned projects */}
      <Route path="/assigned/projects" element={<AssignedProject />} />
      <Route path="/assigned/interviews" element={<AssignedInterview />} />

      {/* Applicants */}
      <Route path="/applicants/:id" element={<Applicants />} />
      <Route path="/applicants/profile/:id" element={<ApplicantProfile />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
