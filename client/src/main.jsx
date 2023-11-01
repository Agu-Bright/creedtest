import React from "react";
import ReactDOM from "react-dom/client";
import "./mike.css";
import App from "./App";
// import reportWebVitals from "./reportWebVitals";
import ScrollToTop from "./hooks/ScrollToTop";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AdminNavProvider from "./provider/AdminNav";
import LocationProvider from "./provider/Location";
import { SignupProvider } from "./contexts/SignupContext";
import Loader from "./components/Loader";
import Modal from "./components/Modal";
import { LoaderContextProvider } from "./contexts/LoaderContext";
import { ModalContextProvider } from "./contexts/ModalContext";
import { UserDataContextProvider } from "./contexts/UserDataContext";
import { AddFormContextProvider } from "./contexts/AddForm";
import { AddJobProvider } from "./contexts/AddJobContext";
import Announcement from "./components/Announcement";
import { AnnouncementContextProvider } from "./contexts/AnnouncementContext";
import { AddServicesProvider } from "./contexts/ServicesContext";
import ChatProvider from "./contexts/ChatProvider";
import NotificationProvider from "./contexts/NotificationProvider";
import JobProvider from "./contexts/JobProvider";
import ImageCropper from "./components/MikesComponents/ImageCropper";
import { ImageContextProvider } from "./contexts/ImageContext";
import { SocialPostProvider } from "./contexts/SocialPostContext";
import { JobPostProvider } from "./contexts/JobPostContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
	<React.StrictMode>
		<BrowserRouter>
			<ImageContextProvider>
				<ChatProvider>
					<NotificationProvider>
						<JobProvider>
							<UserDataContextProvider>
								<ToastContainer />
								<ScrollToTop />
								<ModalContextProvider>
									<LoaderContextProvider>
										<AnnouncementContextProvider>
											<Loader />
											<Modal />
											<Announcement />
											{/* <ImageCropper /> */}
											<AddFormContextProvider>
												<JobPostProvider>
													<AddJobProvider>
														<AddServicesProvider>
															<LocationProvider>
																<AdminNavProvider>
																	<SignupProvider>
																		<SocialPostProvider>
																			<App />
																		</SocialPostProvider>
																	</SignupProvider>
																</AdminNavProvider>
															</LocationProvider>
														</AddServicesProvider>
													</AddJobProvider>
												</JobPostProvider>
											</AddFormContextProvider>
										</AnnouncementContextProvider>
									</LoaderContextProvider>
								</ModalContextProvider>
							</UserDataContextProvider>
						</JobProvider>
					</NotificationProvider>
				</ChatProvider>
			</ImageContextProvider>
		</BrowserRouter>
	</React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
