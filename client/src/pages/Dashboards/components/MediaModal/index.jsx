import React, { useEffect, useRef } from "react";
import ReactionBar from "./reactionBar";
import TopBar from "./TopBar";
import Caption from "./Caption";
import Media from "./Media";
import { motion } from "framer-motion";
import { useLocation } from "react-router-dom";

const MediaModal = ({ 
	files=[], 
	handleBack=()=>{}, 
	showComment=false, 
	description='', 
	post={}, 
	isPost=true
}) => {
	const modalRef = useRef(null);
	const {pathname} = useLocation()

	useEffect(() => {
		modalRef.current.focus();
	}, []);

	const handleDrag = (e, info) => {
		if (info.offset.y > 100) {
			// document.querySelector("html").classList.remove("modal__open");
			handleBack();
		}
	};

	return (
		<motion.div
			className="fixed inset-0 h-full w-screen z-[1999] lg:bg-black/70 lg:flex lg:justify-center lg:items-center overflow-hidden"
			ref={modalRef}
			initial={{ y: "100%" }}
			animate={{ y: "0%" }}
			exit={{ y: "100%" }}
			transition={{ type: "none" }}
			drag={window.innerWidth <= 1023 ? "y" : false}
			dragConstraints={{ top: 0, bottom: 0, left: 0, right: 0 }}
			// dragMomentumThreshold={1000}
			dragElastic={{
				// top: 0,
				bottom: 0,
			}}
			dragSnapToOrigin
			onDragEnd={handleDrag}
		>
			{/* dismiss modal */}
			<div
				className="absolute inset-0 h-full w-full z-[1997] cursor-pointer"
				onClick={handleBack}
			/>

			{/* components */}
			<div className="flex flex-col lg:h-[600px] lg:w-[480px]  fixed flex-1 z-[1998] lg:mx-auto lg:absolute lg:bg-[#f5f5f5] rounded-3xl">
				<TopBar handleBack={handleBack} title={post?.createdBy?.name} />
				<Media files={files} />
				<Caption text={description} />
				<div className="lg:h-6" />
				<ReactionBar isPost={isPost} post={post} showComment={showComment} />
			</div>
		</motion.div>
	);
};

export default MediaModal;
