import React, { useState } from "react";
// import { projectDescription } from '../data'

const TextDescription = ({ description }) => {
	const [isTruncated, setIsTruncated] = useState(true);
	const MAX_CHARACTERS = 500;

	return (
		<React.Fragment>
			<h4>Description</h4>
			<pre className="description whitespace-pre-line font-inter">
				{isTruncated
					? `${description.slice(0, MAX_CHARACTERS)}...`
					: description}
			</pre>
			<button
				className="simple bg-transparent border-none text-[#DAA520] text-xs sm:text-sm"
				onClick={() => setIsTruncated(!isTruncated)}
			>
				{isTruncated ? "Show More" : "Show Less"}
			</button>
			<div className="h-6" />
		</React.Fragment>
	);
};

export default TextDescription;
