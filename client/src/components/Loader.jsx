import { motion } from "framer-motion";
import { useContext } from "react";
import { LoaderContext } from "../contexts/LoaderContext";
import { useLocation } from "react-router-dom";
const Loader = () => {
	const { loading } = useContext(LoaderContext);
	const { pathname } = useLocation();
	return (
		loading && (
			<div
				id="mike"
				style={{ width: "100vw", zIndex: 10000 }}
				className={`bg-white h-1 fixed top-0 col-span-2 ${
					pathname != "/login" &&
					pathname != "/CompleteRegistration" &&
					pathname != "enterprise-final-step"
						? "hidden"
						: "block"
				} sm:block  `}
			>
				<motion.div
					initial={{ x: "-100%" }}
					animate={{ x: "100%" }}
					transition={{ repeat: "repeat", duration: 1 }}
					style={{ width: "100vw" }}
					className="h-1 bg-primary-500"
				></motion.div>
			</div>
		)
	);
};

export default Loader;
