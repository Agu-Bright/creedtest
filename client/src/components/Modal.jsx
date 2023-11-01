import { motion, AnimatePresence } from "framer-motion";

import { CheckCircleIcon, XMarkIcon } from "@heroicons/react/20/solid";
import { useContext } from "react";
import { ModalContext } from "../contexts/ModalContext";

const Modal = () => {
	const { showing, text, success, setShowing } = useContext(ModalContext);
	return (
		<AnimatePresence>
			{showing && (
				<motion.div
					initial={{ opacity: 0, y: "-100%" }}
					exit={{ opacity: 0, y: "-100%" }}
					animate={{ opacity: 1, y: 0 }}
					className="fixed top-0 w-full px-4 pt-10"
					style={{ zIndex: 10000 }}
					onClick={() => setShowing(false)}
				>
					<div
						id="mike"
						className="bg-primary-100 mx-auto w-max py-2 px-4 rounded text-zinc-950 flex gap-2 shadow-sm"
					>
						{success ? (
							<CheckCircleIcon className="h-6 text-green-500 " />
						) : (
							<XMarkIcon className="h-6 text-red-500 " />
						)}
						{text}
					</div>
				</motion.div>
			)}
		</AnimatePresence>
	);
};

export default Modal;
