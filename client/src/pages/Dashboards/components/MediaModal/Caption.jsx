import React, { Fragment, useState } from "react";
import "./Caption.css";

const Caption = ({ text }) => {
	const [isTruncated, setIsTruncated] = useState(true);
	const maxCharacters = 90;

	return (
		<Fragment>
			{text && (
				<div className="flex flex-col items-center absolute bottom-16 lg:bottom-12 z-[1999] bg-[#00000085] lg:bg-[#00000090] w-full">
					<div className="h-2" />
					<p className="text-white text-xs w-[92%] media__modal__caption__text">
						{isTruncated ? text.slice(0, maxCharacters) : text}
						<span onClick={() => setIsTruncated(!isTruncated)}>
							<strong className="text-yellow-400 underline cursor-pointer">
								{text.length > maxCharacters &&
									(isTruncated ? "Show more" : "Show less")}
							</strong>
						</span>
					</p>
					<div className="lg:h-2" />
				</div>
			)}
		</Fragment>
	);
};

export default Caption;
