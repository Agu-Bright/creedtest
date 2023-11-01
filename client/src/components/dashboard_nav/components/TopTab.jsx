import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ChatBubbleOvalLeftEllipsisIcon } from "@heroicons/react/24/outline";
import Loader from "../../MikesComponents/Loader";
import { LoaderContext } from "../../../contexts/LoaderContext";

const TopTab = () => {
	const { loading } = useContext(LoaderContext);

	return (
		<motion.div
			className="admin_mobile_nav"
			initial={{ opacity: 0 }}
			animate={{
				opacity: 1,
				transition: {
					duration: 0.1,
					type: "none",
				},
			}}
			exit={{
				// y: "-90%",
				opacity: 0,
				transition: {
					duration: 0.3,
					type: "none",
				},
			}}
		>
			<Link to="/" className="admin_mobile_nav_logo"></Link>

			<Link to="/postjob" className="admin_mobile_nav_post-job">
				Post a job
			</Link>

			<div className="absolute right-0 h-full px-3">
				<Link to="/chat/contacts" className="h-full flex items-center">
					<ChatBubbleOvalLeftEllipsisIcon className="text-white h-8" />
				</Link>
			</div>
			<div className="absolute bottom-0 z-30 w-full" id="mike">
				<Loader loading={loading} className={""} />
			</div>
		</motion.div>
	);
};

export default TopTab;
