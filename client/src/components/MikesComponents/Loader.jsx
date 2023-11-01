import { motion } from "framer-motion";

const Loader = ({loading}) => {
	return (
		loading && (
			<div className="w-full h-1 overflow-hidden relative">
				<motion.div
					initial={{ x: "-100%" }}
					animate={{ x: "100%" }}
					transition={{ repeat: "repeat", duration: 1 }}
					className="h-full w-full bg-primary-500 absolute"
				></motion.div>
			</div>
		)
	);
};

export default Loader;
