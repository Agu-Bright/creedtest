import React from "react";
import { useDropzone } from "react-dropzone";
const DropZone = ({ open, className, value, setValue }) => {
	const { getRootProps, getInputProps, acceptedFiles } = useDropzone({});

	const files = acceptedFiles.map((file) => (
		<li key={file.path}>
			{file.path} - {file.size}bytes
		</li>
	));
	return (
		<div {...getRootProps((className = { className }))}>
			<input
				value={value}
				onChange={() => {setValue(acceptedFiles)}}
				className="input-zone"
				{...getInputProps()}
			/>
			<div className="text-center">
				<p className="text-sm font-inter text-[#7a8593]">
					Upload a file or drag and drop here
				</p>
			</div>
			<aside>{files}</aside>
		</div>
	);
};

export default DropZone;
